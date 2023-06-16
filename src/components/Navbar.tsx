import { Image, Link } from '@chakra-ui/next-js'
import { HStack, Spacer, Avatar, Text } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'
import { FaSearch } from 'react-icons/fa'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const AvatarMenu = ({
  user
}: {
  user: { name?: string | null; image?: string | null; email?: string | null }
}) => {
  const router = useRouter()

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
        <MenuDivider />
        <MenuItem
          display={['inherit', null, 'none']}
          onClick={() => router.push('/app/topics')}>
          My Topics
        </MenuItem>
        <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default function Navbar({ type }: { type?: 'light' | 'dark' }) {
  const { data: session } = useSession()

  if (!type) type = 'dark'

  return (
    <HStack pt={4} justify="center" w="full">
      <Image w={10} src={Logo} alt="Researchin Logo" />
      <InputGroup display={['none', null, 'inherit']}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="#5f6c7b" />
        </InputLeftElement>
        <Input w={['full', null, '50%', null, '33%']} placeholder="Search" />
      </InputGroup>
      <Spacer />
      <Link
        display={['none', null, 'inherit']}
        flexShrink={0}
        mr={4}
        href="/app/topics"
        fontSize="md"
        color="light.headline"
        _hover={{ color: 'light.button' }}
        fontWeight="semibold">
        My Topics
      </Link>
      <AvatarMenu user={session?.user!} />)
    </HStack>
  )
}
