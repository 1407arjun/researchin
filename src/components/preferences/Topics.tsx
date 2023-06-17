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

import { getPref, setTopics } from '@/store/slices/preferences'
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
              onClick={() =>
                dispatch(setTopics(topics.filter((tp) => tp !== t)))
              }
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
              onClick={() => dispatch(setTopics([...topics, t]))}
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
  const [myTopics, setMyTopics] = useState(topics)
  const [allTopics, setAllTopics] = useState(
    masterTopics.filter((t) => !topics.includes(t))
  )

  useEffect(() => {
    setMyTopics(
      search ? myTopics.filter((t) => t.includes(search)) : [...topics]
    )
    setAllTopics(
      search ? allTopics.filter((t) => t.includes(search)) : [...allTopics]
    )
  }, [search])

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
        <Topicbar topics={myTopics} me />
      </Box>
      <Box w="full">
        <Heading size="md" color="light.bg" mb={3}>
          Search results
        </Heading>
        <Topicbar topics={allTopics} />
      </Box>
    </Card>
  )
}
