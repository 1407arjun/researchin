import { Image } from '@chakra-ui/next-js'
import { HStack, Spacer, Button } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'

export default function Navbar() {
  return (
    <HStack px={8} py={4} justify={['center', null, 'space-between']} w="100%">
      <Image w={12} src={Logo} alt="Researchin Logo" />
      <Spacer display={['none', null, 'inherit']} />
      <Button
        variant="outline"
        display={['none', null, 'inherit']}
        borderColor="dark.button"
        color="dark.button"
        colorScheme="red">
        Coming soon
      </Button>
    </HStack>
  )
}
