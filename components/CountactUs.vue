<script>
import api from "~/API/api.js";

export default {
  data() {
    return {
      title:'',
      description:'',
      form: {
        name: '',
        email: '',
        phone: '',
        country: '',
        message: '' // Changed 'messages' to 'message' to match backend
      },
      errors: {},     // Added for displaying errors
      success: false  // Added for displaying success message
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
  methods: {
    async handleSubmit() {
      this.errors = {}; // Clear previous errors
      this.success = false; // Reset success state

      try {
        const response = await api.post('/api/message', 'POST', JSON.stringify(this.form)); // Use 'messages' endpoint

        if (response.errors) {
          this.errors = response.errors;
          this.success = false;
        } else {
          this.success = true;
          this.form = { // Clear the form
            name: '',
            email: '',
            phone: '',
            country: '',
            message: '' // Use 'message'
          };
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle the error appropriately, e.g., display a generic error message to the user
        this.errors = { general: ["An unexpected error occurred. Please try again."] };
      }
    },
    getHeaders() {
      api.get(`/api/${this.lang}/header`).then(headers => {
        const header = headers.data.find(header => header.type === 'contact');
        if (header) {
          this.title = header.title;
          this.description = header.description;
        }
      });
    },
  },
  mounted() {
    this.getHeaders();
  }
}
</script>

<template>
  <section class="text-gray-600 body-font relative">
    <hr class="mb-5 border-gray-300" />
    <div class="container px-5 py-12 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
<!--        Contact Us-->
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ title }}</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{description}}</p>
      </div>
      <div class="flex mt-6 justify-center mb-10">
        <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
      </div>

      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline"> Your message has been sent.</span>
      </div>

      <form @submit.prevent="handleSubmit" class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-1/2">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" v-model="form.name"
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              <div v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name[0] }}</div>
            </div>
          </div>
          <div class="p-2 w-1/2">
            <div class="relative">
              <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" v-model="form.email"
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              <div v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email[0] }}</div>
            </div>
          </div>
          <div class="p-2 w-1/2">
            <div class="relative">
              <label for="phone" class="leading-7 text-sm text-gray-600">Phone</label>
              <input type="tel" id="phone" v-model="form.phone"
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              <div v-if="errors.phone" class="text-red-500 text-xs italic">{{ errors.phone[0] }}</div>
            </div>
          </div>
          <div class="p-2 w-1/2">
            <div class="relative">
              <label for="country" class="leading-7 text-sm text-gray-600">Country</label>
              <input type="text" id="country" v-model="form.country"
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              <div v-if="errors.country" class="text-red-500 text-xs italic">{{ errors.country[0] }}</div>
            </div>
          </div>
          <div class="p-2 w-full">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
              <textarea id="message" v-model="form.message"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              <div v-if="errors.message" class="text-red-500 text-xs italic">{{ errors.message[0] }}</div>
            </div>
          </div>
          <div class="p-2 w-full">
            <button type="submit"
                    class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Send
            </button>
          </div>
          <div v-if="errors.general" class="p-2 w-full">
            <div class="text-red-500 text-xs italic" v-for="error in errors.general" :key="error">
              {{ error }}
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>