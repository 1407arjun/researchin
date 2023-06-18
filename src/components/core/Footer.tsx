import { HStack, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <HStack px={8} py={4} w="full" justify="center" align="end">
      <Text fontSize="sm" color="dark.paragraph" textAlign="center">
        &copy;2023 Researchin. All rights reserved.
      </Text>
    </HStack>
  )
}
