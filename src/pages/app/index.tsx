import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'

import Paper from '@/components/home/Paper'
import Layout from '@/components/core/Layout'
import { Grid, Heading, Text, VStack } from '@chakra-ui/react'

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
    <Layout title="Home">
      <VStack align="start" w="full" spacing={1}>
        <Heading
          size="lg"
          fontWeight="semibold"
          lineHeight="110%"
          color="light.headline">
          Bonjour, ${session?.user?.name?.split(' ')[0]} 👋
        </Heading>
        <Text fontSize="md" color="light.paragraph">
          Here&apos;s new for you this week...
        </Text>
      </VStack>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
        gap={4}>
        <Paper />
        <Paper />
        <Paper />
      </Grid>
    </Layout>
  )
}
