<template>
  <div class="flex w-screen">
    <sidebar-menu />
    <div class="flex-1 min-w-0 px-12 py-8 flex flex-col">
      <main class="max-w-[1420px] w-full mx-auto">
        <div class="flex items-center gap-6 mb-8">
          <input-text
            v-model="search"
            name="search"
            placeholder="Pesquisar..."
            icon="fa-solid fa-magnifying-glass"
            class="input-search"
          />
          <div class="flex items-center gap-6 user-header">
            <span>{{ todaysDate }}</span>
            <div class="flex gap-6 ml-auto items-center">
              <p>user2949</p>
              <user-img class="rounded-full w-12 h-12" />
              <icon icon="fa-regular fa-bell"></icon>
            </div>
          </div>
        </div>
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { months, daysWeek } from "~/utils/dateUtils";
export default defineComponent({
  data() {
    return {
      search: "" as string,
    };
  },
  computed: {
    todaysDate() {
      const todaysDate = new Date();
      const month = this.$dayjs(todaysDate).month();
      const date = this.$dayjs(todaysDate).date();
      const day = this.$dayjs(todaysDate).day();

      return `${daysWeek[day as number].fullName}, ${date} de ${
        months[month as number]
      }`;
    },
  },
});
</script>

<style scoped>
.input-search {
  flex: 2
}

.user-header {
  flex: 3
}
</style>