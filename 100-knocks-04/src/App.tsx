import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Main } from './components/Main';


function App() {
  return (
    <Flex
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Box
        w="100%"
        h="100%"
        bg="white">
        <Main />
      </Box>
    </Flex>
  );
}

export default App;
