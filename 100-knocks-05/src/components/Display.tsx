// src/components/Display.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <Box h="50px" p={4} bg="GrayText" borderRadius="md" textAlign="right" mb={4}>
      <Text fontSize="2xl" color="white">
        {value}
      </Text>
    </Box>
  );
};

export default Display;
