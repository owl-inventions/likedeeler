<!-- CardNewsSkeleton.vue -->
<template>
  <div class="card card-compact w-72 bg-neutral relative rounded-xl">
    <div class="skeleton-image bg-base-100"></div>
    <div class="card-body rounded-b text-left">
      <div class="skeleton-text skeleton-title bg-base-100"></div>
      <div class="skeleton-text skeleton-date bg-base-100"></div>
      <div class="skeleton-text skeleton-description bg-base-100"></div>
      <div class="skeleton-text skeleton-content bg-base-100"></div>
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
}
.skeleton-text {
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
  height: 10em;
}
</style>
