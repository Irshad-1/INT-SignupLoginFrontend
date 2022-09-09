import React from 'react';
import {
  ChakraProvider,
  theme,Heading
} from '@chakra-ui/react';
import {Signup} from "./Components/Signup";
import { Routes, Route } from 'react-router-dom';
import { Login } from "./Components/Login";
import { Details } from "./Components/Details";

function App() {
  return (
    <ChakraProvider theme={theme}>
            <Heading size="3xl" color="#2B4865" textAlign="center">Indus net Technologies</Heading>
      <Routes>
        <Route path='/' element={<Details />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
