import { Box, Heading, Text, Button, Center } from '@chakra-ui/react'

export default function NotFound() {
  return (
    <Center bg="dark.bg" minH="100vh" py={10} px={6}>
      <Box textAlign="center">
        <Heading
          display="inline-block"
          as="h2"
          size="3xl"
          bg="dark.button"
          backgroundClip="text">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2} color="dark.headline">
          Page Not Found
        </Text>
        <Text mb={6} color="dark.paragraph">
          The page you&apos;re looking for does not seem to exist
        </Text>

        <Button
          colorScheme="red"
          bg="dark.button"
          color="dark.buttontext"
          variant="solid">
          Go to Home
        </Button>
      </Box>
    </Center>
  )
}
