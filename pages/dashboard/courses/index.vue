<template>
  <div>
    <CoursesTable :courses="courses" @edit-course="editCourse" @delete-course="deleteCourse" />
  </div>
</template>

<script>
import CoursesTable from '../../../components/CoursesTable';
import api from "~/API/api.js"; // Import the table component
definePageMeta({
  layout: 'dashboard'
})
export default {
  components: {
    CoursesTable,
  },

  data() {
    return {
      courses: [],
    };
  },
  async created() {
   const response = await api.get('/api/en/courses/');
   this.courses = response.data;
  },
  methods: {
    async editCourse(courseId) {
      // Implement edit functionality
      this.$router.push('/dashboard/courses/edit/' + courseId);
    },
    async deleteCourse(courseId) {
      // Implement delete functionality
      console.log('Delete course:', courseId);
      const response = await api.post('/api/en/courses/'+ courseId,'delete');

      this.courses = this.courses.filter(course => course.id !== courseId);
    },
  },
};
</script>