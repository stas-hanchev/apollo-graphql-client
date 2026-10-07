export type Sort = 'asc' | 'desc'

export interface LinkOrderByInput {
  description?: Sort
  url?: Sort
  createdAt?: Sort
}

export interface User {
  id: string
  name: string
}

export interface Link {
  id: string
  createdAt: string
  description: string
  url: string
  postedBy: User | null
}

export interface FeedData {
  feed: {
    count: number
    links: Link[]
  }
}

export interface FeedVars {
  filter?: string
  skip?: number
  take?: number
  orderBy?: LinkOrderByInput
}
