import Publication from './publication'
import User from './user'

type Preference = {
  user?: User
  topics: string[]
  minYear: number
  maxYear: number
  pubs: Publication[]
}

export default Preference
