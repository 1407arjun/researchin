import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Box,
  IconButton
} from '@chakra-ui/react'
import { Heading, Flex, Input } from '@chakra-ui/react'
import { MdAdd, MdClose } from 'react-icons/md'

import {
  addTopic,
  getPref,
  removeTopic,
  setTopics
} from '@/store/slices/preferences'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
import { useEffect, useState } from 'react'

const masterTopics = [
  'Blockchain',
  'Machine Learning',
  'Artificial Intelligence',
  'Cloud Computing',
  'Parallel Computing'
]

const Topicbar = ({ topics, me }: { topics: string[]; me?: boolean }) => {
  const dispatch = useDispatch()

  return (
    <Flex wrap="wrap" gap={4} justify="start" pb={!me ? 2 : 'initial'}>
      {topics.map((t) => (
        <Tag
          size="lg"
          key={t}
          borderRadius="full"
          variant="solid"
          bg="light.button"
          color="light.buttontext"
          colorScheme="twitter">
          <TagLabel>{t}</TagLabel>
          {me && (
            <IconButton
              size="sm"
              aria-label="Remove topic"
              onClick={() => dispatch(removeTopic(t))}
              bg="transparent"
              color="light.bg"
              _hover={{ bg: 'transparent', opacity: 0.75 }}
              cursor="pointer"
              icon={<MdClose />}
              fontSize="lg"
            />
          )}
          {!me && (
            <IconButton
              size="sm"
              aria-label="Add topic"
              onClick={() => dispatch(addTopic(t))}
              bg="transparent"
              color="light.bg"
              _hover={{ bg: 'transparent', opacity: 0.75 }}
              cursor="pointer"
              icon={<MdAdd />}
              fontSize="lg"
            />
          )}
        </Tag>
      ))}
    </Flex>
  )
}

export default function Topics() {
  const { topics } = useSelector(getPref)
  const [search, setSearch] = useState('')
  const allTopics = masterTopics.filter((t) => !topics.includes(t)).sort()

  return (
    <Card>
      <Heading size="md" color="light.bg" mb={1}>
        My Topics
      </Heading>
      <Input
        placeholder="Search for topics"
        borderColor="light.cardtext"
        borderWidth={1.5}
        _focus={{ borderColor: 'light.button', shadow: 'none', borderWidth: 2 }}
        color="ligth.bg"
        _placeholder={{ color: 'light.cardtext' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={2}
      />
      <Box w="full" mb={2}>
        <Topicbar
          topics={
            search.trim() !== ''
              ? topics
                  .filter((t) => t.toLowerCase().includes(search.toLowerCase()))
                  .sort()
              : [...topics].sort()
          }
          me
        />
      </Box>
      <Box w="full">
        <Heading size="sm" color="light.bg" mb={3}>
          Suggested topics
        </Heading>
        <Topicbar
          topics={
            search.trim() !== ''
              ? allTopics
                  .filter((t) => t.toLowerCase().includes(search.toLowerCase()))
                  .sort()
              : [...allTopics].sort()
          }
        />
      </Box>
    </Card>
  )
}
