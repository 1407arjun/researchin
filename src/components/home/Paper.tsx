import PaperType from '@/types/paper'
import { Link } from '@chakra-ui/next-js'
import {
  Flex,
  HStack,
  Stack,
  Heading,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react'
import { Tag as ChakraTag, TagLeftIcon, TagLabel } from '@chakra-ui/react'
import { MdDateRange } from 'react-icons/md'

const Tag = ({ label }: { label: string }) => {
  return (
    <ChakraTag
      size="md"
      variant="solid"
      bg="light.button"
      color="light.buttontext"
      colorScheme="twitter"
      fontWeight="semibold">
      {label}
    </ChakraTag>
  )
}

const Info = ({
  display,
  pub,
  date
}: {
  display: (string | null)[]
  pub: string
  date: string
}) => {
  return (
    <Stack
      direction={['row', null, 'column']}
      display={display}
      alignSelf="start"
      align={['center', null, 'end']}>
      <Text fontSize={['md', null, 'lg']} fontWeight="bold" color="dark.button">
        {pub}
      </Text>
      <ChakraTag
        size={['sm', null, 'md']}
        variant="subtle"
        bg="dark.button"
        colorScheme="red"
        color="dark.buttontext"
        fontWeight="semibold"
        mb={[2, null, 'inherit']}>
        <TagLeftIcon as={MdDateRange} />
        <TagLabel>{date}</TagLabel>
      </ChakraTag>
    </Stack>
  )
}

export default function Paper({ paper }: { paper: PaperType }) {
  return (
    <VStack
      as={Link}
      href={paper.url}
      target="_blank"
      rounded="md"
      bg="light.card"
      p={4}
      w="full"
      align="start"
      spacing={0}
      _hover={{ transform: 'scale(1.02)', shadow: 'xl' }}
      cursor="pointer">
      <Info
        display={['inherit', null, 'none']}
        pub={paper.pub.name}
        date={paper.date}
      />
      <HStack w="full" spacing={4}>
        <VStack align="start" spacing={1}>
          <Heading size="md" color="light.bg">
            {paper.title}
          </Heading>
          <Text fontSize="sm" fontWeight="medium" color="light.cardtext">
            {paper.authors.join(', ')}
          </Text>
          <Text fontSize="xs" fontWeight="medium" color="light.cardtext">
            {paper.conf}
          </Text>
        </VStack>
        <Spacer display={['none', null, 'inherit']} />
        <Info
          display={['none', null, 'inherit']}
          pub={paper.pub.name}
          date={paper.date}
        />
      </HStack>
      <Flex wrap="wrap" gap={2} mt={4}>
        {paper.topics.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </Flex>
    </VStack>
  )
}
