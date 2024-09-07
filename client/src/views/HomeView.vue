<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { ref } from 'vue'
import CardAbout from '@/components/CardAbout.vue'
import { listAllRecentArticlesSlugs } from '@/services/strapi.service'
import CardNews from '@/components/CardNews.vue'
import { type ArticleAsSlugRef } from '@/types/strapi.types'

export default defineComponent({
  name: 'HomeView',
  components: { CardNews, CardAbout },
  setup() {
    const text = ref('')
    const texts = ['based in Rostock', 'for Humans']
    let fullText = texts[0]
    let index = 0
    let charIndex = 0
    let intervalId: number

    const articles = ref<ArticleAsSlugRef[]>([])

    listAllRecentArticlesSlugs().then((data) => {
      articles.value = data
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
      articles
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
      <div class="absolute text-left top-0 left-10 z-10 text-secondary">
        <h1 class="text-6xl lg:text-9xl font-bold text-paragraph mt-6">Jugger</h1>
        <h1 class="text-4xl lg:text-6xl font-bold text-paragraph mt-6">
          {{ text }}<span class="cursor">I</span>
        </h1>
      </div>
    </section>
    <section id="news" class="py-20">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Latest News</h2>
        <div class="carousel rounded-box">
          <div class="carousel-item" v-for="article in articles" :key="article.slug">
            <CardNews :slug="article.slug"> </CardNews>
          </div>
        </div>
      </div>
    </section>
    <section id="about" class="py-20 bg-base-300">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">About Us</h2>
        <p class="text-lg">
          Jugger Likedeeler is the vibrant community in Rostock, fostering the sport of Jugger with
          passion and enthusiasm.
        </p>
        <div class="flex flex-wrap justify-center space-x-0 sm:space-x-4 mt-8">
          <CardAbout
            imageSrc="/img/join-us.webp"
            imageAlt="Join Us"
            title="HSG Uni Rostock e.V."
            description="Become a part of our vibrant community. We welcome everyone who shares our passion for Jugger. Whether you are a beginner or an experienced player, you will find a place here."
            buttonText="@HSG"
            button-link="//hsgunirostock.de/trainingszeiten/#Jugger"
          />
          <CardAbout
            imageSrc="/img/join-us-uni.webp"
            imageAlt="Join Us"
            title="University Rostock"
            description="Our university Jugger program offers students a unique opportunity to engage in this exciting sport. Join us for regular training sessions, tournaments, and social events."
            buttonText="@University"
            button-link="//hochschulsport.uni-rostock.de/cgi/webpage.cgi?kursinfo=F1AAADD354"
          />
        </div>
      </div>
    </section>
    <section id="events" class="py-20">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Upcoming Events</h2>
        <!-- Event details will go here -->
      </div>
    </section>
    <section id="contact" class="py-20 bg-base-300">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Contact Us</h2>
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
  font-family: 'Lato', sans-serif;
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
