import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Select,
  Textarea,
  Image,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import CONSTANTS from '../global/Constants'
import AddPost from '../assets/wall_post.svg'
import { useNavigate } from 'react-router-dom'
import { useAddExchageMutation } from '../features/exchangeApi'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

function NewRequest() {
  const toast = useToast()
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const [trigger] = useAddExchageMutation()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleSuccess = () => {
    navigate('/')
  }
  const handleNotLogin = () => {
    navigate('/login')
  }

  function onSubmit(values) {
    if (!user) {
      toast({
        description: '您尚未登入，轉跳至登入頁面。',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      handleNotLogin()
    }
    const payload = {
      receiver_uid: parseInt(user.uid),
      item: values.itemname,
      region: values.region,
      status: '等待中',
      notes: values.notes,
    }
    trigger(payload).then(
      result => {
        toast({
          description: '送出成功！轉跳至首頁。',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
        handleSuccess()
      },
      error => {
        toast({
          description: '送出失敗！請稍後再試。',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    )
  }

  return (
    <Box height={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
      <Navbar />
      <center>
        <Heading mt={'30px'}>填寫物資需求表單</Heading>
        <Image src={AddPost} alt="add post" boxSize={'250px'} />
        <Box
          mx={5}
          p={10}
          maxW={'500px'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'lg'}
        >
          {/* Request Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <FormControl id="itemname" isInvalid={errors.itemname}>
                <FormLabel htmlFor="itemname">物品名稱</FormLabel>
                <Input
                  id="itemname"
                  placeholder="一次一樣物品，簡單敘述即可。"
                  {...register('itemname', {
                    required: '此欄位為必填',
                  })}
                />
                <FormErrorMessage>
                  {errors.itemname && errors.itemname.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="region" isInvalid={errors.region}>
                <FormLabel htmlFor="region">地區</FormLabel>
                <Select
                  id="region"
                  placeholder="選擇所在地區"
                  {...register('region', {
                    required: '此欄位為必選',
                  })}
                >
                  {CONSTANTS.REGIONS.map((addr, idx) => {
                    return (
                      <option key={idx} value={addr}>
                        {addr}
                      </option>
                    )
                  })}
                </Select>
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="notes" isInvalid={errors.notes}>
                <FormLabel htmlFor="notes">備註</FormLabel>
                <Textarea
                  resize="none"
                  id="notes"
                  placeholder="詳細敘述需求，例如：數量、規格、品牌等等⋯⋯，更容易媒合成功哦！"
                  {...register('notes')}
                />
                <FormErrorMessage>
                  {errors.notes && errors.notes.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="comfirm" isInvalid={errors.comfirm}>
                <FormLabel htmlFor="comfirm"></FormLabel>
                <HStack mb={5}>
                  <Checkbox
                    {...register('comfirm', {
                      required: '請確認自己是否真的有此需求',
                    })}
                  >
                    我真心需要幫助，不會濫用他人的善心。
                  </Checkbox>
                  <Flex grow={'true'}></Flex>
                </HStack>

                <FormErrorMessage>
                  {errors.comfirm && errors.comfirm.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                size="lg"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                送出表單
              </Button>
            </Stack>
          </form>
          {/* End of Request Form */}
        </Box>
      </center>
    </Box>
  )
}

export default NewRequest
