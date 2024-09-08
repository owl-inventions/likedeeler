<template>
  <div class="container mx-auto p-4">
    <div class="text-sm breadcrumbs mb-4">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">News</a></li>
        <li>{{ article?.title }}</li>
      </ul>
    </div>
    <div v-if="article">
      <div class="hero relative rounded-xl overflow-hidden">
        <img
          :src="article.thumbnail.data.attributes.formats.medium.url"
          :alt="article.thumbnail.data.attributes.formats.medium.hash"
          class="w-full h-64 object-cover"
        />
        <CardNewsBadge :text="article.category" />
      </div>
      <div class="article-details mt-4 text-left">
        <span class="text-gray-500">{{ article.date }}</span>
        <h2 class="text-3xl font-bold mt-2">{{ article.title }}</h2>
        <p class="mt-4">{{ article.description }}</p>
        <div class="text-neutral-content mt-4" v-html="article.content"></div>
        <div class="article-images mt-12">
          <BaseGallery :galleryID="'article-gallery'" :images="galleryImages" />
        </div>
      </div>
      <div class="related-articles mt-12 mb-12">
        <h3 class="text-2xl font-bold mb-4">Related News</h3>
        <div class="carousel w-full">
          <div
            class="carousel-item"
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
          >
            <CardNews :id="relatedArticle.id"> </CardNews>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import type { Article, ArticleAsIdRef, ArticleAsSlugRef } from '@/types/strapi.types'
import {
  getArticleBySlug,
  listAllRecentArticles,
  listAllRecentArticlesSlugs
} from '@/services/strapi.service'
import BaseGallery from '@/components/BaseGallery.vue'
import CardNews from '@/components/CardNews.vue'
import CardNewsBadge from '@/components/CardNewsBadge.vue'

interface GalleryImage {
  largeURL: string
  thumbnailURL: string
  width: number
  height: number
}

export default defineComponent({
  name: 'ArticleView',
  components: {
    CardNewsBadge,
    BaseGallery,
    CardNews
  },
  setup() {
    const route = useRoute()
    const article = ref<Article | null>(null)
    const galleryImages = ref<GalleryImage[]>([])
    const relatedArticles = ref<ArticleAsIdRef[]>([])

    onMounted(() => {
      const slug = route.params.slug as string
      getArticleBySlug(slug).then((data) => {
        if (data) {
          data.content = <string>marked(data.content)
          article.value = data
        }
        if (data && data.images && data.images.data) {
          galleryImages.value = data.images.data.map((image) => ({
            largeURL: image.attributes.formats.large.url,
            thumbnailURL: image.attributes.formats.small.url,
            width: image.attributes.formats.large.width,
            height: image.attributes.formats.large.height
          }))
        }
      })

      listAllRecentArticles().then((data) => {
        relatedArticles.value = data
      })
    })

    return {
      article,
      galleryImages,
      relatedArticles
    }
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 16rem;
}
</style>
