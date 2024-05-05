<template>
  <button class=" text-nowrap overflow-hidden uppercase leading-none font-semibold -tracking-tighter text-xs rounded-sm hover:opacity-90 "
  :class="{
    'bg-transparent': color === 'base' && !flat,
    'bg-blue-light dark:bg-lilac text-white': color === 'blue' && !flat,
    'bg-red-400 dark:bg-lilac text-white': color === 'red' && !flat,
    'text-light-text dark:text-dark-text bg-transparent': color === 'base' && flat,
    'text-blue-light dark:text-lilac': color === 'blue' && flat,
    'text-red-500': color === 'red' && flat,
    'py-4 px-8': !flat
  }"
  >
    <slot />
  </button>
</template>

<script lang="ts">

type Color = 'red' | 'blue' | 'base'

export default {
  props: {
    noColor: Boolean,
    color: { type: String as PropType<Color>, default: 'blue'},
      flat: Boolean
  }
};
</script>

<style>

</style>