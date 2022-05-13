import {
  Stack,
  Flex,
  Box,
  Heading,
  Image,
  Center,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import { useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Lost from '../assets/explore.svg';

function NotFound() {
  const headingStyle = {
    fontSize: '4xl',
    fontWeight: 'bold',
  };

  return (
    <Box>
      <Navbar />
      <Flex
        pt={20}
        minH={'100vh'}
        align={'begin'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={5}>
          <Center>
            <Heading style={headingStyle}>此頁面不存在</Heading>
          </Center>
          <Center>
            <Button colorScheme="teal" as={RouterLink} to="/">
              返回首頁
            </Button>
          </Center>
          <Box>
            <Image src={Lost} alt="Page Not Found" boxSize="400px" />
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}

export default NotFound;
