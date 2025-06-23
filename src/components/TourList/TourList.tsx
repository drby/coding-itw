import { useState, useMemo, type FC, type ChangeEvent } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Spinner, 
  SimpleGrid, 
  Button, 
  Badge, 
  Input
} from "@chakra-ui/react";
import { useTours } from "../../hooks/useTours";
import { getStatusColor, getAverageFillRateColor } from "../../utils/colorUtils";

const TourList: FC = () => {
  const { tours, loading, error } = useTours();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredTours = useMemo(() => {
    if (!searchQuery.trim()) return tours;
    
    const query = searchQuery.toLowerCase().trim();
    return tours.filter(tour => 
      tour.name.toLowerCase().includes(query) || 
      tour.show.title.toLowerCase().includes(query) ||
      tour.status.toLowerCase().includes(query)
    );
  }, [tours, searchQuery]);

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

      <Box mb={6}>
        <Input
          placeholder="Rechercher une tournée..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

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
