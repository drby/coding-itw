import type { FC } from 'react';

import {
  Box,
  Button,
  Heading,
  Text,
  Spinner,
  Badge,
  Flex,
  Grid,
} from "@chakra-ui/react";

import { useTour } from "../../hooks/useTours";
import { getAverageFillRateColor, getStatusColor } from "../../utils/colorUtils";
import PerformanceList from "./PerformanceList";

interface TourDetailProps {
  tourId: string;
  onBack: () => void;
}

const TourDetail: FC<TourDetailProps> = ({ tourId, onBack }) => {
  const { tour, loading, error } = useTour(tourId);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} fontSize="lg" fontWeight="medium">Chargement des détails de la tournée...</Text>
      </Box>
    );
  }

  if (error || !tour) {
    return (
      <Box p={5} borderWidth="1px" borderRadius="md" bg="red.50" maxW="container.md" mx="auto">
        <Heading size="md" color="red.500">Erreur de Chargement de la Tournée</Heading>
        <Text mt={2}>Nous n'avons pas pu charger les détails de la tournée. Veuillez réessayer plus tard.</Text>
        <Text mt={2} fontStyle="italic">Détails de l'erreur: {String(error)}</Text>
        <Button mt={4} colorPalette="blue" onClick={onBack}>
          Retour à la Liste des Tournées
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button mb={4} colorPalette="blue" onClick={onBack}>
        Retour à la Liste des Tournées
      </Button>

      <Box p={6} shadow="md" borderWidth="1px" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="lg">{tour.name}</Heading>
            <Text mt={1} fontSize="md" color="gray.600">{tour.show.title}</Text>
          </Box>
          <Badge colorPalette={getStatusColor(tour.status)} fontSize="md" px={3} py={1}>
            {tour.status}
          </Badge>
        </Flex>

        <Box borderTopWidth="1px" my={4} pt={4} />

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mt={4}>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontSize="sm" color="gray.500">Revenu Total</Text>
            <Text fontSize="2xl" fontWeight="bold">€{tour.totalRevenue.toLocaleString()}</Text>
            <Text fontSize="sm">Pour {tour.totalPerformances} représentations</Text>
          </Box>

          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontSize="sm" color="gray.500">Taux de Remplissage Moyen</Text>
            <Box fontSize="2xl" fontWeight="bold">
              <Badge colorPalette={getAverageFillRateColor(tour.averageFillRate)} px={2} py={1}>
                {tour.averageFillRate}%
              </Badge>
            </Box>
            <Text fontSize="sm">Pour toutes les représentations</Text>
          </Box>

          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontSize="sm" color="gray.500">Coût de Production</Text>
            <Text fontSize="2xl" fontWeight="bold">€{tour.productionCost.toLocaleString()}</Text>
            <Text fontSize="sm">Marketing: €{tour.marketingBudget.toLocaleString()}</Text>
          </Box>
        </Grid>

        <Box mt={6}>
          <Heading size="md" mb={3}>Informations de la Tournée</Heading>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <Box>
              <Text fontWeight="bold">Durée:</Text>
              <Text>{tour.startDate} au {tour.endDate}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Détails du Spectacle:</Text>
              <Text>{tour.show.genre} • {tour.show.duration} min • {tour.show.language}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Metteur en scène:</Text>
              <Text>{tour.team.director}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Équipe de Production:</Text>
              <Text>Plateau: {tour.team.stageManager} • Technique: {tour.team.technicalDirector} • Costumes: {tour.team.costumeDesigner}</Text>
            </Box>
          </Grid>
        </Box>

        <Box mt={6}>
          <Heading size="md" mb={3}>Remarques</Heading>
          <Text>{tour.notes}</Text>
        </Box>

        <PerformanceList performances={tour?.performances || []} />
      </Box>
    </Box>
  );
};

export default TourDetail;
