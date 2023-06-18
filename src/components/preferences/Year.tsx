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

export default function Year({ min, max }: { min: number; max: number }) {
  const { minYear, maxYear } = useSelector(getPref)
  const dispatch = useDispatch()

  return (
    <Card>
      <Heading size="md" color="light.bg" mb={1}>
        Year of publication
      </Heading>
      <Text fontSize="md" fontWeight="semibold">
        {minYear}-{maxYear}
      </Text>
      <RangeSlider
        w="full"
        min={APP_MIN_YEAR}
        max={APP_MAX_YEAR}
        step={1}
        aria-label={['min-year', 'max-year']}
        onChange={(val) => {
          dispatch(setMinYear(val[0]))
          dispatch(setMaxYear(val[1]))
        }}
        defaultValue={[min, max]}>
        <RangeSliderTrack bg="dark.bg">
          <RangeSliderFilledTrack bg="dark.button" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
    </Card>
  )
}
