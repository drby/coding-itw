import { useState } from 'react';
import type { FC } from 'react';
import { Box, Container, Heading, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import TourList from './components/TourList';
import TourDetail from './components/TourDetail';

const App: FC = () => {
  const [selectedTourId, setSelectedTourId] = useState<string | number | null>(null);

  const handleSelectTour = (tourId: string | number) => {
    setSelectedTourId(tourId);
  };

  const handleBackToList = () => {
    setSelectedTourId(null);
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" mb={6} textAlign="center">Gestion des Tournées Théâtrales</Heading>

        {selectedTourId ? (
          <TourDetail tourId={String(selectedTourId)} onBack={handleBackToList} />
        ) : (
          <Box onClick={(e) => {
            const target = e.target as HTMLElement;
            const tourElement = target.closest('[data-tour-id]');
            if (tourElement) {
              const tourId = tourElement.getAttribute('data-tour-id');
              if (tourId) handleSelectTour(tourId);
            }
          }}>
            <TourList />
          </Box>
        )}
      </Container>
    </ChakraProvider>
  )
}

export default App
