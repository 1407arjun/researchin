import { Image } from '@chakra-ui/next-js'
import { HStack, Spacer, Button, Heading } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.svg'

export default function Namebar({
  headline,
  type
}: {
  headline?: boolean
  type?: 'light' | 'dark'
}) {
  if (!type) type = 'dark'

  return (
    <HStack px={8} py={4} justify="center" w="full">
      <Image w={10} src={Logo} alt="Researchin Logo" />
      <Heading size="lg" color={`${type}.headline`}>
        Researchin
      </Heading>
      {!headline && <Spacer display={['none', null, 'inherit']} />}
      {!headline && (
        <Button
          variant="outline"
          display={['none', null, 'inherit']}
          borderColor={`${type}.button`}
          color={`${type}.button`}
          colorScheme={type === 'dark' ? 'red' : 'twitter'}>
          Coming soon
        </Button>
      )}
    </HStack>
  )
}
