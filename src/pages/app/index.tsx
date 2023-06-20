import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'

import Paper from '@/components/home/Paper'
import Layout from '@/components/core/Layout'
import { Grid, Text } from '@chakra-ui/react'
import PaperType from '@/types/paper'

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

  if (status === 'loading' || status === 'unauthenticated') return <Loading />

  const papers: PaperType[] = []

  return (
    <Layout
      title="Home"
      heading={`Bonjour, ${session?.user?.name?.split(' ')[0]} 👋`}
      subheading="Here's new for you this week...">
      {papers.length > 0 ? (
        <Grid
          textAlign="initial"
          templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
          gap={4}>
          {papers.map((p) => (
            <Paper key={p.title} paper={p} />
          ))}
        </Grid>
      ) : (
        <Text color="light.headline" fontSize="xl" fontWeight="medium">
          Nothing here for now :(
        </Text>
      )}
    </Layout>
  )
}
