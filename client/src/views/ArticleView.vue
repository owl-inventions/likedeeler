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
          class="w-full h-64 object-cover"
        />
        <span class="badge badge-secondary absolute top-2 right-2">{{ article.category }}</span>
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
      <div class="related-articles mt-12">
        <h3 class="text-2xl font-bold mb-4">Related News</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardNews
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.slug"
            :slug="relatedArticle.slug"
          />
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
import type { Article, ArticleAsSlugRef } from '@/types/strapi.types'
import { getArticleBySlug, listAllRecentArticlesSlugs } from '@/services/strapi.service'
import BaseGallery from '@/components/BaseGallery.vue'
import CardNews from '@/components/CardNews.vue'

interface GalleryImage {
  largeURL: string
  thumbnailURL: string
  width: number
  height: number
}

export default defineComponent({
  name: 'ArticleView',
  components: {
    BaseGallery,
    CardNews
  },
  setup() {
    const route = useRoute()
    const article = ref<Article | null>(null)
    const galleryImages = ref<GalleryImage[]>([])
    const relatedArticles = ref<ArticleAsSlugRef[]>([])

    onMounted(() => {
      const slug = route.params.slug as string
      getArticleBySlug(slug).then((data) => {
        article.value = data
        if (data && data.images && data.images.data) {
          galleryImages.value = data.images.data.map((image) => ({
            largeURL: image.attributes.formats.large.url,
            thumbnailURL: image.attributes.formats.small.url,
            width: image.attributes.formats.large.width,
            height: image.attributes.formats.large.height
          }))
        }
      })

      listAllRecentArticlesSlugs().then((data) => {
        relatedArticles.value = data.filter((relatedArticle) => relatedArticle.slug)
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
.badge-secondary {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
