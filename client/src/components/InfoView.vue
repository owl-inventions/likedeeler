`
<template>
  <div class="container mx-auto py-20">
    <div class="text-sm breadcrumbs mb-4">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/title">{{ title }}</a></li>
      </ul>
    </div>
    <h1 class="text-3xl font-bold mb-8">{{ title }}</h1>
    <div v-html="content" class="prose"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoView',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.prose {
  max-width: 100%;
}
</style>
`
