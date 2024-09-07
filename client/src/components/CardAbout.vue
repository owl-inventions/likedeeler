<template>
  <a
    :href="buttonLink"
    target="_blank"
    rel="noopener noreferrer"
    class="card card-compact w-full sm:w-72 lg:w-96 mb-4 bg-neutral hover:bg-accent duration-300 no-underline"
  >
    <figure><img :src="imageSrc" :alt="imageAlt" class="w-full h-96 object-cover" /></figure>
    <div class="card-body rounded-b text-left">
      <p class="card-title">{{ title }}</p>
      <p class="text-neutral-content">{{ description }}</p>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardAbout',
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    buttonLink: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped></style>
