<script >
import api from "~/API/api.js";

export default {
  props: {
    lang: {
      type: String,
      required: true
    }
  },
  watch: {
    // Watch for changes in the `lang` prop and re-fetch data
    lang: {
      immediate: true, // Fetch data immediately when the component is created
      handler() {
        this.getHeaders();
      }
    }
  },
  data(){
    return {
    header:{
      id:1,
      title:null,
      description:null,
      imageUrl:null,
      accounts:[]
    }
    }
  },

  methods:{
    getHeaders() {
      api.get(`/api/${this.lang}/header`).then(headers => {
        const header = headers.data.find(header => header.type === 'header');
        if (header) {
          this.header.title = header.title;
          this.header.description = header.description;
          this.header.imageUrl = header.imageUrl;
        }
      });
    },
    getSocials() {
      api.get('/api/socials').then(response => {
        this.header.accounts = response.data;
      });
    },
    //  getCsrfToken() {
    //   api.get('/sanctum/csrf-cookie').then(response =>{
    //     console.log('response',response)
    //    });
    // },
  },
  mounted() {
    this.getHeaders()
    this.getSocials()
  }
}

</script>

<template>
  <section class="text-gray-600 body-font ">
<!--    <p v-if="header.imageUrl">{{`${baseUrl}/${header.imageUrl}`}}</p>-->
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div :key="header.id" class="grid gap-10 lg:grid-cols-2">
        <!-- Left Section -->
        <div class="lg:pr-10">
          <router-link to="/auth" aria-label="Go Home" title="login" class="inline-block mb-5">
            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
              <svg class="w-10 h-10 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
              </svg>
            </div>
          </router-link>
          <h5 class="mb-4 text-4xl font-extrabold leading-none">
            {{ header.title }}
          </h5>
          <p class="mb-6 text-gray-900">
            {{ header.description }}
          </p>
          <hr class="mb-5 border-gray-300" />
          <div class="flex items-center space-x-4 text-black">
            <a v-for="account in header.accounts" :key="account.id" :href="account.link" target="_blank"
               class="flex-col text-center justify-items-center text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
              <img :alt="account.title" class="h-5 rounded" :src="account.iconUrl">
              <p class="text-black">{{ account.title }}</p>
            </a>
          </div>
        </div>

        <!-- Right Section (Image Section) -->
        <div class="flex justify-end">
          <div class="w-96 h-96 rounded-xl bg-gray-400 p-1">
            <!-- Image Container -->
            <div class="relative w-full h-full inline-flex items-center justify-center rounded-xl text-indigo-500 mb-5 flex-shrink-0"
                 :style="{
                backgroundImage: `url(${header.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
             }"
                 :alt="header.titleAr"
                 :aria-label="header.titleAr">
            </div>
          </div>
        </div>

      </div>
    </div>
    <hr class="mb-5 border-gray-300" />

  </section>
</template>

