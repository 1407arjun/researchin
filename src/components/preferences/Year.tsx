import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb
} from '@chakra-ui/react'
import { VStack, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function Year() {
  const year = new Date().getFullYear()
  const [min, setMin] = useState(year - 2)
  const [max, setMax] = useState(year)
  return (
    <VStack
      bg="light.card"
      shadow="lg"
      color="light.cardtext"
      py={4}
      px={6}
      rounded="md">
      <Heading size="md" color="light.bg" mb={3}>
        Year of publication
      </Heading>
      <RangeSlider
        w={40}
        min={year - 10}
        max={year}
        step={1}
        aria-label={['min_year', 'max_year']}
        onChange={(val) => {
          setMin(val[0])
          setMax(val[1])
        }}
        defaultValue={[year - 2, year]}>
        <RangeSliderTrack bg="dark.bg">
          <RangeSliderFilledTrack bg="dark.button" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
      <Text fontSize="sm" fontWeight="semibold">
        {min}-{max}
      </Text>
    </VStack>
  )
}
