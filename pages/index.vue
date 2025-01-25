<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import Vue Composition API
import { Courses } from "#components";
import { Header } from "#components";

export default defineComponent({
  components: {
    Courses,
    Header,
  },
  setup() {
    // Language state using ref
    const lang = ref('en');

    // Function to change language
    const changeLanguage = () => {
      lang.value = lang.value === 'en' ? 'ar' : 'en'; // Toggle between 'en' and 'ar'
      console.log(lang.value);
    };

    // Return to be used in the template
    return {
      lang,
      changeLanguage,
    };
  }
});
</script>

<template>
  <div class="flex justify-end items-end h-full w-full m-1 ">
    <!-- Other content goes here -->
    <div class="text-center mb-12 pt-7 pr-7">
      <button @click="changeLanguage" class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
        <svg data-v-fbff51d6="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" aria-labelledby="icon-globe-16" focusable="false" viewBox="0 0 16 16" class="w-8 h-8 text-deep-purple-accent-400">
          <g data-v-fbff51d6=""><path data-v-fbff51d6="" fill-rule="evenodd" clip-rule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.2403 7.25218L7.24031 3.29649C6.09993 4.53189 5.46504 5.89581 5.29616 7.25589L7.2403 7.25218ZM7.2403 8.75218L5.29769 8.75589C5.46884 10.1119 6.10334 11.4714 7.24029 12.7033L7.2403 8.75218ZM3.78649 7.25877C3.92843 5.81933 4.48342 4.41539 5.42765 3.13738C3.89318 3.9508 2.7898 5.46929 2.5492 7.26112L3.78649 7.25877ZM2.55224 8.76112L3.78828 8.75877C3.93308 10.1921 4.4875 11.5899 5.42801 12.8628C3.89971 12.0528 2.79896 10.5434 2.55224 8.76112ZM8.7403 8.74932L10.7151 8.74556C10.5443 10.1173 9.89958 11.4929 8.74029 12.7366L8.7403 8.74932ZM10.714 7.24556L8.7403 7.24932L8.74031 3.26329C9.89717 4.5043 10.5417 5.87671 10.714 7.24556ZM12.2248 8.74268C12.0829 10.1779 11.5304 11.5778 10.591 12.8527C12.1153 12.0371 13.2106 10.5243 13.4506 8.74034L12.2248 8.74268ZM13.448 7.24035L12.2234 7.24268C12.0793 5.81264 11.5274 4.41797 10.5912 3.14741C12.1099 3.96008 13.2027 5.46489 13.448 7.24035Z"></path></g>
        </svg>
      </button>
    </div>
  </div>

  <Header :lang="lang"/>
  <Courses :lang="lang"/>
  <Experience  :lang="lang"/>
  <CountactUs  :lang="lang"/>
</template>