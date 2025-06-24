import { useState, useMemo, type FC, type ChangeEvent } from 'react';

import { getStatusColor, getAverageFillRateColor } from "../../utils/colorUtils";

import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Button,
  Badge,
  Input,
  Flex,
  ButtonGroup
} from "@chakra-ui/react";

import { useTours } from "../../hooks/useTours";

type StatusFilter = 'all' | 'planifiée' | 'en cours' | 'terminée' | 'annulée';

const TourList: FC = () => {
  const { tours, loading, error } = useTours();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (status: StatusFilter) => {
    setStatusFilter(status);
  };

  const filteredTours = useMemo(() => {
    let filtered = [...tours];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(tour => {
        const normalizedStatus = tour.status.trim().toLowerCase();

        switch (statusFilter) {
          case 'planifiée':
            return ['planifiée', 'planifiee', 'planned'].includes(normalizedStatus);
          case 'en cours':
            return ['en cours', 'ongoing', 'in progress'].includes(normalizedStatus);
          case 'terminée':
            return ['terminée', 'terminee', 'completed'].includes(normalizedStatus);
          case 'annulée':
            return ['annulée', 'annulee', 'cancelled', 'canceled'].includes(normalizedStatus);
          default:
            return true;
        }
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(tour => 
        tour.name.toLowerCase().includes(query) || 
        tour.show.title.toLowerCase().includes(query) ||
        tour.status.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tours, searchQuery, statusFilter]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} fontSize="lg" fontWeight="medium">Chargement des tournées...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={5} borderWidth="1px" borderRadius="md" bg="red.50" maxW="container.md" mx="auto">
        <Heading size="md" color="red.500">Erreur de Chargement des Tournées</Heading>
        <Text mt={2}>Nous n'avons pas pu charger les données des tournées</Text>
        <Text mt={2} fontStyle="italic">Détails de l'erreur: {String(error)}</Text>
        <Button mt={4} colorPalette="red" size="sm" onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading mb={4}>Tournées Théâtrales</Heading>

      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
        <Box flex="1">
          <Input
            placeholder="Rechercher une tournée..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <ButtonGroup attached variant="outline" size="md">
          <Button
            colorPalette={statusFilter === 'all' ? 'teal' : 'gray'}
            onClick={() => handleStatusFilter('all')}
          >
            Toutes
          </Button>
          <Button 
            colorPalette={statusFilter === 'planifiée' ? 'blue' : 'gray'}
            onClick={() => handleStatusFilter('planifiée')}
          >
            Planifiées
          </Button>
          <Button 
            colorPalette={statusFilter === 'en cours' ? 'green' : 'gray'}
            onClick={() => handleStatusFilter('en cours')}
          >
            En cours
          </Button>
          <Button 
            colorPalette={statusFilter === 'terminée' ? 'gray' : 'gray'}
            onClick={() => handleStatusFilter('terminée')}
          >
            Terminées
          </Button>
          <Button 
            colorPalette={statusFilter === 'annulée' ? 'red' : 'gray'}
            onClick={() => handleStatusFilter('annulée')}
          >
            Annulées
          </Button>
        </ButtonGroup>
      </Flex>

      {tours.length === 0 ? (
        <Text>Aucune tournée trouvée.</Text>
      ) : filteredTours.length === 0 ? (
        <Text>Aucune tournée ne correspond à votre recherche.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {filteredTours.map((tour) => (
            <Box
              key={tour.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              data-tour-id={tour.id}
              cursor="pointer"
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
              <Text>
                Taux de Remplissage Moyen: 
                <Badge colorPalette={getAverageFillRateColor(tour.averageFillRate)}>
                  {tour.averageFillRate}%
                </Badge>
              </Text>

              <Button mt={4} size="sm" colorPalette="teal" width="100%">
                Voir Détails
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default TourList;
