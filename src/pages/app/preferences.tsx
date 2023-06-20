import Layout from '@/components/core/Layout'
import Year from '@/components/preferences/Year'
import Publisher from '@/components/preferences/Publisher'
import Topics from '@/components/preferences/Topics'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  LightMode,
  Skeleton,
  Stack,
  VStack,
  useToast
} from '@chakra-ui/react'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'
import Preference from '@/types/preference'
import Publication from '@/types/publication'
import Error from '@/components/core/Error'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPref,
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
  const { data: session, status } = useSession()
  const [isSaving, setIsSaving] = useState(false)
  const { topics, minYear, maxYear, pubIds } = useSelector(getPref)
  const { isLoading, isError, data, error } = useQuery(
    ['preferences'],
    async (): Promise<{
      preferences: Preference
      publishers: Publication[]
    }> => {
      const headers = new Headers()
      headers.append('x-client-authorization', session?.user.id!)
      const res = await Promise.all([
        fetch('/api/preferences', {
          method: 'GET',
          headers
        }),
        fetch('/api/publishers', {
          method: 'GET',
          headers
        })
      ])
      return {
        preferences: await res[0].json(),
        publishers: await res[1].json()
      }
    },
    { enabled: status === 'authenticated' }
  )

  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    if (!isLoading && !isError) {
      const { topics, minYear, maxYear, pubIds } = data.preferences
      dispatch(setTopics([...topics]))
      dispatch(setMinYear(minYear))
      dispatch(setMaxYear(maxYear))
      dispatch(setPubs([...pubIds]))
    }
  }, [data])

  if (status === 'loading' || status === 'unauthenticated') return <Loading />

  if (isError) {
    //@ts-ignore
    return <Error name={error.name} message={error.message} />
  }

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
          {!isLoading ? (
            <Topics />
          ) : (
            <LightMode>
              <Skeleton w="full" h={20} />
              <Skeleton w="full" h="full" />
              <Skeleton w="full" h="full" />
            </LightMode>
          )}
        </VStack>
        <Stack
          w={['full', null, null, '33%']}
          direction={['column', null, 'row', 'column']}>
          {!isLoading ? (
            <Publisher
              myPublishers={data.preferences.pubIds}
              publishers={data.publishers}
            />
          ) : (
            <LightMode>
              <Skeleton w="full" h={40} />
            </LightMode>
          )}
          {!isLoading ? (
            <Year
              min={data.preferences.minYear}
              max={data.preferences.maxYear}
            />
          ) : (
            <LightMode>
              <Skeleton w="full" h={40} />
            </LightMode>
          )}
        </Stack>
      </Stack>
      <Button
        mt={4}
        bg="light.button"
        color="light.buttontext"
        colorScheme="twitter"
        size="md"
        isDisabled={isSaving}
        isLoading={isSaving}
        onClick={async () => {
          try {
            setIsSaving(true)
            const headers = new Headers()
            headers.append('x-client-authorization', session?.user.id!)
            const res = await fetch('/api/preferences', {
              method: 'PUT',
              headers,
              body: JSON.stringify({ topics, minYear, maxYear, pubIds })
            })
            toast({
              title: 'Success',
              description: 'Preferences saved successfully',
              status: 'success',
              duration: 5000,
              isClosable: true
            })
          } catch (e) {
            toast({
              //@ts-ignore
              title: e.name,
              //@ts-ignore
              description: e.message,
              status: 'error',
              duration: 5000,
              isClosable: true
            })
          } finally {
            setIsSaving(false)
          }
        }}>
        Save changes
      </Button>
    </Layout>
  )
}
