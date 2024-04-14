<template>
  <div class="flex gap-4 items-center" :class="{
    'justify-center':!showName
  }">
    <icon icon="fa-solid fa-box" />
    <span v-if="showName">LOGO</span>
  </div>
</template>

<script lang=ts>
export default {
  props: {
    showName: Boolean
  },
};
</script>

<style>
</style>