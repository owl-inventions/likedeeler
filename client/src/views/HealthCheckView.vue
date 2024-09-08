<template>
  <div>
    <h1>Health Check</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <p v-else>Health Status: {{ healthStatus }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getHealthCheck } from '@/services/strapi.service'

export default defineComponent({
  name: 'HealthCheckView',
  setup() {
    const healthStatus = ref<string | null>(null)
    const loading = ref(true)
    const error = ref<string | null>(null)

    const fetchHealthStatus = async () => {
      try {
        healthStatus.value = await getHealthCheck()
      } catch (err: unknown) {
        if (err instanceof Error) {
          error.value = err.message
        } else {
          error.value = String(err)
        }
      } finally {
        loading.value = false
      }
    }

    fetchHealthStatus()

    return {
      healthStatus,
      loading,
      error
    }
  }
})
</script>

<style scoped>
/* Add any styles if necessary */
</style>
