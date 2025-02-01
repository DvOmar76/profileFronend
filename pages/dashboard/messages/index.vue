<template>
  <div>
    <MessagesTable :messages="messages"  @delete-message="deleteMessage" />
  </div>
</template>

<script>
import MessagesTable from '../../../components/MessagesTable';
import api from "~/API/api.js"; // Import the table component
definePageMeta({
  layout: 'dashboard'
})
export default {
  components: {
    MessagesTable,
  },

  data() {
    return {
      messages: [],
    };
  },
  async created() {
   const response = await api.get('/api/message/');
   this.messages = response.data;
  },
  methods: {
    async deleteMessage(messageId) {
      // Implement delete functionality
      console.log('Delete course:', messageId);
      const response = await api.post('/api/message/'+ messageId,'delete');

      this.messages = this.messages.filter(message => message.id !== messageId);
    },
  },
};
</script>