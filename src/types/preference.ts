import Publication from './publication'
import User from './user'

type Preference = {
  user?: User
  topics: string[]
  min_year: number
  max_year: number
  pub: Publication[]
}

export default Preference