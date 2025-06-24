import { type FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Heading } from '@chakra-ui/react';

import Dashboard from '@/components/Dashboard';
import TourDetail from '@/components/TourDetails';

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
      <Heading as="h1" mb={6} textAlign="center">Gestion des Tournées Théâtrales</Heading>

      <Routes>
        <Route path="/" element={<Dashboard onSelectTour={handleSelectTour} />} />
        <Route path="/tour/:tourId" element={<TourDetail onBack={handleBackToDashboard} />} />
      </Routes>
    </Container>
  )
}

export default App
