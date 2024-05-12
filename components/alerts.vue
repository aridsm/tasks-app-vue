<template>
  <Teleport to="body">
    <TransitionGroup
      name="list"
      tag="ul"
      class="flex flex-col gap-2 absolute right-4 top-4 w-80 overflow-hidden"
    >
      <li
        v-for="alert in alertStore.alerts"
        :key="alert.id"
        class="rounded-sm px-4 py-3 w-full alert bg-light-100 dark:bg-dark-100 flex gap-3"
      >
        <icon
          icon="fa-solid fa-triangle-exclamation"
          class="text-amber-600 dark:text-amber-500 text-lg"
        ></icon>

        <p>{{ alert.description }}</p>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<script lang="ts">
import { useAlertStore } from "~/state/alerts.store";

export default {
  setup() {
    const alertStore = useAlertStore();

    return { alertStore };
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}

.alert {
  box-shadow: 0 10px 5px 0 rgba(0, 0, 0, 0.06);
}
</style>
