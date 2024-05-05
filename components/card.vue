<template>
  <div class="flex flex-col  border-dark-text/[.2] dark:border-dark-text/[.1] text-light-text dark:text-white rounded-sm card"
  :class="{
    'bg-light-200 dark:bg-dark-300 border': darker,
    'bg-light-100 dark:bg-dark-200 border': !darker
  }">
    <div v-if="$slots.header" class="bg-gray-200/[.7] text-gray-500 dark:text-white dark:bg-dark-100 px-4 py-2" :class="headerClass">
      <slot name="header" />
    </div>
    <div class="p-4 flex-1 flex flex-col">
    <slot />
  </div>
  </div>
</template>

<script setup>
defineProps({
  headerClass: String,
  darker: Boolean,
})
</script>