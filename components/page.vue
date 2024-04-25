<template>
  <div class="px-12 py-8 flex flex-col">
    <main class="max-w-[1420px] w-full mx-auto">
      <h1 v-if="title" class="text-2xl font-semibold -tracking-tight mb-8">
        {{ title }}
      </h1>
      <directories />

      <div class="border-t border-t-dark-100 pt-8 mt-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import directories from "./directories.vue";

export default defineComponent({
  components: { directories },
  props: {
    title: String,
  },
});
</script>

<style>
</style>