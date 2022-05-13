import {
  Heading,
  Image,
  HStack,
  Stack,
  Button,
  Flex,
  Box,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import SpreadLove from '../assets/spread_love.svg';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';

export default function CTA(props) {
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');
  const variant = isSmallerThan500 ? 6 : 0;
  return (
    <Box pt={variant} bg={useColorModeValue('gray.100', 'gray.800')}>
      <Flex
        align={'start'}
        direction={'row'}
        justify={'center'}
        wrap={'wrap'}
        px={6}
        bg={useColorModeValue('gray.100', 'gray.800')}
      >
        <Box pt={{ md: '20', sm: '15' }}>
          <Stack spacing={'60px'}>
            <Stack maxW={'450px'} spacing={2}>
              <Heading>互相幫助，度過危機。</Heading>
              <p>
                面對疫情，你可以做得比想像中更多！
                <br />
                本平台能幫你將你的愛心傳遞給需要的人。
              </p>
            </Stack>
            <HStack>
              <h2>你有物資需求嗎？</h2>
              <Button
                as={RouterLink}
                to="newrequest"
                colorScheme="teal"
                rightIcon={<ArrowForwardIcon />}
              >
                立即填寫表單
              </Button>
            </HStack>
          </Stack>
        </Box>
        <Box>
          <Image src={SpreadLove} alt="spread love to others" boxSize="400px" />
        </Box>
      </Flex>
    </Box>
  );
}
