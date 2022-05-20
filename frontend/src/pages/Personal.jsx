import React, { useEffect } from 'react'
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
} from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

import Profile from '../components/Profile'

export default function Personal() {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  })
  return (
    <div>
      <Navbar />
      <Box bg={useColorModeValue('gray.100', 'gray.800')}>
        <Center>
          <Flex
            maxW="1080px"
            h="100vh"
            p="10"
            direction="column"
            justify="start"
          >
            {/* 個人資料 */}
            <Profile user={user} />
            {/* 媒合資料 */}
            <Flex grow="true">
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        需求清單
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        提供清單
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Flex>
        </Center>
      </Box>
    </div>
  )
}
