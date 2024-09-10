import { strapiClient } from '@/utils/axios/strapi.client'
import type {
  Article,
  ArticleAsIdRef,
  ArticleAsSlugRef,
  ArticleAsThumbnail,
  StrapiResponseArticles,
  StrapiResponseDepartments,
  StrapiResponseFaq
} from '@/types/strapi.types'
import type { AxiosResponse } from 'axios'

export async function getHealthCheck(): Promise<any> {
  const response = await strapiClient.get('/health')
  return response.data
}

export async function listAllDepartments(): Promise<StrapiResponseDepartments> {
  const response = await strapiClient.get('/api/departments', {
    params: {
      sort: 'id:asc',
      'pagination[limit]': 2,
      'populate[0]': 'trainings',
      'populate[1]': 'trainings.location',
      'populate[2]': 'coverImage'
    }
  })
  return response.data
}

export async function listAllRecentArticles(): Promise<ArticleAsIdRef[]> {
  const response: AxiosResponse<{
    data: {
      id: number
    }[]
  }> = await strapiClient.get('/api/articles', {
    params: {
      sort: 'date:desc',
      'fields[0]': 'id',
      'fields[1]': 'date',
      'pagination[limit]': 8
    }
  })
  return response.data.data.map((article) => article)
}
export async function listAllRecentArticlesSlugs(): Promise<ArticleAsSlugRef[]> {
  const response: AxiosResponse<StrapiResponseArticles> = await strapiClient.get(
    '/api/articles?fields[0]=slug',
    {
      params: {
        _sort: 'date:desc'
      }
    }
  )
  return response.data.data.map((article) => article.attributes)
}

export async function listAllArticles(): Promise<
  { id: number; attributes: ArticleAsSlugRef | ArticleAsThumbnail }[]
> {
  const response: AxiosResponse<StrapiResponseArticles> = await strapiClient.get('/api/articles', {
    params: {
      'fields[0]': 'slug',
      'fields[1]': 'title',
      'fields[2]': 'description',
      'fields[3]': 'category',
      'fields[4]': 'date',
      'fields[5]': 'content',
      'populate[thumbnail]': 'thumbnail',
      sort: 'date:desc'
    }
  })

  return response.data.data
}

export async function getArticleThumbnailById(id: number): Promise<ArticleAsThumbnail> {
  const response = await strapiClient.get(`/api/articles/${id}`, {
    params: {
      'fields[0]': 'slug',
      'fields[1]': 'title',
      'fields[2]': 'description',
      'fields[3]': 'category',
      'fields[4]': 'date',
      'fields[5]': 'content',
      'populate[thumbnail]': 'thumbnail'
    }
  })
  return response.data.data.attributes as ArticleAsThumbnail
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const response = await strapiClient.get(`/api/articles?filters[slug][$eq]=${slug}`, {
    params: {
      'fields[0]': 'slug',
      'fields[1]': 'title',
      'fields[2]': 'description',
      'fields[3]': 'category',
      'fields[4]': 'date',
      'fields[5]': 'content',
      'populate[thumbnail]': 'thumbnail',
      'populate[images]': 'images'
    }
  })
  return response.data.data[0].attributes as Article
}

export async function getFaqItems(): Promise<StrapiResponseFaq[]> {
  const response: AxiosResponse<any> = await strapiClient.get('/api/faqs?sort=id:asc')
  return response.data.data as StrapiResponseFaq[]
}
