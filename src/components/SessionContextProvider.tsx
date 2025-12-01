"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>; // Add logout function to context
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      showSuccess('Déconnexion réussie.');
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      showError("Erreur lors de la déconnexion.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);

        if (event === 'SIGNED_IN') {
          showSuccess('Connexion réussie !');
          navigate('/dashboard');
        } else if (event === 'SIGNED_OUT') {
          showSuccess('Déconnexion réussie.');
          navigate('/login');
        } else if (event === 'INITIAL_SESSION' && !currentSession) {
          navigate('/login');
        }
      }
    );

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
      if (!session) {
        navigate('/login');
      }
    }).catch((error) => {
      console.error("Error fetching initial session:", error);
      showError("Erreur lors de la récupération de la session initiale.");
      setIsLoading(false);
      navigate('/login');
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ session, user, isLoading, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};