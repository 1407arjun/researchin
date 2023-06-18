import { Checkbox, CheckboxGroup, Skeleton } from '@chakra-ui/react'
import { Heading, Flex } from '@chakra-ui/react'
import Card from './Card'

import { getPref, setPubs } from '@/store/slices/preferences'
import { useDispatch, useSelector } from 'react-redux'
import Publication from '@/types/publication'

export default function Publisher({
  myPublishers,
  publishers
}: {
  myPublishers: string[]
  publishers: Publication[]
}) {
  const dispatch = useDispatch()

  return (
    <Card>
      <Heading size="md" color="light.bg" mb={1}>
        Publishers (A-Z)
      </Heading>
      <CheckboxGroup
        colorScheme="twitter"
        defaultValue={myPublishers}
        onChange={(val) => dispatch(setPubs([...val]))}>
        <Flex
          wrap="wrap"
          gap={4}
          alignSelf="start"
          justify="space-evenly"
          w="full">
          {publishers.map((p) => {
            return (
              <Checkbox key={p._id} value={p._id} fontWeight="semibold">
                {p.name}
              </Checkbox>
            )
          })}
        </Flex>
      </CheckboxGroup>
    </Card>
  )
}
