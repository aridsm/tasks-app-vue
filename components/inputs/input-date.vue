<template>
  <ClientOnly>
    <div :ref="`select-${name}`" class="flex flex-col relative ">
      <label v-if="label" class="input-label" :for="name">{{ label }}</label>
      <Field
        v-model="modelValue"
        :name="name"
        :id="name"
        :rules="rules"
        v-slot="{ errorMessage }"
        validateOnMount
        class="flex flex-col"
      >
        <button
          class="x-input flex justify-between items-center"
          @click="openItemsListHandler"
        >
          <span v-if="!modelValue" class="text-dark-text">{{
            placeholder
          }}</span>
          <p v-else>{{ $dayjs(modelValue).format("DD/MM/YYYY") }}</p>
          <div class="flex items-center gap-4">
            <div
              v-show="clearable && modelValue"
              class="text-dark-text grid place-items-center w-5 h-5 rounded-full hover:bg-dark-100"
              @click.stop="clearModelValueHandler"
            >
              <icon icon="fa-solid fa-xmark" />
            </div>
            <icon icon="fa-regular fa-calendar" />
          </div>
        </button>
        <text-error>{{ errorMessage }}</text-error>
      </Field>

      <div
        v-if="dateCalendarShown"
        class="dark:bg-dark-200 bg-light-100 absolute top-full left-0 w-max p-2 container-date z-50"
      >
        <div
          class="border dark:border-dark-text/[.1] p-1 rounded-sm flex justify-between items-center"
        >
          <button
            class="w-8 h-8 dark:bg-dark-100 bg-light-text/[.1] hover:text-white hover:bg-blue-light dark:hover:bg-lilac grid place-items-center"
            @click="selectPreviousMonthHandler"
          >
            <icon icon="fa-solid fa-chevron-left" />
          </button>
          <span>{{ months[currentMonth as number] }} {{ currentYear }}</span>
          <button
            class="w-8 h-8 dark:bg-dark-100 bg-light-text/[.1] hover:text-white hover:bg-blue-light dark:hover:bg-lilac grid place-items-center"
            @click="selectNextMonthHandler"
          >
            <icon icon="fa-solid fa-chevron-right" />
          </button>
        </div>
        <div class="flex flex-nowrap w-full">
          <span
            v-for="dayWeek in daysWeek"
            :key="dayWeek.fullName"
            class="w-12 h-12 grid place-items-center text-dark-text"
          >
            {{ dayWeek.abbreviation }}
          </span>
        </div>

        <ul class="overflow-auto grid grid-cols-7">
          <li
            v-for="day in daysArr"
            :key="day.id"
            class="w-12 h-12 grid place-items-center rounded-sm"
            :class="{
              'text-dark-text cursor-not-allowed': !day.enabled,
              'dark:hover:bg-dark-100 hover:bg-light-text/[.1] cursor-pointer text': day.enabled,
              'bg-blue-light hover:bg-blue-light dark:bg-lilac dark:hover:bg-lilac ': currentDay === day.day && day.enabled,
            }"
            @click="day.enabled ? selectDayHandler(day.day) : undefined"
          >
            {{ day.day }}
          </li>
        </ul>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
export { months, daysWeek } from "~/utils/dateUtils";

export default defineComponent({
  props: {
    modelValue: {
      type: null as any as PropType<null | Date | string>,
      required: true,
    },
    name: { type: String, required: true },
    rules: { type: Object as any, default: undefined },
    placeholder: { type: String, default: "Selecione..." },
    clearable: { type: Boolean, default: false },
    label: { type: String },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      dateCalendarShown: false,
      dummyDate: null as null | Date | string,
    };
  },
  computed: {
    currentMonth(): number {
      return this.$dayjs(this.dummyDate).month();
    },
    currentYear(): number {
      return this.$dayjs(this.dummyDate).year();
    },
    currentDay(): number {
      return this.$dayjs(this.dummyDate).date();
    },
    daysArr() {
      const selectedDate = this.dummyDate;
      const days = [];

      const daysInMonth = this.$dayjs(selectedDate).daysInMonth();

      // dias habilitados para escolher (do mês selecionado)
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          day: i,
          enabled: true,
          id: `dayInMonth-${i}`,
        });
      }

      const firstDayWeekOfMonth = this.$dayjs(selectedDate).date(1).day();

      const previousMonthTotalDays = this.$dayjs(selectedDate)
        .month(this.$dayjs(selectedDate).month() - 1)
        .daysInMonth();

      // últimos dias do mês anterior (p/ completar o calendário no início)
      for (
        let i = previousMonthTotalDays;
        i > previousMonthTotalDays - firstDayWeekOfMonth;
        i--
      ) {
        days.unshift({
          day: i,
          enabled: false,
          id: `previousMonth-${i}`,
        });
      }

      const lastDayWeekOfMonth = this.$dayjs(selectedDate)
        .date(this.$dayjs(selectedDate).daysInMonth())
        .day();
      const lastDayWeekIndex = 6; // 7 dias

      const remainingDaysInCalendar = lastDayWeekIndex - lastDayWeekOfMonth;

      // primeiros dias do mês posterior (p/ completar o calendário no fim)
      for (let i = 1; i <= remainingDaysInCalendar; i++) {
        days.push({
          day: i,
          enabled: false,
          id: `nextMonth-${i}`,
        });
      }

      return days;
    },
  },
  methods: {
    selectItemHandler(item: Date | string) {
      this.$emit("update:modelValue", item);
    },
    clearModelValueHandler() {
      this.$emit("update:modelValue", null);
    },
    openItemsListHandler() {
      this.dateCalendarShown = true;
    },
    selectPreviousMonthHandler() {
      const selectedDate = this.dummyDate;

      const newDate = this.$dayjs(selectedDate)
        .month(this.$dayjs(selectedDate).month() - 1)
        .format("YYYY-MM-DD[T]HH:mm:ss");

      this.dummyDate = newDate;
    },
    selectNextMonthHandler() {
      const selectedDate = this.dummyDate;

      const newDate = this.$dayjs(selectedDate)
        .month(this.$dayjs(selectedDate).month() + 1)
        .format("YYYY-MM-DD[T]HH:mm:ss");

      this.dummyDate = newDate;
    },
    selectDayHandler(day: number) {
      const newDate = this.$dayjs(this.dummyDate)
        .date(day)
        .format("YYYY-MM-DD[T]HH:mm:ss");
      this.dummyDate = newDate;
      this.selectItemHandler(newDate);
    },
    checkClickOutsideHandler(e: MouseEvent) {
      const container = this.$refs[`select-${this.name}`] as HTMLDivElement;

      if (container && e.target) {
        if (
          e.target !== container &&
          !container.contains(e.target as HTMLElement)
        ) {
          this.dateCalendarShown = false;
        }
      }
    },
  },
  mounted() {
    this.dummyDate = this.modelValue || new Date();
    window.addEventListener("click", this.checkClickOutsideHandler);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.checkClickOutsideHandler);
  },
});
</script>

  
<style scoped>
.container-date {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  top: calc(100% + 5px)
}
</style>