import { Box, Flex, Button, Stack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function NavbarTest() {
  return (
    <Box
      bgGradient={'linear(to-r, orange.100 0%, orange.100 40%, teal.100 90%)'}
      px={4}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Link as={RouterLink} to="/" color={'gray.900'}>
            醫療物資互助交換平台
          </Link>
        </Box>
        <Flex alignItems={'center'}>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'#'}
            >
              Sign In
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              href={'#'}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
