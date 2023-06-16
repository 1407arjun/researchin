import Publication from './publication'
import User from './user'

export default interface Preference {
  user: User
  topics: string[]
  min_year: number
  max_year: number
  pub: Publication[]
}
