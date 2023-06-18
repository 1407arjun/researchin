import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

export default function Error({
  name,
  message
}: {
  name: string
  message: string
}) {
  return (
    <Center bg="dark.bg" minH="100vh" py={10} px={6}>
      <Box textAlign="center">
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg="dark.button"
            rounded="50px"
            w="55px"
            h="55px"
            textAlign="center"
            color="dark.buttontext"
            fontSize="40px">
            <MdClose />
          </Flex>
        </Box>
        <Heading as="h2" size="xl" mt={6} mb={2} color="dark.headline">
          {name}
        </Heading>
        <Text color="dark.paragraph">{message}</Text>
      </Box>
    </Center>
  )
}
