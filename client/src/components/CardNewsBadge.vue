<template>
  <span :class="['badge', 'text-white', badgeColor, additionalClasses]">{{ text }}</span>
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
          return 'bg-red-500'
        case 'Announcement':
          return 'bg-orange-500'
        case 'Training':
          return 'bg-blue-500'
        case 'Social':
          return 'bg-green-200'
        default:
          return 'bg-neutral'
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
