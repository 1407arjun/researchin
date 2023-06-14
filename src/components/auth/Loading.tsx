import { Center, Spinner } from '@chakra-ui/react'
import Head from '../Head'

export default function Loading() {
  return (
    <Center bg="light.bg" minH="100vh" p={8}>
      <Head title="Loading" />
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="light.headline"
        color="dark.bg"
        size="xl"
      />
    </Center>
  )
}
