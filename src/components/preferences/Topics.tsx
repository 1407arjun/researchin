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
    <Flex wrap="wrap" gap={2}>
      {topics.map((t) => (
        <Tag
          size="lg"
          key={t}
          borderRadius="full"
          variant="solid"
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
  console.log(topics)
  const [search, setSearch] = useState('')
  const allTopics = masterTopics.filter((t) => !topics.includes(t))

  return (
    <Card>
      <Input
        placeholder="Search for topics"
        borderColor="light.cardtext"
        borderWidth={1.5}
        _focus={{ borderColor: 'light.button', shadow: 'none', borderWidth: 2 }}
        color="ligth.bg"
        _placeholder={{ color: 'light.cardtext' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box w="full" mb={2}>
        <Heading size="md" color="light.bg" mb={3}>
          My Topics
        </Heading>
        <Topicbar
          topics={
            search.trim() !== ''
              ? topics.filter((t) =>
                  t.toLowerCase().includes(search.toLowerCase())
                )
              : [...topics]
          }
          me
        />
      </Box>
      <Box w="full">
        <Heading size="md" color="light.bg" mb={3}>
          Search results
        </Heading>
        <Topicbar
          topics={
            search.trim() !== ''
              ? allTopics.filter((t) =>
                  t.toLowerCase().includes(search.toLowerCase())
                )
              : [...allTopics]
          }
        />
      </Box>
    </Card>
  )
}
