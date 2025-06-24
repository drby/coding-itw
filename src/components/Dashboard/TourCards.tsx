import { type FC } from 'react';
import { SimpleGrid, Box, Heading, Text, Badge, Button, Flex } from "@chakra-ui/react";
import { getStatusColor, getAverageFillRateColor } from "../../utils/colorUtils";
import type { Tour } from "../../types/tour.types";

interface TourCardsProps {
  tours: Tour[];
  onSelectTour?: (tourId: string | number) => void;
}

const TourCards: FC<TourCardsProps> = ({ tours, onSelectTour }) => {
  const handleTourClick = (tourId: number | string) => {
    if (onSelectTour) {
      onSelectTour(tourId);
    }
  };
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
          onClick={() => handleTourClick(tour.id)}
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
          <Flex align="center" gap={2} mb={2}>
            <Box 
              flex="1" 
              h="8px" 
              bg="gray.200" 
              borderRadius="md" 
              overflow="hidden"
            >
              <Box 
                h="100%" 
                w={`${tour.averageFillRate}%`} 
                bg={`${getAverageFillRateColor(tour.averageFillRate)}.500`}
                transition="width 0.3s ease-in-out"
              />
            </Box>
            <Badge colorPalette={getAverageFillRateColor(tour.averageFillRate)} ml={1}>
              {tour.averageFillRate}%
            </Badge>
          </Flex>

          <Button 
            mt={4} 
            size="sm" 
            colorPalette="teal" 
            width="100%"
            onClick={(e) => {
              e.stopPropagation();
              handleTourClick(tour.id);
            }}
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
