import Namebar from '@/components/Namebar'
import Head from '@/components/Head'
import SocialButton from '@/components/auth/SocialButton'
import {
  Center,
  Box,
  Stack,
  Link,
  Text,
  VStack,
  Heading
} from '@chakra-ui/react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Footer from '@/components/Footer'

import Auth from '@/types/auth'
import { getAuthState, setLoggedIn, setUser } from '@/store/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { signInWithPopup } from 'firebase/auth'
import { useEffect } from 'react'

export default function AuthScreen({ login }: { login?: boolean }) {
  const { auth, provider, isLoggedIn }: Auth = useSelector(getAuthState)
  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) router.replace('/home')
  }, [isLoggedIn])

  return (
    <Center bg="dark.bg" minH="100vh">
      <VStack align="center" spacing={[8, null, 12]} p={8} maxW="xl" w="full">
        <Box>
          <Namebar headline />
          <Head />
          <Heading size="lg" fontWeight="semibold" color="dark.headline">
            {login ? 'Sign into your account' : 'Create a new account'}
          </Heading>
        </Box>
        <Box rounded="lg" bg="dark.card" boxShadow="lg" p={8} w="full">
          <Stack spacing={4}>
            <SocialButton
              icon={<FaFacebook />}
              label="Facebook"
              colorScheme="facebook"
              login={login}
            />
            <SocialButton
              icon={<FcGoogle />}
              label="Google"
              variant="outline"
              login={login}
              onClick={async () => {
                const result = await signInWithPopup(auth, provider)
                if (result) {
                  dispatch(setLoggedIn(result.user ? true : false))
                  dispatch(setUser(result.user))
                }
              }}
            />
            <Text align="center" pt={6} color="dark.cardtext">
              {login ? "Don't have an account? " : 'Already have an account? '}
              <Link color="dark.headline">
                {login ? 'Create one' : 'Login'}
              </Link>
            </Text>
          </Stack>
        </Box>
        <Footer />
      </VStack>
    </Center>
  )
}
