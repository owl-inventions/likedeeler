<template>
  <a
      :href="department.attributes.link"
      target="_blank"
      rel="noopener noreferrer"
      class="card card-compact w-full sm:w-72 lg:w-96 mb-4 bg-neutral hover:bg-accent duration-300 no-underline"
  >
    <figure><img :src="department.attributes.coverImage.data.attributes.formats.medium.url" :alt="department.attributes.title" class="w-full h-96 object-cover" /></figure>
    <div class="card-body rounded-b text-left">
      <p class="card-title">{{ department.attributes.title }}</p>
      <p class="text-neutral-content">{{ department.attributes.description }}</p>
      <ul class="mt-4">
        <li v-for="training in department.attributes.trainings" :key="training.id" class="mt-1">
          {{ training.dayOfTheWeek }}: {{ training.start }} - {{ training.end }} at
          <a :href="`https://www.google.com/maps?q=${training.location.latitude},${training.location.longitude}`" target="_blank" rel="noopener noreferrer">
            📍
          </a>
        </li>
      </ul>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type DepartmentData } from '@/types/strapi.types'

export default defineComponent({
  name: 'CardAbout',
  props: {
    department: {
      type: Object as PropType<DepartmentData>,
      required: true
    }
  }
})
</script>

<style scoped></style>
