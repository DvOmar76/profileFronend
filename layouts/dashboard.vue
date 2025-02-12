<template>
  <div class="px-0 py-2 mx-6">
    <!-- Sidebar Toggle Button (Mobile) -->
    <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <!-- Sidebar -->
    <aside
        class="fixed inset-y-0 w-full p-0 my-4 overflow-y-auto bg-white border-0 shadow-xl max-w-64 rounded-2xl xl:ml-6 xl:left-0"
    >
      <div class="h-19">
        <router-link to="/" class="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700">
          <span class="ml-1 font-semibold text-2xl">Profile</span>
        </router-link>
      </div>

      <hr class="h-px mt-0 bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <!-- Sidebar Menu -->
      <div class="w-auto max-h-screen overflow-auto">
        <ul class="flex flex-col pl-0 mb-0">
          <li class="mt-0.5 w-full">
            <button @click="navigateTo('')"
                class="py-2.7 bg-blue-500/13 text-sm my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700"
            >
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center">
                <i class="relative top-0 leading-normal text-blue-500 ni ni-tv-2 text-sm"></i>
              </div>
              <span class="ml-1">Dashboard</span>
            </button>
          </li>

          <li v-for="item in items" :key="item.title" class="mt-0.5 w-full">
            <button
                @click="navigateTo(item.link)"
                class="py-2.7 text-sm my-0 mx-2 flex items-center whitespace-nowrap px-4 text-slate-700"
            >
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center">
                <i class="relative top-0 leading-normal text-orange-500 ni ni-calendar-grid-58 text-sm"></i>
              </div>
              <span class="ml-1">{{ item.title }}</span>
            </button>
          </li>
          <button
              @click="logout"
              class="py-2.7 text-sm my-0 mx-2 flex items-center whitespace-nowrap px-4 text-slate-700  "
          >
            <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center">
            </div>
            <span class="ml-1 font-bold">Logout</span>
          </button>
        </ul>
      </div>

    </aside>

    <!-- Main Content -->
    <div class="p-4 sm:ml-64">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "header", link: "header" },
        { title: "courses", link: "courses" },
        { title: "experiences", link: "experiences" },
        { title: "messages", link: "messages" },
      ],
    };
  },
  async mounted() {
    const token = localStorage.getItem('auth_token'); // Fetch the token from localStorage
    if (!token) {
      // Redirect to login page if token is not found
      this.$router.push('/auth');
    } else {
      try {
        // Optionally, validate the token with the server
        const response = await fetch('https://anime76.com/api/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        // If token is invalid, redirect to login
        this.$router.push('/auth');
      }
    }
  },
  methods: {
    navigateTo(page) {
      this.$router.push(`/dashboard/${page}`);
    },
    async logout() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          await fetch('https://anime76.com/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      }
      // Clear token and redirect to login
      localStorage.removeItem('auth_token');
      this.$router.push('/auth');
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>