<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root shadow-xl rounded-2xl overflow-hidden">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Country</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Message</th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">Actions</span>
            <span class="text-sm font-semibold text-gray-900">Actions</span>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(message, index) in messages" :key="index" class="hover:bg-gray-50 transition-colors">
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
            {{ message.name }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ message.email }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ message.phone }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ message.country }}</td>
          <td class="px-3 py-4 text-sm text-gray-500">
            <div class="line-clamp-2">
              {{ message.message }}
            </div>
          </td>
          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button
                @click="$emit('delete-message', message.id)"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>