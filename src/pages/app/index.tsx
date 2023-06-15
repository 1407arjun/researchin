import Footer from '@/components/Footer'
import Head from '@/components/Head'
import Navbar from '@/components/Navbar'
import { Heading, VStack, Text, Grid } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'
import Paper from '@/components/home/Paper'

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!session)
    return {
      redirect: {
        destination: '/auth/login'
      },
      props: {}
    }
  return {
    props: {}
  }
}

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <Loading />

  return (
    <VStack
      bg="light.bg"
      align="center"
      minH="100vh"
      spacing={4}
      px={[8, null, 12]}>
      <Navbar type="light" />
      <Head title="Home" />
      <VStack align="start" w="100%" spacing={1}>
        <Heading
          size="lg"
          fontWeight="semibold"
          lineHeight="110%"
          color="light.headline">
          Bonjour, {session?.user?.name?.split(' ')[0]} 👋
        </Heading>
        <Text fontSize="md" color="light.paragraph">
          Here&apos;s new for you this week...
        </Text>
      </VStack>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']}
        gap={4}>
        <Paper />
        <Paper />
        <Paper />
      </Grid>
      <Footer />
    </VStack>
  )
}
