import { Image } from '@chakra-ui/next-js'
import { HStack, Spacer, Button, Heading } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'

export default function Navbar({ headline }: { headline?: boolean }) {
  return (
    <HStack px={8} py={4} justify="center" w="full">
      <Image w={12} src={Logo} alt="Researchin Logo" />
      <Heading size="lg" color="dark.headline">
        Researchin
      </Heading>
      {!headline && <Spacer display={['none', null, 'inherit']} />}
      {!headline && (
        <Button
          variant="outline"
          display={['none', null, 'inherit']}
          borderColor="dark.button"
          color="dark.button"
          colorScheme="red">
          Coming soon
        </Button>
      )}
    </HStack>
  )
}
