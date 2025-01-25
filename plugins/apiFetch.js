import {defineNuxtPlugin} from "#app";
export default defineNuxtPlugin(nuxtApp => {
    const config=useRuntimeConfig()
    console.log(config.public.BASE_URL)
   nuxtApp.provide(
       'apiFetch',
       $fetch.create({baseURL: config.public.BASE_URL,credentials:"include"})
   )
})