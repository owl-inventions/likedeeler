<template>
  <div class="container mx-auto py-20 p-20">
    <div class="text-sm breadcrumbs mb-4">
      <ul>
        <li><a href="/">Home</a></li>
        <li>
          <a href="/impressum">Impressum</a>
        </li>
      </ul>
    </div>
    <h1 class="text-3xl font-bold mb-8">Privacy</h1>
    <div v-html="impressumContent" class="prose"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoImprint',
  setup() {

    const impressumContent = `
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
        <p>Jan Warnecke-Hasselberg<br>
        Hermannstr. 28<br>
        18055 Rostock</p>
      </section>
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Kontakt</h2>
        <p>Telefon: +49 (0) 176 458 73213<br>
        E-Mail: <a href="mailto:hasselberg.jan@icloud.com" class="text-blue-500 underline">hasselberg.jan@icloud.com</a></p>
      </section>
      <section>
        <h2 class="text-2xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>Imke Warnecke<br>
        Hermannstr. 28<br>
        18055 Rostock</p>
      </section>
    `
    return {
      impressumContent
    }
  }
})
</script>

<style scoped>
</style>
