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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import QRcode from '../assets/qr-code.svg';
import SocialShare from '../assets/social_share.svg';

export default function SignUp() {
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');
  const variant = isSmallerThan500 ? 6 : 0;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    //TODO: API
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  }

  return (
    <>
      <Flex
        pt={variant}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        direction={'row'}
        wrap={'wrap'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        bgGradient={'linear(to-bl, teal.100 0%, orange.100 30%, blue.100 90%)'}
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
            minW={'sm'}
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

                <FormControl isInvalid={errors.lineid}>
                  <FormLabel htmlFor="lineid">Line ID</FormLabel>
                  <Input
                    id="lineid"
                    {...register('lineid', {
                      required: '此欄位為必填',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.lineid && errors.lineid.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="linename" isInvalid={errors.linename}>
                  <FormLabel htmlFor="linename">Line 暱稱</FormLabel>
                  <Input
                    id="linename"
                    placeholder="必須為當前的Line暱稱"
                    {...register('linename', {
                      required: '此欄位為必填',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.linename && errors.linename.message}
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
          minW="380px"
          rounded="lg"
          p={8}
          m={6}
          spacing={1}
          shadow="md"
          align="center"
          background="white"
        >
          <p fontSize="xl" fontWeight="bold">
            別忘了加入我們的Line Bot👇
            <br />
            媒合成功時會收到即時通知哦！
          </p>
          <Image src={SocialShare} alt="QR code" boxSize="250px" />
          <Image src={QRcode} alt="QR code" boxSize="270px" />
        </Box>
      </Flex>
    </>
  );
}
