import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Box
} from '@chakra-ui/react'
import { VStack, Heading, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'

const Topicbar = ({ tags, me }: { tags: string[]; me?: boolean }) => {
  return (
    <Flex wrap="wrap" gap={2}>
      {tags.map((t) => (
        <Tag
          size="lg"
          key={t}
          borderRadius="full"
          variant="solid"
          colorScheme="twitter">
          <TagLabel>{t}</TagLabel>
          {me && <TagCloseButton />}
          {!me && <TagCloseButton />}
        </Tag>
      ))}
    </Flex>
  )
}

export default function Topics() {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <VStack
      bg="light.card"
      shadow="lg"
      color="light.cardtext"
      py={4}
      px={6}
      rounded="md"
      spacing={4}>
      <Input
        placeholder="Search for topics"
        borderColor="light.cardtext"
        borderWidth={1.5}
        _focus={{ borderColor: 'light.button', shadow: 'none', borderWidth: 2 }}
        color="ligth.bg"
        _placeholder={{ color: 'light.cardtext' }}
      />
      <Box w="full" mb={2}>
        <Heading size="md" color="light.bg" mb={3}>
          My Topics
        </Heading>
        <Topicbar tags={['Machine Learning', 'Artificial Intelligence']} me />
      </Box>
      <Box w="full">
        <Heading size="md" color="light.bg" mb={3}>
          Search results
        </Heading>
        <Topicbar tags={[]} />
      </Box>
    </VStack>
  )
}
