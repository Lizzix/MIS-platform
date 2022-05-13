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
  Select,
  Textarea,
  Image,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import REGIONS from '../global/Constants';
import AddPost from '../assets/wall_post.svg';

function NewRequest() {
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
    <Box
      height={'100vh'}
      width={'100vh'}
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <Navbar />
      <center>
        <Heading mt={'30px'}>填寫物資需求表單</Heading>
        <Image src={AddPost} alt="add post" boxSize={'250px'} />
        <Box
          m={0}
          p={10}
          maxW={'500px'}
          minW={'300px'}
          bg={useColorModeValue('white', 'gray.800')}
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
                  {REGIONS.map((addr, idx) => {
                    return (
                      <option key={idx} value={addr}>
                        {addr}
                      </option>
                    );
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
                  placeholder="詳細敘述需求，例如：規格、品牌等等⋯⋯，更容易媒合成功哦！"
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
                      required: '請確認確認自己是否真的需要此項物資',
                    })}
                  >
                    我真心需要幫助，不會濫用好心人的物資。
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
  );
}

export default NewRequest;
