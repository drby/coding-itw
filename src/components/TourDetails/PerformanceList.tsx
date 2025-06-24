import type { FC } from 'react';
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import type { Performance } from "@/types";
import PerformanceCard from './PerformanceCard';

interface PerformanceListProps {
  performances: Performance[];
}

const PerformanceList: FC<PerformanceListProps> = ({ performances }) => {

  if (!performances || performances.length === 0) {
    return (
      <Box mt={8} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Text>Aucune représentation n'est disponible pour cette tournée.</Text>
      </Box>
    );
  }

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>Liste des Représentations</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {performances.map((performance) => (
          <PerformanceCard
            key={performance.id}
            performance={performance}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PerformanceList;
