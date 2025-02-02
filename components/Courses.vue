<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">{{ title }}</h1>
        <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">{{ description }}</p>
        <div class="flex mt-6 justify-center">
          <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min">
        <div
            v-for="course in courses"
            :key="course.id"
            class="p-8 flex flex-col text-center items-center rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ease-in-out bg-white border border-gray-100"
        >
          <!-- Course Image -->
          <div class="relative w-fit h-fit bg-indigo-100 p-1 rounded-xl">
            <img
                :src="course.imageUrl"
                :alt="course.title"
                class="w-28 h-24 object-cover rounded-xl"
                v-if="course.imageUrl"
            />
            <div
                v-else
                class="w-28 h-24 flex items-center justify-center bg-indigo-100 text-indigo-500 rounded-xl"
            >
              <span class="text-sm">No Image</span>
            </div>
          </div>

          <!-- Course Details -->
          <div class="flex-grow">
            <h2 class="text-gray-900 text-xl font-semibold mb-3">{{ course.title }}</h2>

            <!-- Skills Section -->
            <div v-if="course.skills && course.skills.length > 0" class="flex flex-wrap justify-center mb-4">
              <button
                  v-for="skill in course.skills"
                  :key="skill.title"
                  class="m-1 px-3 py-1 rounded-full text-center bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition-all duration-300 hover:shadow-lg"
              >
                {{ skill.title }}
              </button>
            </div>

            <!-- Course Description -->
            <div class="text-left">
              <div
                  class="overflow-hidden transition-all duration-500 ease-in-out"
                  :style="{
              height: course.showFullDescription ? `${course.descriptionHeight}px` : '6rem',
            }"
                  ref="description"
              >
                <p class="leading-relaxed text-base text-gray-600 mb-4">
                  {{ course.showFullDescription ? course.description : truncateDescription(course.description, 150) }}
                </p>
              </div>
              <button
                  v-if="course.description.length > 150"
                  @click="toggleDescription(course)"
                  class="text-indigo-500 hover:text-indigo-700 transition-colors duration-300 focus:outline-none "
              >
                {{ course.showFullDescription ? 'Read Less' : 'Read More' }}
              </button>
            </div>

            <!-- Learn More Link -->
            <a
                :href="course.certificateUrl"
                target="_blank"
                class="mt-3 text-indigo-500 inline-flex items-center hover:text-indigo-700 transition-colors duration-300"
            >
              Show Certificate
            </a>
          </div>
        </div>
      </div>    </div>
    <hr class="mb-5 border-gray-300" />
  </section>
</template>

<script>
import api from "~/API/api.js";

export default {
  props: {
    lang: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: '',
      description: '',
      courses: [],

    };
  },
  watch: {
    // Watch for changes in the `lang` prop and re-fetch data
    lang: {
      immediate: true, // Fetch data immediately when the component is created
      handler() {
        this.getHeaders();
        this.getCourses();
      }
    }
  },
  methods: {

    getHeaders() {
      api.get(`/api/${this.lang}/header`).then(headers => {
        const header = headers.data.find(header => header.type === 'courses');
        if (header) {
          this.title = header.title;
          this.description = header.description;
        }
      });
    },
    toggleDescription(course) {
      // Toggle the showFullDescription state
      course.showFullDescription = !course.showFullDescription;

      // Calculate the full height of the description
      this.$nextTick(() => {
        const descriptionElement = this.$refs.description[this.courses.indexOf(course)];
        if (course.showFullDescription) {
          // Expand to full height
          course.descriptionHeight = descriptionElement.scrollHeight;
        } else {
          // Collapse to truncated height
          course.descriptionHeight = 96; // 6rem in pixels (6 * 16px)
        }
      });
    },
    getCourses() {
      api.get(`/api/${this.lang}/courses`).then(courses => {
        this.courses = courses.data.map((course,index) => {
         return{
           id: course.id,
           title: course.title,
           description: course.description,
           imageUrl: course.imageUrl,
           certificateUrl: course.certificateUrl,
           showFullDescription:false,
           index:index
         }
        });
      });
    },
    truncateDescription(text, limit) {
      return text.length > limit ? text.slice(0, limit) + '...' : text;
    },

  },
  mounted() {
    // Fetch data when the component is mounted
    this.getHeaders();
    this.getCourses();
  }
};
</script>

<style scoped>
/* Custom Styles */
.container {
  max-width: 1200px;
}

/* Hover effect for course cards */
.hover\:shadow-2xl:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Smooth transitions for buttons and links */
.transition-all {
  transition: all 0.5s ease-in-out;
}

.transition-colors {
  transition: color 0.3s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Grid Layout */
.grid {
  display: grid;
  gap: 2rem; /* Spacing between grid items */
}

/* Wider Cards */
.p-8 {
  padding: 2rem; /* Increased padding for wider cards */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(1, 1fr); /* 1 column on small screens */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on medium screens */
  }
}

@media (min-width: 1025px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on large screens */
  }
}
</style>