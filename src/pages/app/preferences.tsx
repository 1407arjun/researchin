import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Loading from '@/components/auth/Loading'
import { useSession } from 'next-auth/react'

import Layout from '@/components/core/Layout'
import Year from '@/components/preferences/Year'
import Publisher from '@/components/preferences/Publisher'
import Topics from '@/components/preferences/Topics'

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

export default function Preferences() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <Loading />

  return (
    <Layout
      title="Preferences"
      heading="Preferences"
      subheading="Here's what you are interested in...">
      <Topics />
      <Year />
      <Publisher />
    </Layout>
  )
}
