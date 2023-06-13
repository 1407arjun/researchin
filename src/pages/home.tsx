import Footer from '@/components/Footer'
import Head from '@/components/Head'
import Navbar from '@/components/Navbar'
import { VStack } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { getAuthState } from '@/store/slices/auth'
import { useSelector } from 'react-redux'
import Auth from '@/types/auth'
import { useEffect } from 'react'

export default function Home() {
  const { isLoggedIn }: Auth = useSelector(getAuthState)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login')
  }, [isLoggedIn])

  return (
    <VStack bg="light.bg" align="center" minH="100vh" spacing={4}>
      <Navbar type="light" />
      <Head />
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
