<template>
  <div>
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
      <div class="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-1 gap-3 ">
<!--        <CardInDash content="2.3K" title="view">-->
<!--        <slot>-->
<!--          <img class=" px-4 py-6 rounded-lg justify-items-center w-24 " src="~/assets/images/views.png" alt="view" />-->
<!--        </slot>-->
<!--      </CardInDash>-->
      <CardInDash :content="numberOfMessages" title="Messages">
        <slot>
          <img class=" px-4 py-6 rounded-lg justify-items-center w-24 " src="~/assets/images/messages.png" alt="view" />
        </slot>
      </CardInDash>
<!--        <CardInDash content="2.3K" title="total hour of learn">-->
<!--        <slot>-->
<!--          <img class=" px-4 py-6 rounded-lg justify-items-center w-24 " src="~/assets/images/views.png" alt="view" />-->
<!--        </slot>-->
<!--      </CardInDash>-->
        <CardInDash :content="numberOfSkills" title="skills">
        <slot>
          <img class=" px-4 py-6 rounded-lg justify-items-center w-24 " src="~/assets/images/skills.png" alt="skills" />
        </slot>
      </CardInDash>
      </div>

      <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 ">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                  </svg>
                </p>
              </div>

            </div>
  </div>
</template>

<script>
import api from "~/API/api.js";

definePageMeta({
  layout: 'dashboard'
})
export default {
  data(){
    return{
      numberOfSkills:'',
      numberOfMessages:'',
    }
  },
  async mounted() {
    const numberOfSkills = await api.get('/api/dashboard/numberOfSkills');
      this.numberOfSkills=await numberOfSkills.data
    const numberOfMessages = await api.get('/api/dashboard/numberOfMessages');
      this.numberOfMessages=await numberOfMessages.data
    console.log(numberOfSkills)

  },

};
</script>
