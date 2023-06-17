import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Box
} from '@chakra-ui/react'
import { VStack, Heading, Flex, Input } from '@chakra-ui/react'

import { getPref, setTopics } from '@/store/slices/preferences'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'

const Topicbar = ({ topics, me }: { topics: string[]; me?: boolean }) => {
  return (
    <Flex wrap="wrap" gap={2}>
      {topics.map((t) => (
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
  const { topics } = useSelector(getPref)

  return (
    <Card>
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
        <Topicbar topics={topics} me />
      </Box>
      <Box w="full">
        <Heading size="md" color="light.bg" mb={3}>
          Search results
        </Heading>
        <Topicbar topics={[]} />
      </Box>
    </Card>
  )
}
