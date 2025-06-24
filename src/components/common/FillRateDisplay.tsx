import { type FC } from 'react';

import { Box, Badge, Flex } from "@chakra-ui/react";
import { getAverageFillRateColor } from "@/utils";

interface FillRateDisplayProps {
  fillRate: number;
  showBadge?: boolean;
  height?: string;
  mb?: number;
}

const FillRateDisplay: FC<FillRateDisplayProps> = ({
  fillRate,
  showBadge = true,
  height = "8px",
  mb = 2
}) => {
  return (
    <Flex align="center" gap={2} mb={mb}>
      <Box
        flex="1"
        h={height}
        bg="gray.200"
        borderRadius="md"
        overflow="hidden"
      >
        <Box
          h="100%"
          w={`${fillRate}%`}
          bg={`${getAverageFillRateColor(fillRate)}.500`}
          transition="width 0.3s ease-in-out"
        />
      </Box>
      {showBadge && (
        <Badge colorPalette={getAverageFillRateColor(fillRate)}>
          {fillRate}%
        </Badge>
      )}
    </Flex>
  );
};

export default FillRateDisplay;
