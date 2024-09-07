<!-- client/src/components/BaseGallery.vue -->
<template>
  <div :id="galleryID" class="carousel carousel-center w-full rounded-xl">
    <div v-for="(image, key) in imagesData" :key="key" class="carousel-item">
      <a :href="image.largeURL" :data-pswp-width="image.width" :data-pswp-height="image.height" target="_blank" rel="noreferrer">
        <img :src="image.thumbnailURL" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default {
  name: 'BaseGallery',
  props: {
    galleryID: String,
    images: Array,
  },
  setup(props) {
    return {
      imagesData: props.images,
    };
  },
  mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#' + this.$props.galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {},
};
</script>
