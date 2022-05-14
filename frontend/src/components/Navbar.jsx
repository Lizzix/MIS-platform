import { useState } from 'react'
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  ButtonGroup,
  useMediaQuery,
  IconButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

const logoStyle = {
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
}

function NotLogined({ colorMode, toggleColorMode }) {
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)')
  return (
    <>
      {isSmallerThan500 ? (
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <IconButton
                colorScheme="white"
                aria-label="Menu"
                icon={<HamburgerIcon />}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <MenuItem as={RouterLink} to="/login">
                登入
              </MenuItem>
              <MenuItem as={RouterLink} to="/signup">
                註冊
              </MenuItem>
              <MenuItem onClick={toggleColorMode}>切換深淺主題</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <Flex alignItems={'center'}>
          <ButtonGroup direction={'row'} spacing={2}>
            <Button onClick={toggleColorMode} border={'1px solid #EDF2F7'}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button as={RouterLink} to="/signup" border={'1px solid #EDF2F7'}>
              註冊
            </Button>
            <Button as={RouterLink} to="/login" border={'1px solid #EDF2F7'}>
              登入
            </Button>
          </ButtonGroup>
        </Flex>
      )}
    </>
  )
}

function Logined({ colorMode, toggleColorMode }) {
  return (
    <Flex alignItems={'center'}>
      <ButtonGroup spacing={5}>
        <Button onClick={toggleColorMode} border={'1px solid #EDF2F7'}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar
              size={'sm'}
              src={'https://avatars.dicebear.com/api/male/username.svg'}
            />
          </MenuButton>
          <MenuList alignItems={'center'}>
            <br />
            <Center>
              <Avatar
                size={'2xl'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </Center>
            <br />
            <Center>
              <p>Username</p> {/* // TODO: 登入時顯示名字 */}
            </Center>
            <br />
            <MenuDivider />
            <MenuItem>媒合紀錄</MenuItem>
            <MenuItem>登出</MenuItem>
          </MenuList>
        </Menu>
      </ButtonGroup>
    </Flex>
  )
}

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box bg={useColorModeValue('teal.400', 'teal.500')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link style={logoStyle} as={RouterLink} to="/" color={'gray.900'}>
          醫療物資互助交換平台
        </Link>
        {/* <Logined colorMode={colorMode} toggleColorMode={toggleColorMode} /> */}
        <NotLogined colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </Flex>
    </Box>
  )
}
