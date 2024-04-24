<template>
  <div class="bg-dark-200 text-white inline-block rounded-sm border border-dark-300 card">
    <div class="bg-dark-100 px-4 py-[2px]" :class="headerClass">
      <slot name="header" />
    </div>
    <div class="p-4 ">
    <slot />
  </div>
  </div>
</template>

<script setup>
defineProps({
  headerClass: String
})
</script>

<style scoped>
</style>