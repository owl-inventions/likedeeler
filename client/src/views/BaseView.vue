<template>
  <div class="container mx-auto p-4">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseView',
})
</script>

<style scoped>
</style>
