import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginAccountMutation } from '../features/accountApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

export default function Login() {
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [trigger] = useLoginAccountMutation()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleSuccess = (uid, username, email, access_token, refresh_token) => {
    dispatch(
      login({
        uid: uid,
        username: username,
        email: email,
        access_token: access_token,
        refresh_token: refresh_token,
      })
    )
    navigate('/')
  }

  function onSubmit(values) {
    trigger(values).then(
      result => {
        if (
          result.data.message == 'Account not found' ||
          result.data.message == 'Wrong password'
        ) {
          toast({
            description: '此電子郵件地址尚未註冊，或密碼錯誤。',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          })
        } else {
          toast({
            description: '登入成功！轉跳至首頁。',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          })
          handleSuccess(
            result.data.uid,
            result.data.username,
            values.email,
            result.data.access_token,
            result.data.refresh_token
          )
        }
      },
      error => {
        toast({
          description: '登入失敗！請稍後再試。',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    )
  }

  // function onSubmit(values) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       alert(JSON.stringify(values, null, 2))
  //       resolve()
  //     }, 1000)
  //   })
  // }

  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)')
  const variant = isSmallerThan500 ? 6 : 150

  return (
    <>
      <Navbar />
      <Flex
        minH={'100vh'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        bgGradient={useColorModeValue(
          'linear(to-bl, teal.100 0%, orange.100 30%, blue.100 90%)',
          'gray.800'
        )}
      >
        {/* Login CTA */}
        <Stack
          spacing={8}
          mx={'auto'}
          minW={'sm'}
          maxW={'lg'}
          py={variant}
          px={6}
        >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>登入帳號</Heading>
            <p fontSize={'lg'} color={'gray.600'}>
              開始和其他人互相幫助吧 ✌️
            </p>
          </Stack>
          {/* Login Form */}
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">電子郵件地址</FormLabel>
                    <Input
                      id="email"
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

                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox>記住登入資訊</Checkbox>
                    <Link color={'blue.400'}>忘記密碼？</Link>
                    {/* TODO: Remember Me, Forget Password */}
                  </Stack>

                  <Button
                    size="lg"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    登入
                  </Button>
                </Stack>
              </form>

              <Box pt={3}>
                <p align={'center'}>
                  還沒有帳號？{' '}
                  <Link as={RouterLink} to="/signup" color={'blue.400'}>
                    立即註冊
                  </Link>{' '}
                </p>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}
