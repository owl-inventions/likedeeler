<template>
  <BaseNavbar />
  <router-view />
  <footer class="footer p-10 text-neutral-content bg-base-300">
    <div>
      <span class="footer-title">Links</span>
      <a href="/impressum" class="link link-hover">Impressum</a>
      <a href="/privacy" class="link link-hover">Privacy Policy</a>
      <a href="https://status.jnhssg.de/status/likedeeler" class="link link-hover">System Status</a>
    </div>
    <div class="divider"></div>
    <div class="mt-4">
      <p>Made with <span style="color: #e25555">&#9829;</span> in Rostock.</p>
      <p class="text-gray-500">{{ VERSION }}</p>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue'

import { VERSION } from '@/configurations/general.conf'
import BaseNavbar from "@/components/BaseNavbar.vue";

export default defineComponent({
  name: 'App',
  components: {BaseNavbar},
  setup() {
    return {
      VERSION
    }
  }
})
</script>

<style></style>
