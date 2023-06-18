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
      <ChakraTag
        size={['sm', null, 'md']}
        variant="subtle"
        bg="dark.button"
        colorScheme="red"
        color="dark.buttontext"
        fontWeight="semibold"
        mb={[2, null, 'inherit']}>
        <TagLeftIcon as={MdDateRange} />
        <TagLabel>19/2929</TagLabel>
      </ChakraTag>
    </Stack>
  )
}

export default function Paper() {
  return (
    <VStack
      rounded="md"
      bg="light.card"
      p={4}
      w="full"
      align="start"
      spacing={0}
      _hover={{ transform: 'scale(1.02)', shadow: 'xl' }}
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
      <Flex wrap="wrap" gap={2} mt={4}>
        <Tag label="Hello" />
        <Tag label="Hello" />
        <Tag label="Hello" />
        <Tag label="Hello" />
      </Flex>
    </VStack>
  )
}
