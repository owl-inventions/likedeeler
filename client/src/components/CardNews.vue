<template>
  <router-link
    :to="`/articles/${slug}`"
    class="card card-compact w-72 bg-neutral hover:bg-accent relative rounded-xl no-underline hover:shadow-2xl duration-300"
  >
    <span class="absolute top-2 right-2 badge badge-secondary">{{ article?.category }}</span>
    <figure>
      <img :src="article?.thumbnail.data.attributes.formats.medium.url" class="rounded-t-xl" />
    </figure>
    <div class="card-body rounded-b text-left">
      <span class="text-gray-500">{{ article?.date }}</span>
      <h2 class="card-title">{{ article?.title }}</h2>
      <p>{{ article?.description }}</p>
      <p class="text-neutral-content">{{ article?.content }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { ArticleAsThumbnail } from '@/types/strapi.types'
import { getArticleThumbnailBySlug } from '@/services/strapi.service'

export default defineComponent({
  name: 'CardNews',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const article = ref<ArticleAsThumbnail>()

    getArticleThumbnailBySlug(props.slug).then((data) => {
      data.content = data.content.substring(0, 100) + '...'
      article.value = data
    })

    return {
      article
    }
  }
})
</script>

<style scoped>
.badge-secondary {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
