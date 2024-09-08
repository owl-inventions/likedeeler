import { strapiClient } from '@/utils/axios/strapi.client'
import type {
  Article, ArticleAsIdRef,
  ArticleAsSlugRef,
  ArticleAsThumbnail,
  FaqItem,
  StrapiResponseArticles,
  StrapiResponseFaq
} from '@/types/strapi.types'
import type { AxiosResponse } from 'axios'

export async function listAllRecentArticles(): Promise<ArticleAsIdRef[]> {
  const response: AxiosResponse<{
    data: {
      id: number
    }[]
  }> = await strapiClient.get(
      '/api/articles?fields[0]=id',
      {
        params: {
          _sort: 'date:desc',
        }
      }
  )
  return response.data.data.map((article) => article)
}

export async function listAllRecentArticlesSlugs(): Promise<ArticleAsSlugRef[]> {
  const response: AxiosResponse<StrapiResponseArticles> = await strapiClient.get(
    '/api/articles?fields[0]=slug',
    {
      params: {
        _sort: 'date:desc',
      }
    }
  )
  return response.data.data.map((article) => article.attributes)
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

export async function getArticleThumbnailBySlug(slug: string): Promise<ArticleAsThumbnail> {
  const response = await strapiClient.get(`/api/articles?filters[slug][$eq]=${slug}`, {
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
  return response.data.data[0].attributes as ArticleAsThumbnail
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
  const response: AxiosResponse<any> = await strapiClient.get('/api/faqs',{
    params: {
      '_sort': 'id:asc'
    }
  })
  return response.data.data as StrapiResponseFaq[]
}
