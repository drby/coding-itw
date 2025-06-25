
export const getStatusColor = (status: string): string => {

  const normalizedStatus = status.trim().toLowerCase();

  switch (normalizedStatus) {
    case 'planifiée':
    case 'planifiee':
    case 'planned':
      return 'blue';
    case 'en cours':
    case 'ongoing':
    case 'in progress':
      return 'green';
    case 'terminée':
    case 'terminee':
    case 'completed':
      return 'gray';
    case 'annulée':
    case 'annulee':
    case 'cancelled':
    case 'canceled':
      return 'red';
    default:
      return 'gray';
  }
};


export const getAverageFillRateColor = (fillRate: number): string => {
  if (fillRate >= 90) return 'green';
  if (fillRate >= 70) return 'teal';
  if (fillRate >= 50) return 'yellow';
  if (fillRate >= 30) return 'orange';
  return 'red';
};
