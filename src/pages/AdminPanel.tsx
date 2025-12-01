"use client";

import React from "react";

const AdminPanel: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Panneau d'Administration</h1>
      <p className="text-lg text-muted-foreground">
        Gérez les utilisateurs, les sessions, les dépôts et les zones.
      </p>
      {/* Future content for user, session, depot, zone management */}
    </div>
  );
};

export default AdminPanel;