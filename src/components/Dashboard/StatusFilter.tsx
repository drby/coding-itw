import { type FC } from 'react';
import { ButtonGroup, Button } from "@chakra-ui/react";

import { type StatusFilterType } from "../../types/dashboard.types";

interface StatusFilterProps {
  currentFilter: StatusFilterType;
  onFilterChange: (status: StatusFilterType) => void;
}

const StatusFilter: FC<StatusFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filterOptions = [
    { value: 'all', label: 'Toutes', activeColor: 'teal' },
    { value: 'planifiée', label: 'Planifiées', activeColor: 'blue' },
    { value: 'en cours', label: 'En cours', activeColor: 'green' },
    { value: 'terminée', label: 'Terminées', activeColor: 'gray' },
    { value: 'annulée', label: 'Annulées', activeColor: 'red' },
  ];

  return (
    <ButtonGroup attached variant="outline" size="md">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          colorPalette={currentFilter === option.value ? option.activeColor : 'gray'}
          onClick={() => onFilterChange(option.value as StatusFilterType)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default StatusFilter;
