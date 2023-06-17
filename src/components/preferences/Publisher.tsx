import { Checkbox, CheckboxGroup, Skeleton } from '@chakra-ui/react'
import { Heading, Stack } from '@chakra-ui/react'
import Card from './Card'

import { getPref, setPubs } from '@/store/slices/preferences'
import { useDispatch, useSelector } from 'react-redux'
import Publication from '@/types/publication'

export default function Publisher({
  publishers
}: {
  publishers: Publication[]
}) {
  const { pubs } = useSelector(getPref)
  const dispatch = useDispatch()
  console.log(pubs)

  return (
    <Card>
      <Heading size="md" color="light.bg" mb={1}>
        Publishers (A-Z)
      </Heading>
      <CheckboxGroup
        colorScheme="twitter"
        defaultValue={pubs.map((p) => JSON.stringify(p))}
        onChange={(val) =>
          dispatch(setPubs([...val.map((v) => JSON.parse(v.toString()))]))
        }>
        <Stack direction="column" alignSelf="start">
          {publishers.map((p) => {
            return (
              <Checkbox key={p._id} value={JSON.stringify(p)}>
                {p.name}
              </Checkbox>
            )
          })}
        </Stack>
      </CheckboxGroup>
    </Card>
  )
}
