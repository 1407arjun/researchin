import { Checkbox, CheckboxGroup, Skeleton } from '@chakra-ui/react'
import { VStack, Heading, Stack } from '@chakra-ui/react'

import { getPref, setPubs } from '@/store/slices/preferences'
import { useDispatch, useSelector } from 'react-redux'

import { useQuery } from '@tanstack/react-query'

export default function Publisher() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await fetch('/api/publishers')
      console.log(res)
      return res.json()
    }
  })

  const { pubs } = useSelector(getPref)
  const dispatch = useDispatch()

  if (isLoading)
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    )

  if (isError) return <p>{error}</p>

  return (
    <VStack
      bg="light.card"
      shadow="lg"
      color="light.cardtext"
      py={4}
      px={6}
      rounded="md">
      <Heading size="md" color="light.bg" mb={1}>
        Publishers (A-Z)
      </Heading>
      <CheckboxGroup
        colorScheme="twitter"
        defaultValue={['naruto', 'kakashi']}
        onChange={(val) => dispatch(setPubs([...val]))}>
        <Stack direction="column" alignSelf="start">
          {data.map((p) => (
            <Checkbox
              key={p.name}
              value={p.name}
              isChecked={JSON.stringify(pubs).includes(p.name)}>
              {p.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </VStack>
  )
}
