<template>
  <Teleport to="body">
    <Transition>
    <div
      v-if="modelValue"
      data-type="container"
      class="w-screen h-screen overflow-auto absolute bg-black/[.2] dark:bg-black/[.3] backdrop-blur-[1px] top-0 left-0 z-[99999] grid place-items-center"
      @click.self="$emit('update:modelValue', false)"
    >
      <card :class="cardClasses" darker>
        <div class="flex justify-between items-center gap-4">
          <h2 v-if="title" class="text-xl font-semibold">{{ title }}</h2>
          <button
            aria-label="fechar"
            @click="$emit('update:modelValue', false)"
            class="hover:bg-dark-text/[.1] w-8 h-8 rounded-full grid place-items-center"
          >
            <icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div class="mt-4">
          <slot />
        </div>
      </card>
    </div>
  </Transition>
  </Teleport>
</template>

<script lang="ts">
export default {
  props: {
    modelValue: Boolean,
    title: String,
    cardClasses: String,
  },
  data() {
    return {
      dialogOpen: true,
    };
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>