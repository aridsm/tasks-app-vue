<template>
  <div class="bg-light-100 dark:bg-dark-200 border border-dark-text/[.2] dark:border-dark-text/[.1] text-light-text dark:text-white inline-block rounded-sm card">
    <div v-if="$slots.header" class="bg-light-pink text-light-pink-text dark:text-white dark:bg-dark-100 px-4 py-[2px]" :class="headerClass">
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