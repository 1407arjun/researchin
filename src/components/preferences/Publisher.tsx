import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { VStack, Heading, Stack } from '@chakra-ui/react'
import { useState } from 'react'

const publishers = ['IEEE', 'Springer']

export default function Publisher() {
  const [selected, setSelected] = useState<(string | number)[]>([])
  return (
    <VStack
      bg="light.card"
      shadow="lg"
      color="light.cardtext"
      py={4}
      px={6}
      rounded="md">
      <Heading size="md" color="light.bg" mb={1}>
        Publishers (A-Z)
      </Heading>
      <CheckboxGroup
        colorScheme="twitter"
        defaultValue={['naruto', 'kakashi']}
        onChange={(val) => setSelected([...val])}>
        <Stack direction="column" alignSelf="start">
          {publishers.map((p) => (
            <Checkbox key={p} value={p}>
              {p}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </VStack>
  )
}
