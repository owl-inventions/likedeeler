<template>
  <router-view />
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'App',
  setup() {
    return {};
  },
});
</script>

<style>
body {
  font-family: 'Lato', sans-serif;
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Lato', sans-serif;
    cursor: default;
  }
}
</style>
