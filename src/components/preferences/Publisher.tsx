import { Checkbox, CheckboxGroup, Skeleton } from '@chakra-ui/react'
import { Heading, Stack } from '@chakra-ui/react'
import Card from './Card'

import { getPref, setPubs } from '@/store/slices/preferences'
import { useDispatch, useSelector } from 'react-redux'

export default function Publisher() {
  const { pubs } = useSelector(getPref)
  const dispatch = useDispatch()

  return (
    <Card>
      <Heading size="md" color="light.bg" mb={1}>
        Publishers (A-Z)
      </Heading>
      <CheckboxGroup
        colorScheme="twitter"
        defaultValue={['naruto', 'kakashi']}
        onChange={(val) => dispatch(setPubs([...val]))}>
        <Stack direction="column" alignSelf="start">
          {[].map((p) => (
            <Checkbox
              key={p.name}
              value={p.name}
              isChecked={JSON.stringify(pubs).includes(p.name)}>
              {p.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Card>
  )
}
