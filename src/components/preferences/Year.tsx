import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb
} from '@chakra-ui/react'
import { Heading, Text } from '@chakra-ui/react'
import Card from './Card'

import { getPref, setMaxYear, setMinYear } from '@/store/slices/preferences'
import { useSelector, useDispatch } from 'react-redux'
import { APP_MAX_YEAR, APP_MIN_YEAR } from '@/constants/preferences'

export default function Year() {
  const { minYear, maxYear } = useSelector(getPref)
  const dispatch = useDispatch()

  return (
    <Card>
      <Heading size="md" color="light.bg" mb={3}>
        Year of publication
      </Heading>
      <RangeSlider
        w={40}
        min={APP_MIN_YEAR}
        max={APP_MAX_YEAR}
        step={1}
        aria-label={['min-year', 'max-year']}
        onChange={(val) => {
          dispatch(setMinYear(val[0]))
          dispatch(setMaxYear(val[1]))
        }}
        defaultValue={[minYear, maxYear]}>
        <RangeSliderTrack bg="dark.bg">
          <RangeSliderFilledTrack bg="dark.button" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
      <Text fontSize="sm" fontWeight="semibold">
        {minYear}-{maxYear}
      </Text>
    </Card>
  )
}
