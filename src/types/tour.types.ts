export interface Tour {
  id: number | string;
  showId: number;
  name: string;
  status: 'Planifiée' | 'En cours' | 'Terminée' | 'Annulée';
  startDate: string;
  endDate: string;
  totalPerformances: number;
  totalRevenue: number;
  averageFillRate: number;
  productionCost: number;
  marketingBudget: number;
  team: TourTeam;
  notes: string;
  show: Show;
  performances?: Performance[];
}

export interface TourTeam {
  director: string;
  stageManager: string;
  technicalDirector: string;
  costumeDesigner: string;
}

export interface Show {
  id: number;
  title: string;
  description: string;
  duration: number;
  genre: string;
  director: string;
  cast: string[];
  year: number;
  language: string;
  intermission: boolean;
  intermissionDuration: number;
}

export interface Performance {
  id: number | string;
  date: string;
  city: string;
  venue: string;
  capacity: number;
  ticketsSold: number;
  ticketPrice: number;
}
