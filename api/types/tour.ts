export type TourTeam = {
    director: string;
    stageManager: string;
    technicalDirector: string;
    costumeDesigner: string;
  };

  export type Tour = {
    id: number;
    showId: number;
    name: string;
    status: "En cours" | "Planifiée" | "Terminée" | "Annulée";
    startDate: string;
    endDate: string;
    totalPerformances: number;
    totalRevenue: number;
    averageFillRate: number;
    productionCost: number;
    marketingBudget: number;
    team: TourTeam;
    notes: string;
  };
