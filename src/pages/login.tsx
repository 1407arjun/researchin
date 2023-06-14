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
import { useEffect } from 'react'
import { useApp } from '@/hooks/useApp'

export default function Login() {
  const app = useApp()
  const { status, user } = useAuth()

  useEffect(() => {
    console.log(status, user)
  }, [status, user])
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
            />
            <SocialButton
              icon={<FcGoogle />}
              label="Google"
              variant="outline"
              onClick={async () => {
                if (app) {
                  const user = await app.logIn(
                    Credentials.google({
                      redirectUrl: 'http://localhost:3000/auth/google'
                    })
                  )
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
