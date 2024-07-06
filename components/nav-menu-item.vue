<template>
  <div class="relative ml-auto">
    <span>{{ count }}</span>
    <Transition>
      <div
        v-if="showCount"
        class="absolute -right-3 bottom-6 px-2 py-1 rounded-md font-semibold text-sm"
        :class="{
          'bg-green-400': countAddedOne,
          'bg-rose-400': countRemovedOne,
        }"
      >
        <icon
          :icon="countAddedOne ? 'fa-solid fa-plus' : 'fa-solid fa-minus'"
          class="text-xs"
        />
        1
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    count: Number,
  },
  data() {
    return {
      showCount: false,
      countAddedOne: false,
      countRemovedOne: false,
    };
  },
  watch: {
    count(newValue: number, oldValue: number) {
      this.countAddedOne = newValue - oldValue === 1;
      this.countRemovedOne = newValue - oldValue === -1;

      if (this.countAddedOne || this.countRemovedOne) {
        this.showCount = true;

        setTimeout(() => {
          this.showCount = false;
        }, 2000);
      }
    },
  },
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  bottom: -5px;
  opacity: 0;
}
</style>
