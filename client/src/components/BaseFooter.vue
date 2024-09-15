<template>
  <footer class="footer p-10 text-neutral-content bg-base-300 flex-grow">
    <div>
      <span class="footer-title">Links</span>
      <RouterLink to="/impressum" class="link link-hover">Impressum</RouterLink>
      <RouterLink to="/privacy" class="link link-hover">Privacy Policy</RouterLink>
      <a href="https://status.jnhssg.de/status/likedeeler" class="link link-hover">System Status</a>
    </div>
    <div class="divider"></div>
    <div class="mt-4">
      <a href="https://github.com/owl-inventions/likedeeler" class="link link-hover">🧑🏼‍💻 GitHub</a>
      <p>Made with <span style="color: #e25555">&#9829;</span> in Rostock.</p>
      <p class="text-gray-500">{{ VERSION }}</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { VERSION } from '@/configurations/general.conf'

export default defineComponent({
  name: 'BaseFooter',
  components: {
    RouterLink
  },
  setup() {
    return {
      VERSION
    }
  }
})
</script>

<style scoped>
/* Add any styles if necessary */
</style>
