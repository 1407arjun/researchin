import Footer from '@/components/core/Footer'
import Head from '@/components/core/Head'
import Navbar from '@/components/core/Navbar'
import { Heading, VStack, Text } from '@chakra-ui/react'

import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'

export default function Layout({
  children,
  title,
  heading,
  subheading
}: {
  children: React.ReactNode
  title: string
  heading: string
  subheading: string
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
      <VStack align="start" w="full" spacing={1}>
        <Heading
          size="lg"
          fontWeight="semibold"
          lineHeight="110%"
          color="light.headline">
          {heading}
        </Heading>
        <Text fontSize="md" color="light.paragraph">
          {subheading}
        </Text>
      </VStack>
      {children}
      <Footer />
    </VStack>
  )
}
