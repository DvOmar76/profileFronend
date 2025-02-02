<template>
  <div class="p-10 bg-gray-50 min-h-screen rounded-xl flex justify-center items-center">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center mb-8 text-gray-800">Edit Course</h1>
      <form @submit.prevent="updateCourse" class="space-y-8">
        <!-- Title Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Title (Arabic)</label>
            <input
                v-model="header.titleAr"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter title in Arabic"
                required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
            <input
                v-model="header.titleEn"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Enter title in English"
                required
            />
          </div>
        </div>

        <!-- Description Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description (Arabic)</label>
            <textarea
                v-model="header.descriptionAr"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                rows="4"
                placeholder="Enter description in Arabic"
                required
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
            <textarea
                v-model="header.descriptionEn"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                rows="4"
                placeholder="Enter description in English"
                required
            ></textarea>
          </div>
        </div>

        <!-- Image Upload Section -->
<!--        <div class="mb-6">-->
<!--          <label class="block text-sm font-medium text-gray-700 mb-2">Course Image</label>-->
<!--          <div class="flex items-center">-->
<!--            <input-->
<!--                type="file"-->
<!--                @change="handleImageUpload"-->
<!--                class="hidden"-->
<!--                ref="imageInput"-->
<!--                accept="image/*"-->
<!--            />-->
<!--            <button-->
<!--                type="button"-->
<!--                @click="$refs.imageInput.click()"-->
<!--                class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ease-in-out duration-200"-->
<!--            >-->
<!--              Upload Image-->
<!--            </button>-->
<!--            <span v-if="course.imageUrl" class="ml-4 text-sm text-gray-600">-->
<!--              {{ course.imageUrl.name || "Image uploaded" }}-->
<!--            </span>-->
<!--          </div>-->
<!--          <img-->
<!--              v-if="course.imageUrl && typeof course.imageUrl === 'string'"-->
<!--              :src="course.imageUrl"-->
<!--              alt="Course Image"-->
<!--              class="mt-4 w-32 h-32 object-cover rounded-lg shadow-sm"-->
<!--          />-->
<!--        </div>-->

        <!-- Certificate Upload Section -->
<!--        <div class="mb-6">-->
<!--          <label class="block text-sm font-medium text-gray-700 mb-2">Course Certificate</label>-->
<!--          <div class="flex items-center">-->
<!--            <input-->
<!--                type="file"-->
<!--                @change="handleCertificateUpload"-->
<!--                class="hidden"-->
<!--                ref="certificateInput"-->
<!--                accept="application/pdf"-->
<!--            />-->
<!--            <button-->
<!--                type="button"-->
<!--                @click="$refs.certificateInput.click()"-->
<!--                class="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ease-in-out duration-200"-->
<!--            >-->
<!--              Upload Certificate-->
<!--            </button>-->
<!--            <span v-if="course.certificateUrl" class="ml-4 text-sm text-gray-600">-->
<!--              {{ course.certificateUrl.name || "Certificate uploaded" }}-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->

        <!-- Submit Button -->
        <div class="flex justify-center">
          <button
              type="submit"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition ease-in-out duration-200 focus:ring-4 focus:ring-indigo-300"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "~/API/api.js";
definePageMeta({
  layout: 'dashboard'
})
export default {
  data() {
    return {
      header: {
        type:"",
        titleAr: "",
        descriptionAr: "",
        titleEn: "",
        descriptionEn: "",
        // imageUrl: null,
        // certificateUrl: null,
      },
    };
  },
  async mounted() {
    await this.fetchHeader();
  },
  methods: {
    async fetchHeader() {
      try {
        const response = await api.get(`/api/en/header/${this.$route.params.id}`);
        this.header = response.data;
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      console.log(file)
      if (file) {
        this.course.imageUrl = file;
      }
    },

    handleCertificateUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.course.certificateUrl = file;
      }
    },

    async updateCourse() {
      try {
        const formData = new FormData();

        // Append fields to FormData
        formData.append("titleEn", this.course.titleEn);
        formData.append("descriptionEn", this.course.descriptionEn);
        formData.append("titleAr", this.course.titleAr);
        formData.append("descriptionAr", this.course.descriptionAr);

        // // Only append the file if there's a new one
        // if (this.course.imageUrl instanceof File) {
        //   formData.append("imageUrl", this.course.imageUrl);
        // } else if (this.course.imageUrl) {
        //   // If the image is not a new file, append the existing image URL
        //   formData.append("imageUrl", this.course.imageUrl);
        // }
        //
        // if (this.course.certificateUrl instanceof File) {
        //   formData.append("certificateUrl", this.course.certificateUrl);
        // } else if (this.course.certificateUrl) {
        //   // If the certificate is not a new file, append the existing certificate URL
        //   formData.append("certificateUrl", this.course.certificateUrl);
        // }

        // Log FormData contents
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        // Make the API request to update the course
        const response = await api.post(`/api/en/header/${this.$route.params.id}`, 'PUT', JSON.stringify(this.course));
        console.log(response, 'response');

        if (response && response.message === 'Course updated successfully') {
          // Optionally, redirect to the course list or show a success message
          // this.$router.push("/dashboard/courses");
        } else {
          console.error("Failed to update course.");
        }
      } catch (error) {
        console.error("Error updating course:", error);
      }
    }
    },
};
</script>

<style scoped>
/* Add custom styles */
</style>
