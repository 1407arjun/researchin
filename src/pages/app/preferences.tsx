import Layout from '@/components/core/Layout'
import Year from '@/components/preferences/Year'
import Publisher from '@/components/preferences/Publisher'
import Topics from '@/components/preferences/Topics'
import { useQuery } from '@tanstack/react-query'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'
import Preference from '@/types/preference'
import Publication from '@/types/publication'
import { Skeleton, Stack, VStack } from '@chakra-ui/react'

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

export default function Preferences() {
  const { data: session, status } = useSession()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['preferences'],
    queryFn: async (): Promise<{
      preferences?: Preference
      publishers: Publication[]
    }> => {
      if (session) {
        const res = await Promise.all([
          fetch('/api/preferences', {
            method: 'POST',
            body: JSON.stringify({ userId: session?.user.id })
          }),
          fetch('/api/publishers')
        ])
        return {
          preferences: await res[0].json(),
          publishers: await res[1].json()
        }
      } else return { publishers: [] }
    }
  })

  if (status === 'loading') return <Loading />

  if (isLoading)
    return (
      <Layout
        title="Preferences"
        heading="Preferences"
        subheading="Here's what you are interested in...">
        <Stack direction="row" w="full" spacing={4}>
          <VStack w="full">
            <Skeleton w="full" h={20} />
            <Skeleton w="full" h="full" />
            <Skeleton w="full" h="full" />
          </VStack>
          <VStack w="60%">
            <Skeleton w="full" h={40} />
            <Skeleton w="full" h={40} />
          </VStack>
        </Stack>
      </Layout>
    )

  return (
    <Layout
      title="Preferences"
      heading="Preferences"
      subheading="Here's what you are interested in...">
      <Stack direction="row" w="full" spacing={4}>
        <VStack w="67%">
          <Topics />
        </VStack>
        <VStack w="33%">
          <Publisher />
          <Year />
        </VStack>
      </Stack>
    </Layout>
  )
}
