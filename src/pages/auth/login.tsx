import Navbar from '@/components/core/Navbar'
import Head from '@/components/core/Head'
import SocialButton from '@/components/auth/SocialButton'
import { Center, Box, Stack, Text, VStack, Heading } from '@chakra-ui/react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Footer from '@/components/core/Footer'

import { signIn, useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (session)
    return {
      redirect: {
        destination: '/app'
      },
      props: {}
    }
  return {
    props: {}
  }
}

export default function Login() {
  const { status } = useSession()

  if (status === 'loading') return <Loading />

  return (
    <Center bg="dark.bg" minH="100vh">
      <VStack align="center" spacing={[8, null, 12]} p={8} maxW="xl" w="full">
        <Box>
          <Navbar headline />
          <Head title="Login" />
          <Heading
            size="lg"
            fontWeight="semibold"
            color="dark.headline"
            textAlign="center">
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
              onClick={() => signIn('google', { callbackUrl: '/app' })}
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
