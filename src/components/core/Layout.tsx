import Footer from '@/components/core/Footer'
import Head from '@/components/core/Head'
import Navbar from '@/components/core/Navbar'
import { Heading, VStack, Text } from '@chakra-ui/react'

import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'

export default function Layout({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) {
  const { status } = useSession()

  if (status === 'loading') return <Loading />

  return (
    <VStack
      bg="light.bg"
      align="center"
      minH="100vh"
      spacing={4}
      px={[8, null, 12]}>
      <Navbar type="light" />
      <Head title={title} />
      {children}
      <Footer />
    </VStack>
  )
}
