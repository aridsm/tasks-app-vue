<template>
  <div class="px-12 py-8 justify-center w-full">
    <main class="max-w-[1720px] w-full mx-auto">
      <h1 v-if="title" class="text-2xl font-semibold -tracking-tight mb-4">
        {{ title }}
      </h1>
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    title: String,
  },
});
</script>

<style>
</style>