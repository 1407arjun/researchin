import Layout from '@/components/core/Layout'
import Year from '@/components/preferences/Year'
import Publisher from '@/components/preferences/Publisher'
import Topics from '@/components/preferences/Topics'
import { useQuery } from '@tanstack/react-query'
import { Skeleton, Stack, VStack } from '@chakra-ui/react'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'
import Preference from '@/types/preference'
import Publication from '@/types/publication'
import Error from '@/components/core/Error'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setMaxYear,
  setMinYear,
  setPubs,
  setTopics
} from '@/store/slices/preferences'

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
  const { status } = useSession()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['preferences'],
    queryFn: async (): Promise<{
      preferences: Preference
      publishers: Publication[]
    }> => {
      const res = await Promise.all([
        fetch('/api/preferences'),
        fetch('/api/publishers')
      ])
      return {
        preferences: await res[0].json(),
        publishers: await res[1].json()
      }
    }
  })

  const dispatch = useDispatch()
  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(data)
      const { topics, minYear, maxYear, pubs } = data.preferences
      dispatch(setTopics([...topics]))
      dispatch(setMinYear(minYear))
      dispatch(setMaxYear(maxYear))
      dispatch(setPubs([...pubs]))
    }
  }, [data])

  if (status === 'loading') return <Loading />

  if (isLoading)
    return (
      <Layout
        title="Preferences"
        heading="Preferences"
        subheading="Here's what you are interested in...">
        <Stack
          direction={['column', null, null, 'row']}
          w="full"
          spacing={[2, null, null, 4]}>
          <VStack w={['full', null, null, '67%']}>
            <Skeleton w="full" h={20} />
            <Skeleton w="full" h="full" />
            <Skeleton w="full" h="full" />
          </VStack>
          <Stack
            w={['full', null, null, '33%']}
            direction={['column', null, 'row', 'column']}>
            <Skeleton w="full" h={40} />
            <Skeleton w="full" h={40} />
          </Stack>
        </Stack>
      </Layout>
    )

  if (isError) {
    //@ts-ignore
    return <Error name={error.name} message={error.message} />
  }

  const { publishers } = data

  return (
    <Layout
      title="Preferences"
      heading="Preferences"
      subheading="Here's what you are interested in...">
      <Stack
        direction={['column', null, null, 'row']}
        w="full"
        spacing={[2, null, null, 4]}>
        <VStack w={['full', null, null, '67%']}>
          <Topics />
        </VStack>
        <Stack
          w={['full', null, null, '33%']}
          direction={['column', null, 'row', 'column']}>
          <Publisher publishers={publishers.map((p) => p.name)} />
          <Year />
        </Stack>
      </Stack>
    </Layout>
  )
}
