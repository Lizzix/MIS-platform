import React, { useEffect } from 'react'
import {
  Center,
  Heading,
  Image,
  Stack,
  Box,
  Flex,
  useColorModeValue,
  useMediaQuery,
  Button,
} from '@chakra-ui/react'
import Loading from '../components/Loading'
import PersonalInformation from '../assets/personal_information.svg'

function handleEditInfo() {
  // TODO: 編輯資料功能
}

function Profile({ user }) {
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)')
  const variant = isSmallerThan500 ? 5 : 5
  const infoVariant = isSmallerThan500 ? 0 : 5
  return (
    <Box pb="10">
      <Center>
        <Heading as="h1">
          你好，{user == null ? 'Username' : user.username}。
        </Heading>
      </Center>
      <Flex
        align={'start'}
        direction={'row'}
        justify={'center'}
        wrap={'wrap'}
        px={6}
        mt={variant}
        grow="true"
      >
        <Flex
          align={'start'}
          mt={{ sm: '5' }}
          mr={infoVariant}
          p="5"
          minW="250px"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          grow="true"
        >
          <Stack spacing="3">
            <Heading as="h2" fontSize={'20px'} color="teal.500">
              個人資料
            </Heading>
            <p>電子郵件地址：{user == null ? 'email' : user.email}</p>
            <p>Line ID：{user == null ? 'Line ID' : user.line_id}</p>
            <Button onClick={handleEditInfo} colorScheme="teal">
              編輯
            </Button>
          </Stack>
        </Flex>
        <Box>
          <Image src={PersonalInformation} alt="Happy News" boxSize="200px" />
        </Box>
      </Flex>
    </Box>
  )
}

export default Profile
