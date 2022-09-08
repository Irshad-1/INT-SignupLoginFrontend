import React from 'react';
import {
  ChakraProvider,
  theme,Heading
} from '@chakra-ui/react';
import {Signup} from "./Components/Signup";


function App() {
  return (
    <ChakraProvider theme={theme}>
            <Heading size="3xl" color="#2B4865" textAlign="center">Indus net Technologies</Heading>
      <Signup/>
    </ChakraProvider>
  );
}

export default App;
