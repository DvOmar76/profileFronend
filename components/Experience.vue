<script>
import api from "~/API/api.js";

export default {
  data(){
    return{
      title:'',
      description:'',
      experiences:[]
    }
  },
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
  methods:{
    getHeaders(){
      api.get(`/api/${this.lang}/header`).then(headers => {
        const header = headers.data.find(header => header.type === 'experiences');
        if (header) {
          this.title = header.title;
          this.description = header.description;
          // this.header.imageUrl = header.imageUrl;
        }
      });
    },
    getExperiences(){
      api.get('/api/en/experiences').then(headers => {
        const experiences = headers.data;
        if (experiences) {
          // this.title = header.title;
          this.experiences = experiences;
          // this.description = header.description;
          // this.header.imageUrl = header.imageUrl;
          // console.log(this.experiences[0].skills[0].title,'experiences')
        }
      });
    },
  },
  mounted() {
    this.getHeaders()
    this.getExperiences()
  }
}
</script>

<template>
  <section class="text-gray-600 body-font">
    <div class="text-center mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">{ {{title}} }</h1>
      <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">{{description}}</p>
    </div>
    <div class="text-center">
      <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex text-center"></div>
    </div>
    <div  class="container px-5 py-24 mx-auto flex flex-wrap">
      <div class="work-experience max-w-4xl mx-auto px-6 py-12">
        <ol class="relative border-l-4 border-gray-300 dark:border-gray-600">
          <!-- Loop through the work experiences -->
          <li v-for="(item, index) in experiences" :key="index" class="mb-12 pl-6 group hover:bg-gray-100  transition-all duration-300 rounded-xl p-2">
            <!-- Timeline Dot -->
            <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-2.5 border-2 border-white dark:border-gray-900 group-hover:bg-blue-600 transition-all duration-300"></div>

            <!-- Date Range -->
            <time class="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{{ item.start }} - {{ item.end }}</time>

            <!-- Job Title -->
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-all duration-300">{{ item.title }}</h3>

            <!-- Company Details (Logo + Name) -->
            <div class="flex items-center space-x-3 my-4">
              <img v-if="item.imageUrl" :src="`${item.imageUrl}`" :alt="item.company" class="w-12 h-12 rounded-full object-cover " />
              <p class="text-base font-medium text-gray-900 dark:text-white">{{ item.company }}</p>
            </div>
            <!-- Job Description -->
            <p class="mb-4 text-base font-normal text-gray-600 dark:text-gray-300">{{ item.description }}</p>

            <!-- Location and Type of Work -->
            <div class="mb-4">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                <strong>Location: </strong>{{ item.city }} ({{ item.locationType }})
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                <strong>Work Type: </strong>{{ item.typeWork }}
              </p>
            </div>

            <!-- Skill Icons -->
            <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="(skill, skillIndex) in item.skills" :key="skillIndex"
                class="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <img v-if="skill.iconUrl" :src="skill.iconUrl" :alt="skill.title" class="w-5 h-5" />

            <span>{{ skill.title }}</span>
          </span>
            </div>

            <!-- Links to Company and Certificate -->
            <div class="flex space-x-4">
              <a v-if="item.linkCompany" :href="item.linkCompany" target="_blank"
                 class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-all duration-300">
                Visit Company
              </a>
              <a v-if="item.certificateUrl" :href="item.certificateUrl" target="_blank"
                 class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 transition-all duration-300">
                View Certificate
              </a>
            </div>
          </li>
        </ol>
      </div>
    </div>

  </section>
</template>

<style scoped>

</style>
<!--<div v-for="(experience,index) in experiences " :key="experience.title" class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">-->
<!--<div class="h-full w-6 absolute inset-0 flex items-center justify-center">-->
<!--  <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>-->
<!--</div>-->
<!--<div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">{{index+1}}</div>-->
<!--<div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">-->
<!--  <a :href="experience.link" target="_blank" class="hover:hover:-translate-y-1 hover:scale-110 hover:shadow-xl duration-300  transition ease-in-out delay-150 flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">-->
<!--    <img :src="experience.imageUrl" :alt="experience.title" class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">-->
<!--  </a>-->
<!--  <div class="flex-grow  sm:pl-6 mt-6 sm:mt-0 ">-->
<!--    <div class=" bg-gray-100 rounded-xl p-2 w-fit">-->
<!--      <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">{{experience.title}}</h2>-->
<!--      <p class="leading-relaxed text-xs">{{experience.start}} - {{experience.end}} <span class="font-bold">{{experience.total}}</span></p>-->
<!--      <p class="leading-relaxed ">{{experience.description}}</p>-->
<!--    </div>-->
<!--    <p>skills: </p>-->
<!--    <div class="grid grid-cols-3 gap-1 rounded w-fit ">-->
<!--      <div-->
<!--          v-for="skill in experience.skills"-->
<!--          :key="skill.id || skill.title"-->
<!--          class="m-1 p-1 rounded text-center bg-indigo-500 duration-300 transition ease-in-out delay-150"-->
<!--      >-->
<!--        <img-->
<!--            v-if="skill.icon"-->
<!--            :alt="skill.title"-->
<!--            class="h-5 rounded"-->
<!--            :src="skill.icon"-->
<!--        >-->
<!--        <div v-else class="w-full rounded text-white text-xs font-bold">-->
<!--          {{ skill.title }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->
<!--</div>-->
