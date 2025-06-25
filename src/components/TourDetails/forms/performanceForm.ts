
export interface PerformanceForm extends Record<string, string> {
  date: string;
  city: string;
  venue: string;
  capacity: string;
  ticketPrice: string;
}

export const validatePerformanceForm = {
  date: (value: string) => value ? '' : 'La date est requise',
  city: (value: string) => value ? '' : 'La ville est requise',
  venue: (value: string) => value ? '' : 'Le lieu est requis',
  capacity: (value: string) => {
    if (!value) return 'La capacité est requise';
    if (isNaN(Number(value)) || Number(value) <= 0) return 'La capacité doit être un nombre positif';
    return '';
  },
  ticketPrice: (value: string) => {
    if (!value) return 'Le prix du billet est requis';
    if (isNaN(Number(value)) || Number(value) < 0) return 'Le prix du billet doit être un nombre positif';
    return '';
  }
};
