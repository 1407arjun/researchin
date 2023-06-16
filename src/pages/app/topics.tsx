import {
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Heading,
  Text
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'
import MyTopics from '@/components/topics/Topic'
import Layout from '@/components/core/Layout'

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

const Searchbar = ({ display }: { display: (string | null)[] }) => {
  return (
    <InputGroup display={display}>
      <InputLeftElement pointerEvents="none">
        <FaSearch color="#5f6c7b" />
      </InputLeftElement>
      <Input w={['full', null, null, '50%']} placeholder="Search" />
    </InputGroup>
  )
}

export default function Topics() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <Loading />

  return (
    <Layout title="My Topics">
      <VStack align="start" w="full" spacing={1}>
        <Heading
          size="lg"
          fontWeight="semibold"
          lineHeight="110%"
          color="light.headline">
          My Topics
        </Heading>
        <Text fontSize="md" color="light.paragraph">
          Here&apos;s what you are interested in...
        </Text>
      </VStack>
    </Layout>
  )
}
