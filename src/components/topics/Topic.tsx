import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton
} from '@chakra-ui/react'

export default function Topic() {
  return (
    <Tag size="lg" borderRadius="full" variant="solid" colorScheme="green">
      <TagLabel>Green</TagLabel>
      <TagCloseButton />
    </Tag>
  )
}
