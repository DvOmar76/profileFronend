<template>
  <ExperienceTable  @edit-experiences="editExperiences" @delete-experiences="deleteExperiences"  :experiences="experiences"/>
</template>

<script>
import api from "~/API/api.js";
import ExperienceTable from "~/components/ExperienceTable.vue";
definePageMeta({
  layout: 'dashboard'
})
export default {
  components: {
    ExperienceTable,
  },

  data() {
    return {
      experiences: [],
    };
  },
  async created() {
    const response = await api.get('/api/en/experiences/');
    this.experiences = response.data;
  },
  methods: {
    async editExperiences(experienceId) {
      // Implement edit functionality
      this.$router.push('/dashboard/experiences/edit/' + experienceId);
      console.log(experienceId)
    },
    async deleteExperiences(experienceId) {
      // Implement delete functionality
      console.log('Delete course:', experienceId);
      await api.post('/api/en/experiences/'+ experienceId,'delete');
      console.log(experienceId)

      this.experiences = this.experiences.filter(experience => experience.id !== experienceId);
    },
  },
};
</script>