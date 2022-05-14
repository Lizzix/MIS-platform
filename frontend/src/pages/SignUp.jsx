import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Link,
  useColorModeValue,
  FormErrorMessage,
  useMediaQuery,
  Image,
  useToast,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import QRcode from '../assets/qr-code.svg'
import SocialShare from '../assets/social_share.svg'
import Navbar from '../components/Navbar'
import { useSignupAccountMutation } from '../features/accountApi'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  const variant = isSmallerThan900 ? 6 : 0
  const toast = useToast()
  const navigate = useNavigate()
  const [trigger] = useSignupAccountMutation()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleSuccess = () => {
    navigate('/login')
  }

  function onSubmit(values) {
    trigger(values).then(
      result => {
        if (result.data.message == 'Account already exists') {
          toast({
            description: '此電子郵件地址已被註冊過。',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          })
        } else {
          toast({
            description: '註冊成功！轉跳至登入頁面。',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          })
          handleSuccess()
        }
      },
      error => {
        toast({
          description: '註冊失敗！請稍後再試。',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    )
  }

  return (
    <>
      <Navbar />
      <Flex
        pt={variant}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        direction={'row'}
        wrap={'wrap'}
        bgGradient={useColorModeValue(
          'linear(to-bl, teal.100 0%, orange.100 30%, blue.100 90%)',
          'gray.800'
        )}
      >
        {/* SignUp CTA */}
        <Stack spacing={8} mx={6} maxW={'lg'} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              註冊
            </Heading>
            <p fontSize={'lg'} color={'gray.600'}>
              立即加入互助平台，助人助己 ❤️
            </p>
          </Stack>
          {/* SignUp Form */}
          <Box
            minW={'336px'}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">電子郵件地址</FormLabel>
                  <Input
                    id="email"
                    placeholder="作為未來登入時的帳號"
                    {...register('email', {
                      required: '此欄位為必填',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: '電子郵件地址格式不正確',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">密碼</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: '此欄位為必填',
                      minLength: { value: 8, message: '密碼至少要八位數' },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.line_id}>
                  <FormLabel htmlFor="line_id">Line ID</FormLabel>
                  <Input
                    id="line_id"
                    {...register('line_id', {
                      required: '此欄位為必填',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.line_id && errors.line_id.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="username" isInvalid={errors.username}>
                  <FormLabel htmlFor="username">Line 暱稱</FormLabel>
                  <Input
                    id="username"
                    placeholder="必須為當前的Line暱稱"
                    {...register('username', {
                      required: '此欄位為必填',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
                <Box my={3} />
                <Button
                  size="lg"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  註冊
                </Button>
              </Stack>
            </form>
            {/* form */}

            <Box pt={8}>
              <p align={'center'}>
                已經註冊過了？{' '}
                <Link as={RouterLink} to="/login" color={'blue.400'}>
                  登入
                </Link>{' '}
              </p>
            </Box>

            {/* End of SignUp CTA */}
          </Box>
        </Stack>
        {/* QRcode */}
        <Box
          maxW="384px"
          minW={'336px'}
          rounded="lg"
          p={8}
          m={6}
          spacing={1}
          shadow="lg"
          align="center"
          bg={useColorModeValue('white', 'gray.700')}
        >
          <p fontSize="xl" fontWeight="bold">
            別忘了加入我們的Line Bot👇
            <br />
            媒合成功時會收到即時通知哦！
          </p>
          <Image src={SocialShare} alt="QR code" boxSize="260px" />
          <Image src={QRcode} alt="QR code" boxSize="270px" />
        </Box>
      </Flex>
    </>
  )
}
