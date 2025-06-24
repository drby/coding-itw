import { useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box, Button, Heading, Text, Spinner,
  Badge, Grid, Flex
} from "@chakra-ui/react";

import { useTour } from "@/hooks";
import { getStatusColor } from "@/utils";
import { FillRateDisplay } from "@/components/common";
import { PerformanceList, AddPerformanceFormModal } from "@/components/TourDetails";
import type { Performance } from "@/types";

interface TourDetailsProps {
  onBack: () => void;
}

const TourDetails: FC<TourDetailsProps> = ({ onBack }) => {
  const { tourId } = useParams<{ tourId: string }>();
  const { tour, loading, error } = useTour(tourId || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [localPerformances, setLocalPerformances] = useState<Performance[]>([]);

  if (!tourId) {
    return (
      <Box p={5} borderWidth="1px" borderRadius="md" bg="red.50" maxW="container.md" mx="auto">
        <Heading size="md" color="red.500">Erreur: ID de tournée manquant</Heading>
        <Button mt={4} colorPalette="blue" onClick={onBack}>Retour à la Liste des Tournées</Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} fontSize="lg" fontWeight="medium">Chargement des détails de la tournée...</Text>
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box p={5} borderWidth="1px" borderRadius="md" bg="red.50" maxW="container.md" mx="auto">
        <Heading size="md" color="red.500">Erreur de Chargement de la Tournée</Heading>
        <Text mt={2}>Nous n'avons pas pu charger les détails de la tournée. Veuillez réessayer plus tard.</Text>
        {error && <Text mt={2} fontStyle="italic">Détails de l'erreur: {String(error)}</Text>}
        <Button mt={4} colorPalette="blue" onClick={onBack}>Retour à la Liste des Tournées</Button>
      </Box>
    );
  }

  const handleAddPerformance = (newPerformance: Omit<Performance, 'id'>) => {
    setLocalPerformances(prev => [
      ...prev,
      { ...newPerformance, id: `local-${Date.now()}` }
    ]);
  };

  const allPerformances = [...(tour.performances || []), ...localPerformances];

  return (
    <Box>
      <Button mb={4} colorPalette="blue" onClick={onBack}>Retour à la Liste des Tournées</Button>

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
            <FillRateDisplay
              fillRate={tour.averageFillRate}
              height="12px"
              mb={2}
            />
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

        <Box mt={8} display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="md">Liste des Représentations</Heading>
          <Button colorPalette="teal" onClick={() => setModalOpen(true)}>
            + Ajouter une représentation
          </Button>
        </Box>

        <PerformanceList performances={allPerformances} />

        <AddPerformanceFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddPerformance={handleAddPerformance}
          tourId={tourId}
        />
      </Box>
    </Box>
  );
};

export default TourDetails;
