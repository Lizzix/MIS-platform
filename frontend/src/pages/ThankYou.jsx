import {
  Stack,
  Flex,
  Box,
  Heading,
  Image,
  Center,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'
import { useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import SuperThankYou from '../assets/super_thank_you.svg'

export default function ThankYou() {
  const headingStyle = {
    fontSize: '4xl',
    fontWeight: 'bold',
  }

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
        <Stack spacing={5} alignItems={'center'}>
          <Center>
            <Heading style={headingStyle}>感謝你的善心！</Heading>
          </Center>
          <p>到「管理媒合紀錄」頁面就可以查看詳細資訊囉。</p>
          <Center>
            <Button colorScheme="teal" as={RouterLink} to="/personal">
              前往管理媒合頁面
            </Button>
          </Center>
          <Image src={SuperThankYou} alt="Thank You A Lot" boxSize="400px" />
        </Stack>
      </Flex>
    </Box>
  )
}
