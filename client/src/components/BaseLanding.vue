<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { ref } from 'vue'
import CardAbout from '@/components/CardAbout.vue'
import { getFaqItems, listAllDepartments, listAllRecentArticles } from '@/services/strapi.service'
import CardNews from '@/components/CardNews.vue'
import {
  type StrapiResponseFaq,
  type ArticleAsIdRef,
  type DepartmentData
} from '@/types/strapi.types'

export default defineComponent({
  name: 'BaseLanding',
  components: { CardNews, CardAbout },
  setup() {
    const text = ref('')
    const texts = ['based in Rostock', 'for everyone', 'with passion']
    let fullText = texts[0]
    let index = 0
    let charIndex = 0
    let intervalId: number

    const articles = ref<ArticleAsIdRef[]>([])
    const faqItems = ref<StrapiResponseFaq[]>([])
    const departments = ref<DepartmentData[]>([])

    listAllDepartments().then((data) => {
      departments.value = data.data
    })

    listAllRecentArticles().then((data) => {
      articles.value = data
    })

    getFaqItems().then((data) => {
      faqItems.value = data
    })

    const eraseText = () => {
      if (charIndex > 0) {
        text.value = text.value.slice(0, -1)
        charIndex--
      } else {
        clearInterval(intervalId)
        index = (index + 1) % texts.length
        fullText = texts[index]
        setTimeout(() => {
          intervalId = window.setInterval(typeText, 200)
        }, 500)
      }
    }

    const typeText = () => {
      if (charIndex < fullText.length) {
        text.value += fullText[charIndex]
        charIndex++
      } else {
        clearInterval(intervalId)
        setTimeout(() => {
          intervalId = window.setInterval(eraseText, 100)
        }, 2000)
      }
    }

    onMounted(() => {
      intervalId = window.setInterval(typeText, 200)
    })

    onBeforeUnmount(() => {
      clearInterval(intervalId)
    })

    return {
      text,
      articles,
      faqItems,
      departments
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollIndicator = document.getElementById('scrollIndicator')
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollWidth = (scrollTop / scrollHeight) * 100
      if (scrollIndicator) {
        scrollIndicator.style.width = scrollWidth + '%'
      }
    }
  }
})
</script>

<template>
  <div class="content font-sans">
    <div id="scrollIndicator" class="fixed top-0 left-0 w-0 h-1 bg-primary z-50"></div>
    <section class="hero h-screen flex flex-col bg-cover bg-center relative">
      <img
        src="/img/hero.webp"
        alt="Hero Background"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="absolute text-left top-0 left-10 z-10 text-neutral">
        <h1 class="text-6xl lg:text-9xl font-bold text-paragraph mt-6">Jugger</h1>
        <h1 class="text-4xl lg:text-6xl font-bold text-paragraph mt-6">
          {{ text }}<span class="cursor">I</span>
        </h1>
      </div>
    </section>
    <section id="about" class="py-12 md:px-10 sm:px-2">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 italic">Who We Are</h2>
        <p class="text-lg">
          Likedeeler is a vibrant and well-established community in Rostock, passionately promoting
          the sport of Jugger. We are a diverse group of players, ranging from beginners to seasoned
          professionals. You can find us at the University of Rostock and HSG Uni Rostock e.V.
        </p>
        <div class="flex flex-wrap justify-center space-x-0 md:space-x-12 mt-8">
          <CardAbout
            v-for="department in departments"
            :key="department.id"
            :department="department"
          />
        </div>
      </div>
    </section>
    <section id="news" class="py-20 px-5 md:px-10 bg-base-300">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 italic">Latest News</h2>
        <div class="carousel w-full rounded-box">
          <div class="carousel-item" v-for="article in articles">
            <CardNews :id="article.id" />
          </div>
        </div>
      </div>
    </section>
    <!-- New About Jugger section -->
    <section id="about-jugger" class="py-20 px-5 md:px-10 sm:px-2">
      <div class="container mx-auto text-center p-2">
        <h2 class="text-3xl font-bold mb-8 italic">FAQ</h2>
        <p class="mb-12">
          Hey there! If you’re new to Jugger or curious about joining the Likedeeler team in
          Rostock, we’re here to help. Below are some common questions we get from newcomers—if you
          have more, just ask!
        </p>
        <div
          class="collapse collapse-arrow bg-base-200 rounded-box p-4 mb-4"
          v-for="(faq, index) in faqItems"
          :key="faq.id"
          aria-labelledby="faq"
        >
          <input type="radio" name="faq" :checked="index === 0" />
          <div class="collapse-title text-xl font-bold">
            {{ faq.attributes.question }}
          </div>
          <div class="collapse-content text-neutral-content">
            {{ faq.attributes.answer }}
          </div>
        </div>
      </div>
    </section>
    <section id="events" class="py-20 bg-base-300 px-5 md:px-10 sm:px-2">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 italic">Upcoming Events</h2>
        <p class="text-lg">
          Stay up to date with our latest events, tournaments, and training sessions. Follow us on
          Instagram for the most recent updates.
        </p>
      </div>
    </section>
    <section id="contact" class="py-20 px-2 md:px-10">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 italic">Contact Us</h2>
        <!-- Contact form or details go here -->
        <a
          href="https://www.instagram.com/likedeeler_rostock/"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          Follow us on Instagram
        </a>
      </div>
    </section>
  </div>
</template>

<style>
.content {
  .hero {
    height: 50vh;
    .cursor {
      display: inline-block;
      width: 4px;
      color: transparent;
      background-color: #000000;
      animation: blink 0.7s infinite;
    }
  }
}

@keyframes blink {
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
