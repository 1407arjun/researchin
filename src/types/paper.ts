import Publication from './publication'

type Paper = {
  title: string
  authors: string[]
  date: string
  conf: string
  url: string
  pub: Publication
  topics: string[]
  abstract?: string
}

export default Paper
