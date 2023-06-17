import Publication from './publication'

type Preference = {
  userId?: string
  topics: string[]
  minYear: number
  maxYear: number
  pubs: Publication[]
}

export default Preference
