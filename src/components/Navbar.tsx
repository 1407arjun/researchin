import { Image } from '@chakra-ui/next-js'
import {
  HStack,
  Box,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar
} from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'
import { FaSearch } from 'react-icons/fa'

import Auth from '@/types/auth'
import { useSelector } from 'react-redux'
import { getAuthState } from '@/store/slices/auth'

export default function Navbar({ type }: { type?: 'light' | 'dark' }) {
  if (!type) type = 'dark'

  const { auth }: Auth = useSelector(getAuthState)

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
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        onClick={async () => await auth.signOut()}
      />
      )
    </HStack>
  )
}
