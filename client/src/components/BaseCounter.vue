<template>
  <div class="flex gap-5">
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': 15 }"></span>
      </span>
      days
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': 10 }"></span>
      </span>
      hours
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': 24 }"></span>
      </span>
      min
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': counter }"></span>
      </span>
      sec
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BaseCounter',
  setup() {
    const counter = ref(0)

    return {
      counter
    }
  }
})
</script>

<style scoped>
.countdown {
  /* Add any additional styles if needed */
}
</style>
