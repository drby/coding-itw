import { type FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Container, Heading, Flex, Box } from '@chakra-ui/react';

import Dashboard from '@/pages/Dashboard/Dashboard';
import TourDetail from '@/pages/TourDetails/TourDetails';

import { Toaster } from '@/components/ui/Toaster';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const App: FC = () => {
  const navigate = useNavigate();

  const handleSelectTour = (tourId: string | number) => {
    navigate(`/tour/${tourId}`);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex align="center" mb={6}>
        <Box flex="1">
          <Heading as="h1" textAlign={"center"}>Gestion des Tournées Théâtrales</Heading>
        </Box>
        <ThemeToggle />
      </Flex>

      <Routes>
        <Route path="/" element={<Dashboard onSelectTour={handleSelectTour} />} />
        <Route path="/tour/:tourId" element={<TourDetail onBack={handleBackToDashboard} />} />
      </Routes>

      <Toaster position="top" />
    </Container>
  )
}

export default App
