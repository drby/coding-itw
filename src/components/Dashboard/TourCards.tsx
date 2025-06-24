import { type FC } from 'react';

import { getStatusColor } from "@/utils";

import { SimpleGrid, Box, Heading, Text, Badge, Button } from "@chakra-ui/react";
import { FillRateDisplay } from "@/components/common";
import type { Tour } from "@/types";

interface TourCardsProps {
  tours: Tour[];
  onSelectTour?: (tourId: string | number) => void;
}

const TourCards: FC<TourCardsProps> = ({ tours, onSelectTour }) => {
  if (tours.length === 0) {
    return <Text data-tour-id="no-tour">Aucune tournée ne correspond à votre recherche.</Text>;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} data-tour-id="tour-grid">
      {tours.map((tour) => (
        <Box
          key={tour.id}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          data-tour-id={tour.id}
          cursor="pointer"
          onClick={() => onSelectTour?.(tour.id)}
          _hover={{ shadow: "lg", borderColor: "teal.500" }}
          transition="all 0.2s"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Heading size="md">{tour.name}</Heading>
            <Badge colorPalette={getStatusColor(tour.status)}>{tour.status}</Badge>
          </Box>

          <Text mb={2}>Spectacle: {tour.show.title}</Text>
          <Text mb={3}>Représentations: {tour.totalPerformances}</Text>

          <Text fontWeight="bold">
            Revenu: €{tour.totalRevenue.toLocaleString()}
          </Text>
          <Text mb={1}>Taux de Remplissage Moyen:</Text>
          <FillRateDisplay fillRate={tour.averageFillRate} />

          <Button
            mt={4}
            size="sm"
            colorPalette="teal"
            width="100%"
            data-tour-id={tour.id}
          >
            Voir Détails
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default TourCards;
