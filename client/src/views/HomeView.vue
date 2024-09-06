<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted} from 'vue';
import { ref } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const text = ref('');
    const texts = ['based in Rostock', 'for Humans'];
    let fullText = texts[0];
    let index = 0;
    let charIndex = 0;
    let intervalId: number;

    const eraseText = () => {
      if (charIndex > 0) {
        text.value = text.value.slice(0, -1);
        charIndex--;
      } else {
        clearInterval(intervalId);
        index = (index + 1) % texts.length;
        fullText = texts[index];
        setTimeout(() => {
          intervalId = window.setInterval(typeText, 200);
        }, 500);
      }
    };

    const typeText = () => {
      if (charIndex < fullText.length) {
        text.value += fullText[charIndex];
        charIndex++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          intervalId = window.setInterval(eraseText, 100);
        }, 2000);
      }
    };

    onMounted(() => {
      intervalId = window.setInterval(typeText, 200);
    });

    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });

    return {
      text,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollIndicator = document.getElementById('scrollIndicator');
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollWidth = (scrollTop / scrollHeight) * 100;
      if (scrollIndicator) {
        scrollIndicator.style.width = scrollWidth + '%';
      }
    },
  },
});

</script>

<template>
  <div class="content font-sans bg-white">
    <div id="scrollIndicator" class="fixed top-0 left-0 w-0 h-1 bg-secondary z-50"></div>
    <section class="hero h-screen flex flex-col bg-cover bg-center relative">
      <img src="@/assets/hero.webp" alt="Hero Background" class="absolute inset-0 w-full h-full object-cover z-0">
      <div class="absolute text-left top-0 left-10 z-10">
        <h1 class="text-6xl lg:text-9xl font-bold text-paragraph mt-6">Jugger</h1>
        <h1 class="text-4xl lg:text-6xl font-bold text-paragraph mt-6">{{ text }}<span class="cursor">I</span></h1>
      </div>
    </section>
    <section id="about" class="py-20 bg-primary text-paragraph">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">About Us</h2>
        <p class="text-lg">
          Jugger Likedeeler is the vibrant community in Rostock, fostering the sport of Jugger with passion and enthusiasm.
        </p>
      </div>
    </section>
    <section id="events" class="py-20 bg-white text-paragraph">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Upcoming Events</h2>
        <!-- Event details will go here -->
      </div>
    </section>
    <section id="contact" class="py-20 bg-primary text-paragraph">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Contact Us</h2>
        <!-- Contact form or details go here -->
      </div>
    </section>
  </div>
</template>

<style>
.content {
  font-family: 'Lato', sans-serif;
  .hero {
    height: 75vh;
    .cursor {
      display: inline-block;
      width: 4px;
      color: transparent;
      background-color: #000000;
      animation: blink .7s infinite;
    }
  }
}

@keyframes blink {
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
