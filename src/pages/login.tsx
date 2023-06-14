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

import { Credentials } from 'realm-web'
import useAuth from '@/hooks/useAuth'
import { useApp } from '@/hooks/useApp'
import Loading from '@/components/auth/Loading'
import { AuthStatus } from '@/types/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
  const app = useApp()
  const { status } = useAuth()
  const router = useRouter()
  const [disabled, setDisabled] = useState(false)

  switch (status) {
    case AuthStatus.LOADING:
      return <Loading />
    case AuthStatus.AUTHENTICATED:
      router.replace('/home')
      break
  }

  return (
    <Center bg="dark.bg" minH="100vh">
      <VStack align="center" spacing={[8, null, 12]} p={8} maxW="xl" w="full">
        <Box>
          <Namebar headline />
          <Head />
          <Heading size="lg" fontWeight="semibold" color="dark.headline">
            Sign in/Sign up
          </Heading>
        </Box>
        <Box rounded="lg" bg="dark.card" boxShadow="lg" p={8} w="full">
          <Stack spacing={4}>
            <SocialButton
              icon={<FaFacebook />}
              label="Facebook"
              colorScheme="facebook"
              isDisabled={disabled}
            />
            <SocialButton
              icon={<FcGoogle />}
              label="Google"
              variant="outline"
              isDisabled={disabled}
              onClick={async () => {
                if (app) {
                  try {
                    setDisabled(true)
                    await app.logIn(
                      Credentials.google({
                        redirectUrl: `${process.env
                          .NEXT_PUBLIC_BASE_URL!}/auth/google`
                      })
                    )
                  } catch (e) {
                    alert(e)
                  } finally {
                    setDisabled(false)
                  }
                }
              }}
            />
            <Text align="center" pt={6} color="dark.cardtext">
              Don&apos;t have an account? Create one by signing in!
            </Text>
          </Stack>
        </Box>
        <Footer />
      </VStack>
    </Center>
  )
}
