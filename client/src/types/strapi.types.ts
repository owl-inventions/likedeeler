export type ArticleAsSlugRef = {
  slug: string
}

export type ArticleAsIdRef = {
  id: number
}

export type Image = {
  url: string
  width: number
  height: number
  hash: string
  nane: string
}

export type Training = {
  id: number
  start: string
  end: string
  dayOfTheWeek: string
  location: {
    id: number
    latitude: number
    longitude: number
  }
}

export type DepartmentAttributes = {
  title: string
  description: string
  link: string
  coverImage: {
    data: StrapiImage
  }
  trainings: Training[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type DepartmentData = {
  id: number
  attributes: DepartmentAttributes
}

export type StrapiResponseDepartments = {
  data: DepartmentData[]
  meta: {
    pagination: {
      start: number
      limit: number
      total: number
    }
  }
}

export type StrapiImage = {
  id: number
  attributes: {
    formats: {
      small: Image
      medium: Image
      large: Image
      thumbnail: Image
    }
  }
}

export type ArticleAsThumbnail = ArticleAsSlugRef & {
  title: string
  description: string
  category: string
  date: string
  content: string
  thumbnail: {
    data: StrapiImage
  }
}

export type Article = ArticleAsThumbnail & {
  images: {
    data: StrapiImage[]
  }
}

export type FaqItem = {
  question: string
  answer: string
}

export type StrapiResponseArticles = {
  data: {
    attributes: ArticleAsSlugRef | ArticleAsThumbnail
    id: number
  }[]
}

export type StrapiResponseFaq = {
  id: number
  attributes: FaqItem
}
