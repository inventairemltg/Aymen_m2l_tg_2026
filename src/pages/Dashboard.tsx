"use client";

import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg text-muted-foreground">
        Bienvenue sur le tableau de bord de l'inventaire. Ici, vous verrez les inventaires en cours et les statistiques clés.
      </p>
      {/* Future content for real-time inventory display, session selection, etc. */}
    </div>
  );
};

export default Dashboard;