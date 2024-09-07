<template>
  <span :class="['badge', badgeColor, 'text-white', additionalClasses]">{{ text }}</span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CardNewsBadge',
  props: {
    text: {
      type: String,
      required: true,
      default: ''
    },
    additionalClasses: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const badgeColor = computed(() => {
      switch (props.text) {
        case 'Tournament':
          return 'badge-error'
        case 'Announcement':
          return 'badge-success'
        case 'Training':
          return 'badge-info'
        case 'Social':
          return 'badge-accent'
        default:
          return 'badge-neutral'
      }
    })

    return {
      badgeColor
    }
  }
})
</script>

<style scoped>
.badge {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
</style>
