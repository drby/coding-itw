import { type FC } from 'react';

import { SimpleGrid, Text } from "@chakra-ui/react";
import type { Tour } from "@/types";
import TourCard from './TourCard';

interface TourListProps {
  tours: Tour[];
  onSelectTour?: (tourId: string | number) => void;
}

const TourList: FC<TourListProps> = ({ tours, onSelectTour }) => {
  if (tours.length === 0) {
    return <Text data-tour-id="no-tour">Aucune tournée ne correspond à votre recherche.</Text>;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} data-tour-id="tour-grid">
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          onSelectTour={onSelectTour}
        />
      ))}
    </SimpleGrid>
  );
};

export default TourList;
