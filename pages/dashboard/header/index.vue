<template>
  <HeaderTable :items="headerItems" @edit-item="editHeader" @delete-item="deleteHeader" />
</template>

<script>
import HeaderTable from '../../../components/HeaderTable.vue';
import api from "~/API/api.js";
definePageMeta({
  layout: 'dashboard'
})
export default {
  components: {
    HeaderTable,
  },

  data() {
    return {
      headerItems: [],
    };
  },
  async created() {
    const response = await api.get('/api/en/header/');
    this.headerItems = response.data;
  },
  methods: {
    async editHeader(headerId) {
      // Implement edit functionality
      this.$router.push('/dashboard/header/edit/' + headerId);
    },
    async deleteHeader(headerId) {
      // Implement delete functionality
      console.log('Delete course:', headerId);
      const response = await api.post('/api/en/header/'+ headerId,'delete');

      this.headerItems = this.headerItems.filter(headerItems => headerItems.id !== headerId);
    },
  },
};
</script>