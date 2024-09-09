<template>
  <div class="container mx-auto p-4">
    <router-view :slug="slug" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ArticleView',
  setup() {
    const route = useRoute()
    const slug = route.params.slug as string
    const articleTitle = ref<string>('')

    onMounted(() => {
      // Fetch the article title or any other necessary data if needed
    })

    return {
      slug,
      articleTitle
    }
  }
})
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1rem;
}
</style>
