import User from './user'

export default interface Profile {
  user?: User
  topics: string[]
}
