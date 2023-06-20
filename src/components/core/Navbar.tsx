import { Image, Link } from '@chakra-ui/next-js'
import {
  HStack,
  Spacer,
  Avatar,
  Text,
  Box,
  Heading,
  Button
} from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'
import { FaSearch } from 'react-icons/fa'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { headers } from 'next/dist/client/components/headers'

const menuItems = [
  { title: 'Dashboard', href: '/app' },
  { title: 'Preferences', href: '/app/preferences' }
]

const AvatarMenu = ({
  user
}: {
  user: { name?: string | null; image?: string | null; email?: string | null }
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isOpen) setIsDeleting(false)
  }, [isOpen])

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        size="md"
        name={user?.name!}
        src={user?.image!}
        cursor="pointer"
      />
      <MenuList color="light.paragraph" bg="light.bg">
        <MenuGroup title="Signed in as" my={0} fontWeight="medium">
          <Text pl={4} fontWeight="semibold" fontSize="sm">
            {user?.email}
          </Text>
        </MenuGroup>
        <MenuDivider display={['inherit', 'none']} />
        <MenuGroup title="App" display={['inherit', 'none']} ml={3}>
          {menuItems.map((i) => (
            <MenuItem
              key={i.title}
              display={['inherit', 'none']}
              bg="light.bg"
              _hover={{ bg: 'dark.bg' }}
              onClick={() => router.push(i.href)}>
              {i.title}
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider borderColor="light.paragraph" />
        <MenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          bg="light.bg"
          _hover={{ bg: 'dark.bg' }}>
          Logout
        </MenuItem>
        <MenuItem
          onClick={onOpen}
          color="dark.button"
          bg="light.bg"
          _hover={{ bg: 'dark.bg' }}>
          Delete Account
          <AlertDialog
            isOpen={isOpen}
            //@ts-ignore
            leastDestructiveRef={cancelRef}
            onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent bg="light.bg">
                <AlertDialogHeader
                  fontSize="lg"
                  fontWeight="bold"
                  color="light.headline">
                  Delete Account
                </AlertDialogHeader>

                <AlertDialogBody color="light.paragraph">
                  Are you sure? You can&apos;t undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    //@ts-ignore
                    ref={cancelRef}
                    onClick={onClose}
                    colorScheme="twitter"
                    bg="light.button"
                    color="light.buttontext">
                    Cancel
                  </Button>
                  <Button
                    isLoading={isDeleting}
                    isDisabled={isDeleting}
                    bg="dark.button"
                    color="dark.buttontext"
                    colorScheme="red"
                    onClick={async () => {
                      try {
                        setIsDeleting(true)
                        const headers = new Headers()
                        headers.append(
                          'x-client-authorization',
                          session?.user.id!
                        )
                        const res = await fetch('/api/delete', {
                          method: 'DELETE',
                          headers
                        })
                      } catch (e) {
                      } finally {
                        setIsDeleting(false)
                        onClose()
                        signOut({ callbackUrl: '/' })
                      }
                    }}
                    ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const Searchbar = ({ display }: { display: (string | null)[] }) => {
  return (
    <Box display={display} w="full">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="#5f6c7b" />
        </InputLeftElement>
        <Input
          w={['full', null, null, 'revert']}
          placeholder="Search"
          _focus={{
            borderColor: 'light.button',
            shadow: 'none',
            borderWidth: 2
          }}
        />
      </InputGroup>
    </Box>
  )
}

export default function Navbar({
  headline,
  type
}: {
  headline?: boolean
  type?: 'light' | 'dark'
}) {
  const { data: session, status } = useSession()

  if (!type) type = 'dark'

  return (
    <HStack py={4} justify="center" w="full">
      <Link href="/">
        <Image w={10} src={Logo} alt="Researchin Logo" />
      </Link>
      <Heading
        as={Link}
        href="/"
        _hover={{ textDecor: 'none' }}
        size="lg"
        color="light.headline"
        display={['none', null, 'inherit']}>
        Researchin
      </Heading>
      {!headline && <Spacer display={['none', null, 'inherit']} />}
      {!headline &&
        (status === 'authenticated' ? (
          <>
            {menuItems.map((i) => (
              <Link
                key={i.title}
                display={['none', 'inherit']}
                flexShrink={0}
                mr={4}
                href={i.href}
                fontSize="md"
                color="light.headline"
                _hover={{ color: 'light.button' }}
                fontWeight="semibold">
                {i.title}
              </Link>
            ))}
            <AvatarMenu user={session?.user!} />
          </>
        ) : (
          <Link href="/auth/login" _hover={{ textDecor: 'none' }}>
            <Button
              variant="outline"
              display={['none', null, 'inherit']}
              borderColor={`${type}.button`}
              color={`${type}.button`}
              colorScheme={type === 'dark' ? 'red' : 'twitter'}>
              Login
            </Button>
          </Link>
        ))}
    </HStack>
  )
}
