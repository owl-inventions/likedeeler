<template>
  <BaseNavbar />
  <router-view />
  <BaseFooter />
</template>

<script>
import { defineComponent } from 'vue'

import { VERSION } from '@/configurations/general.conf'
import BaseNavbar from '@/components/BaseNavbar.vue'
import BaseFooter from '@/components/BaseFooter.vue'

export default defineComponent({
  name: 'App',
  components: { BaseFooter, BaseNavbar },
  setup() {
    return {
      VERSION
    }
  }
})
</script>

<style></style>
