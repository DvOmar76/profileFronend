<template>
  <div class="p-10 bg-gray-50 min-h-screen rounded-xl flex justify-center items-center">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center mb-8 text-gray-800">Edit Experience</h1>
      <form  @submit.prevent="updateExperience" class="space-y-8">
        <!-- Title Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
                v-model="experience.title"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter title"
                required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
                v-model="experience.company"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter company name"
                required
            />
          </div>
        </div>

        <!-- Description Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
              v-model="experience.description"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
              rows="4"
              placeholder="Enter description"
              required
          ></textarea>
        </div>

        <!-- Image URL -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input
              v-model="experience.imageUrl"
              type="url"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
              placeholder="Enter image URL"
          />
        </div>

        <!-- Company Link -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Company Link</label>
          <input
              v-model="experience.linkCompany"
              type="url"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
              placeholder="Enter company link"
          />
        </div>

        <!-- Type of Work and Location Type -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Type of Work</label>
            <select
                v-model="experience.typeWork"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
            <select
                v-model="experience.locationType"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                required
            >
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <!-- Country and City -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
                v-model="experience.counter"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter country"
                required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
                v-model="experience.city"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter city"
                required
            />
          </div>
        </div>

        <!-- Start and End Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
                v-model="experience.start"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter start date"
                required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
                v-model="experience.end"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter end date"
                required
            />
          </div>
        </div>

        <!-- Certificate File Upload -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Certificate</label>
          <div class="flex items-center">
            <input
                type="file"
                @change="handleCertificateUpload"
                class="hidden"
                ref="certificateInput"
                accept="application/pdf"
            />
            <button
                type="button"
                @click="$refs.certificateInput.click()"
                class="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ease-in-out duration-200"
            >
              Upload Certificate
            </button>
            <span v-if="certificateFile" class="ml-4 text-sm text-gray-600">
              {{ certificateFile.name }}
            </span>
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">image</label>
          <div class="flex items-center">
            <input
                type="file"
                @change="handleCertificateUpload"
                class="hidden"
                ref="imageInput"
            />
            <button
                type="button"
                onchange="handleImageUpload"
                @click="$refs.imageInput.click()"
                class="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ease-in-out duration-200"
            >
              Upload image
            </button>
            <span v-if="imageFile" class="ml-4 text-sm text-gray-600">
              {{ imageFile.name }}
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <button
              type="submit"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition ease-in-out duration-200 focus:ring-4 focus:ring-indigo-300"
          >
            Update Experience
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "~/API/api.js";
import axios from "axios";

definePageMeta({
  layout: 'dashboard'
});

export default {
  data() {
    return {
      experience: {
        title: "",
        company: "",
        description: "",
        imageUrl: "",
        linkCompany: "",
        typeWork: "",
        locationType: "",
        counter: "",
        city: "",
        start: "",
        end: "",
      },
      certificateFile: null, // Store the uploaded certificate file
      imageFile: null, // Store the uploaded image file
    };
  },
  async mounted() {
    await this.fetchExperience();
  },
  methods: {
    async fetchExperience() {
      try {
        const response = await api.get(`/api/en/experiences/${this.$route.params.id}`);
        this.experience = response.data;
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    },

    handleCertificateUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.certificateFile = file;
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
      }
    },

    async updateExperience() {
      try {
        const formData = new URLSearchParams();

        // Append all experience fields to FormData
        Object.keys(this.experience).forEach((key) => {
          formData.append(key, this.experience[key]);
        });

        // Append the certificate file if it exists
        if (this.certificateFile) {
          formData.append("certificateUrl", this.certificateFile);
        } else {
          // If no new certificate file is uploaded, append the existing URL
          formData.append("certificateUrl", this.experience.certificateUrl || "");
        }

        // Append the image file if it exists
        if (this.imageFile) {
          formData.append("imageUrl", this.imageFile);
        } else {
          // If no new image file is uploaded, append the existing URL
          formData.append("imageUrl", this.experience.imageUrl || "");
        }

        // Log FormData contents for debugging
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        // Make the API request to update the experience
        const response = await axios.put(
            `http://127.0.0.1:8000/api/ar/experiences/${this.$route.params.id}`,
            formData,
            {
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                'body':'form-data'
              },
            }
        );

        console.log(response, 'response');

        if (response && response.data.message === 'Experience updated successfully') {
          // Optionally, redirect to the experience list or show a success message
          // this.$router.push("/dashboard/experiences");
        } else {
          console.error("Failed to update experience.");
        }
      } catch (error) {
        console.error("Error updating experience:", error);
      }
    }  },
};
</script>
<style scoped>
/* Add custom styles */
</style>