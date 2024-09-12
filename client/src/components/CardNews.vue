<template>
  <div v-if="loading" class="relative">
    <CardNewsSkeleton />
    <div class="progress-indicator"></div>
  </div>
  <a
    v-else
    :href="`/articles/${article?.slug}`"
    class="card card-compact w-72 bg-neutral hover:bg-accent relative rounded-xl no-underline hover:shadow-2xl duration-300"
  >
    <CardNewsBadge :text="article?.category" additionalClasses="badge-outline" />
    <figure class="image-wrapper">
      <img
        :src="article?.thumbnail.data.attributes.formats.small.url"
        class="image-content"
        :alt="article?.thumbnail.data.attributes.formats.small.hash"
      />
    </figure>
    <div class="card-body rounded-b text-left">
      <span class="text-gray-500">{{ article?.date }}</span>
      <h2 class="card-title">{{ article?.title }}</h2>
      <p>{{ article?.description }}</p>
      <p class="text-neutral-content" v-html="article?.content"></p>
    </div>
    <div v-if="isNew" class="new-indicator bg-primary text-primary-content">New</div>
  </a>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { marked } from 'marked'
import CardNewsBadge from '@/components/CardNewsBadge.vue'
import CardNewsSkeleton from '@/components/CardNewsSkeleton.vue'
import type { ArticleAsThumbnail } from '@/types/strapi.types'
import { getArticleThumbnailById } from '@/services/strapi.service'
import { format, differenceInWeeks } from 'date-fns'
import { de } from 'date-fns/locale'

export default defineComponent({
  name: 'CardNews',
  components: {
    CardNewsBadge,
    CardNewsSkeleton
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const article = ref<ArticleAsThumbnail>()
    const loading = ref(true)

    getArticleThumbnailById(props.id).then((data) => {
      data.content = <string>marked(data.content.substring(0, 100) + '...')
      data.date = format(new Date(data.date), 'dd.MM.yyyy', { locale: de })
      article.value = data
      loading.value = false
    })

    const isNew = computed(() => {
      if (article.value) {
        const articleDate = new Date(article.value.date)
        return differenceInWeeks(new Date(), articleDate) < 4
      }
      return false
    })

    return {
      article,
      loading,
      isNew
    }
  }
})
</script>

<style scoped>
.image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.image-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.progress-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #007bff;
  animation: progress 2s infinite;
}

@keyframes progress {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.new-indicator {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.25rem 0.5rem;
  border-radius: 0 0.5rem 0 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
}
</style>
