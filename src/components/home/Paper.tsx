import PaperType from '@/types/paper'
import {
  Flex,
  HStack,
  Stack,
  Heading,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react'
import { BsTagFill } from 'react-icons/bs'
import { MdDateRange } from 'react-icons/md'

const Tag = ({ label }: { label: string }) => {
  return (
    <Text
      bg="light.button"
      color="light.buttontext"
      px={2}
      py={1}
      rounded="md"
      fontSize="xs"
      fontWeight="semibold">
      {label}
    </Text>
  )
}

const Info = ({ display }: { display: (string | null)[] }) => {
  return (
    <Stack
      direction={['row', null, 'column']}
      display={display}
      alignSelf="start"
      align={['center', null, 'end']}>
      <Text fontSize={['md', null, 'lg']} fontWeight="bold" color="dark.button">
        IEEE
      </Text>
      <HStack
        bg="dark.button"
        color="dark.buttontext"
        px={2}
        py={1}
        mb={[2, null, 'inherit']}
        rounded="md"
        fontSize={['xs', null, 'sm']}
        fontWeight="semibold">
        <MdDateRange />
        <Text>19/2929</Text>
      </HStack>
    </Stack>
  )
}

export default function Paper() {
  return (
    <VStack
      rounded="lg"
      bg="light.card"
      boxShadow="lg"
      p={4}
      w="full"
      align="start"
      spacing={0}
      _hover={{ transform: 'scale(1.02)' }}
      cursor="pointer">
      <Info display={['inherit', null, 'none']} />
      <HStack w="full" spacing={4}>
        <VStack align="start" spacing={1}>
          <Heading size="md" color="light.bg">
            Sports Highlights Generation using Decomposed Audio Information
          </Heading>
          <Text fontSize="sm" fontWeight="medium" color="light.cardtext">
            Muhammad Rafiqul Islam; et al.
          </Text>
          <Text fontSize="xs" fontWeight="medium" color="light.cardtext">
            2019 IEEE International Conference on Multimedia & Expo Workshops
            (ICMEW)
          </Text>
        </VStack>
        <Spacer display={['none', null, 'inherit']} />
        <Info display={['none', null, 'inherit']} />
      </HStack>
      <HStack spacing={1} color="light.bg" fontSize={['xs', null, 'sm']} mt={2}>
        <BsTagFill />
        <Text fontWeight="bold">Tags: </Text>
      </HStack>
      <Flex wrap="wrap" gap={2} mt={1}>
        <Tag label="Hello" />
        <Tag label="Hello" />
        <Tag label="Hello" />
        <Tag label="Hello" />
      </Flex>
    </VStack>
  )
}
