import { Image } from '@chakra-ui/next-js'
import { HStack, Spacer, Avatar } from '@chakra-ui/react'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'
import { FaSearch } from 'react-icons/fa'

import { signOut } from 'next-auth/react'

export default function Navbar({ type }: { type?: 'light' | 'dark' }) {
  if (!type) type = 'dark'

  return (
    <HStack px={[8, null, 12]} py={4} justify="center" w="full">
      <Image w={10} src={Logo} alt="Researchin Logo" />
      <InputGroup display={['none', null, 'inherit']}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="#5f6c7b" />
        </InputLeftElement>
        <Input w="33%" placeholder="Search" />
      </InputGroup>
      <Spacer />
      <Avatar
        size="md"
        name={''}
        src={''}
        cursor="pointer"
        onClick={() => signOut({ callbackUrl: '/' })}
      />
      )
    </HStack>
  )
}
