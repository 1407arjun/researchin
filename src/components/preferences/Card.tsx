import { VStack } from '@chakra-ui/react'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      w="full"
      h="full"
      bg="light.card"
      shadow="lg"
      color="light.cardtext"
      py={4}
      px={6}
      rounded="md"
      spacing={4}
      align="start">
      {children}
    </VStack>
  )
}
