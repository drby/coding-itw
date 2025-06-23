/**
 * Utility functions for determining colors based on status and metrics
 */

/**
 * Determines badge color based on tour status
 * @param status - Tour status string
 * @returns Color palette name for the badge
 */
export const getStatusColor = (status: string): string => {
  // Normalize status by trimming and converting to lowercase
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

/**
 * Determines badge color based on fill rate percentage
 * @param fillRate - Fill rate percentage (0-100)
 * @returns Color palette name for the badge
 */
export const getAverageFillRateColor = (fillRate: number): string => {
  if (fillRate >= 90) return 'green';
  if (fillRate >= 70) return 'teal';
  if (fillRate >= 50) return 'yellow';
  if (fillRate >= 30) return 'orange';
  return 'red';
};
