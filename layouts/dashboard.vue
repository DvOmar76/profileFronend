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
          <span class="ml-1 font-semibold">Argon Dashboard 2</span>
        </router-link>
      </div>

      <hr class="h-px mt-0 bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <!-- Sidebar Menu -->
      <div class="w-auto max-h-screen overflow-auto">
        <ul class="flex flex-col pl-0 mb-0">
          <li class="mt-0.5 w-full">
            <a
                class="py-2.7 bg-blue-500/13 text-sm my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700"
                href="../pages/dashboard.html"
            >
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center">
                <i class="relative top-0 leading-normal text-blue-500 ni ni-tv-2 text-sm"></i>
              </div>
              <span class="ml-1">Dashboard</span>
            </a>
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
        </ul>
      </div>

      <!-- Sidebar Footer -->
<!--      <div class="mx-4">-->
<!--        <a-->
<!--            href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/argon-dashboard/"-->
<!--            target="_blank"-->
<!--            class="inline-block w-full px-8 py-2 mb-4 font-bold leading-normal text-center text-white capitalize rounded-lg shadow-md bg-slate-700 hover:shadow-xs hover:-translate-y-px"-->
<!--        >-->
<!--          Documentation-->
<!--        </a>-->
<!--        <a-->
<!--            href="https://www.creative-tim.com/product/argon-dashboard-pro-tailwind?ref=sidebarfree"-->
<!--            target="_blank"-->
<!--            class="inline-block w-full px-8 py-2 font-bold leading-normal text-center text-white rounded-lg shadow-md bg-blue-500 hover:shadow-xs hover:-translate-y-px"-->
<!--        >-->
<!--          Upgrade to pro-->
<!--        </a>-->
<!--      </div>-->
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
  methods: {
    navigateTo(page) {
      this.$router.push(`/dashboard/${page}`);
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>