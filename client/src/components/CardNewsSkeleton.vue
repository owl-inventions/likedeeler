<!-- CardNewsSkeleton.vue -->
<template>
  <div class="card card-compact w-72 bg-neutral relative rounded-xl">
    <div class="skeleton-image"></div>
    <div class="card-body rounded-b text-left">
      <div class="skeleton-text skeleton-title"></div>
      <div class="skeleton-text skeleton-date"></div>
      <div class="skeleton-text skeleton-description"></div>
      <div class="skeleton-text skeleton-content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardNewsSkeleton'
})
</script>

<style scoped>
.skeleton-image {
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background-color: #e0e0e0;
}
.skeleton-text {
  background-color: #e0e0e0;
  height: 1em;
  margin: 0.5em 0;
}
.skeleton-title {
  width: 70%;
}
.skeleton-date {
  width: 30%;
}
.skeleton-description {
  width: 90%;
}
.skeleton-content {
  width: 100%;
  height: 5em;
}
</style>
