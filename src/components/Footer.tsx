import { HStack, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <HStack px={8} py={4} w="100%" justify="center">
      <Text fontSize="sm" color="dark.paragraph">
        &copy;2023 Researchin. All rights reserved.
      </Text>
    </HStack>
  )
}
