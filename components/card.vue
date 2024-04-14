<template>
  <div class="bg-dark-100 text-white inline-block rounded-lg border border-dark-300 card">
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
.card {
  box-shadow: 4px 15px 20px 0 rgba(0,0,0,0.2);
}
</style>