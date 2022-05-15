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
  useColorModeValue,
  useColorMode,
  Center,
  ButtonGroup,
  useMediaQuery,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../features/userSlice'

const logoStyle = {
  fontSize: 25,
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
              as={IconButton}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
              icon={<HamburgerIcon />}
              colorScheme="white"
            ></MenuButton>
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
          <ButtonGroup direction={'row'} spacing={3}>
            <Button
              size={'sm'}
              onClick={toggleColorMode}
              border={'1px solid #EDF2F7'}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              fontSize={16}
              size={'sm'}
              as={RouterLink}
              to="/signup"
              border={'1px solid #EDF2F7'}
            >
              註冊
            </Button>
            <Button
              fontSize={16}
              size={'sm'}
              as={RouterLink}
              to="/login"
              border={'1px solid #EDF2F7'}
            >
              登入
            </Button>
          </ButtonGroup>
        </Flex>
      )}
    </>
  )
}

function Logined({ colorMode, toggleColorMode }) {
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)')
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const toast = useToast()
  const handleLogout = () => {
    dispatch(logout())
    toast({
      description: '您已成功登出。',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    })
  }
  const handleAccountPage = () => {
    //TODO: 轉跳個人頁面
  }
  return (
    <>
      {' '}
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
              <Avatar
                size={'sm'}
                bg="orange.300"
                border={'2px solid #EDF2F7'}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <Center>{user.username}</Center>
              <MenuDivider />
              <MenuItem onClick={handleAccountPage}>媒合紀錄</MenuItem>
              <MenuItem onClick={toggleColorMode}>切換深淺主題</MenuItem>
              <MenuItem onClick={handleLogout}>登出</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <Flex alignItems={'center'}>
          <Button
            size={'sm'}
            onClick={toggleColorMode}
            border={'1px solid #EDF2F7'}
            mr={3}
          >
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
                bg="orange.300"
                border={'2px solid #EDF2F7'}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <Center>{user.username}</Center>
              <MenuDivider />
              <MenuItem onClick={handleAccountPage}>媒合紀錄</MenuItem>
              <MenuItem onClick={handleLogout}>登出</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </>
  )
}

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const user = useSelector(selectUser)
  return (
    <Box bg={useColorModeValue('teal.400', 'teal.500')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link style={logoStyle} as={RouterLink} to="/" color={'gray.900'}>
          醫療物資互助交換平台
        </Link>
        {user ? (
          <Logined colorMode={colorMode} toggleColorMode={toggleColorMode} />
        ) : (
          <NotLogined colorMode={colorMode} toggleColorMode={toggleColorMode} />
        )}
      </Flex>
    </Box>
  )
}
