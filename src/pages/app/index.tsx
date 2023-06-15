import Footer from '@/components/Footer'
import Head from '@/components/Head'
import Navbar from '@/components/Navbar'
import { VStack } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

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
  return (
    <VStack bg="light.bg" align="center" minH="100vh" spacing={4}>
      <Navbar type="light" />
      <Head title="Home" />
      <Tabs
        w="100%"
        isFitted
        variant="enclosed"
        flex={1}
        textAlign="center"
        px={[8, null, 12]}>
        <TabList mb="1em">
          <Tab>For You</Tab>
          <Tab>Subscriptions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </VStack>
  )
}
