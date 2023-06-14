import { Image } from '@chakra-ui/next-js'
import { HStack, Spacer, Avatar } from '@chakra-ui/react'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'
import { FaSearch } from 'react-icons/fa'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setApp } from '@/store/slices/app'
import { useApp } from '@/hooks/useApp'

export default function Navbar({ type }: { type?: 'light' | 'dark' }) {
  const app = useApp()
  const { user } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()

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
        name={user?.profile.name}
        src={user?.profile.pictureUrl}
        cursor="pointer"
        onClick={async () => {
          await app?.currentUser?.logOut()
          dispatch(setApp({ ...app }))
        }}
      />
      )
    </HStack>
  )
}
