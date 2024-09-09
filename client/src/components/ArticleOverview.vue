<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { listAllArticles } from '@/services/strapi.service'
import type { ArticleAsSlugRef, ArticleAsThumbnail } from '@/types/strapi.types'
import CardNews from '@/components/CardNews.vue'

export default defineComponent({
  name: 'ArticleOverview',
  components: {
    CardNews
  },
  setup() {
    const articles = ref<{ id: number; attributes: ArticleAsSlugRef | ArticleAsThumbnail }[]>([])

    onMounted(() => {
      listAllArticles().then((data) => {
        articles.value = data
      })
    })

    return {
      articles
    }
  }
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">All Articles</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in articles" :key="article.id" class="card bg-base-100 shadow-xl">
        <CardNews :id="article.id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
