import { type FC } from 'react';

import { Box, Heading, Text, Badge, Button, Flex } from "@chakra-ui/react";
import { FillRateDisplay } from "@/components/common";
import { getStatusColor } from "@/utils";
import type { Tour } from "@/types";

interface TourCardProps {
  tour: Tour;
  onSelectTour?: (tourId: string | number) => void;
}

const TourCard: FC<TourCardProps> = ({ tour, onSelectTour }) => {
  return (
    <Flex
      direction="column"
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      data-tour-id={tour.id}
      _hover={{ shadow: "lg", borderColor: "teal.500" }}
      transition="all 0.2s"
      height="100%"
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Heading
          size="md"
          maxWidth="70%"
          title={tour.name}
          css={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {tour.name}
        </Heading>
        <Badge colorPalette={getStatusColor(tour.status)}>{tour.status}</Badge>
      </Box>

      <Box>
        <Text
          mb={2}
          title={`Spectacle: ${tour.show.title}`}
          css={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          Spectacle: {tour.show.title}
        </Text>
        <Text mb={3}>Représentations: {tour.totalPerformances}</Text>

        <Text fontWeight="bold" mb={2}>
          Revenu: €{tour.totalRevenue.toLocaleString()}
        </Text>
      </Box>

      <Box mt="auto" mb={4}>
        <Text mb={1}>Taux de Remplissage Moyen:</Text>
        <FillRateDisplay fillRate={tour.averageFillRate} />
      </Box>

      <Box flexGrow={1} />

      <Button
        mt={4}
        size="sm"
        colorPalette="teal"
        width="100%"
        data-tour-id={tour.id}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTour?.(tour.id);
        }}
      >
        Voir Détails
      </Button>
    </Flex>
  );
};

export default TourCard;
