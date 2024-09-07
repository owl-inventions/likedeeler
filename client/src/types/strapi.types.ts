export type ArticleAsSlugRef = {
  slug: string
}

export type Image = {
  url: string
  width: number
  height: number
  hash: string
  nane: string
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
