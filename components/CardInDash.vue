<template>
  <section class="text-gray-600 body-font  mb-4 w-full ">
    <div class="p-4 w-full">
      <div class="border-2 border-gray-200 px-4 py-6 rounded-lg justify-items-center">
        <slot></slot>
        <h2 class="title-font font-medium text-3xl text-gray-900">{{content}}</h2>
        <p class="leading-relaxed">{{title}} </p>
      </div>
    </div>
  </section>

</template>
<script>
export default {
  props:{
    title:{
      type: String,
    },
    content:{
      type: String,
    },

  }
}
</script>