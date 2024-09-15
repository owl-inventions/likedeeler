<template>
  <div :id="galleryID" class="carousel carousel-center w-full rounded-xl">
    <div v-for="(image, key) in images" :key="key" class="carousel-item">
        <a
          :key="image.largeURL"
          :href="image.largeURL"
          :data-pswp-width="image.width"
          :data-pswp-height="image.height"
        >
          <img :src="image.thumbnailURL" :alt="image.largeURL" />
        </a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, type PropType, ref, watch} from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

type GalleryImage = {
  largeURL: string
  thumbnailURL: string
  width: number
  height: number
}

export default defineComponent({
  name: 'BaseGallery',
  props: {
    galleryID: {
      type: String,
      required: true
    },
    images: {
      type: Array as PropType<GalleryImage[]>,
      required: true
    }
  },
  setup(props) {
    const lightbox = ref<PhotoSwipeLightbox | null>(null)

    const initLightbox = () => {
      if (lightbox.value) {
        lightbox.value.destroy()
      }
      lightbox.value = new PhotoSwipeLightbox({
        gallery: '#' + props.galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe')
      })
      lightbox.value.init()
    }

    watch(() => props.images, () => {
      initLightbox()
    })

    onMounted(() => {
      initLightbox()
    })

    onUnmounted(() => {
      if (lightbox.value) {
        lightbox.value.destroy()
        lightbox.value = null
      }
    })

    return {}
  }
})
</script>
