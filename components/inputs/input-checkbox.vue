<template>
  <div>
    <Field
      v-slot="{ field, errorMessage }"
      v-model="value"
      :name="name"
      :id="name"
      type="checkbox"
      :rules="rules"
      :unchecked-value="false"
      :value="true"
      class="flex gap-2 items-center"
      validateOnInput
      validateOnMount
    >
      <label class="input-label cursor-pointer flex items-center">
        <input
          type="checkbox"
          class="hidden"
          v-bind="field"
          :name="name"
          data-type="input"
          @input="value = !field.checked"
        />
        <div
          class="border border-dark-text/[.4] rounded-sm w-6 h-6 grid place-items-center bg-light-100 dark:bg-dark-200"
        >
          <icon
            icon="fa-solid fa-square-check"
            class="h-4 w-4 transition"
            :class="{
              'opacity-100': field.checked,
              'opacity-0': !field.checked,
            }"
          />
        </div>
        {{ label }}
      </label>
      <text-error>{{ errorMessage }}</text-error>
    </Field>
  </div>
</template>

<script lang="ts">
import { Field } from "vee-validate";

export default {
  components: { Field },
  props: {
    modelValue: {
      type: undefined as any as PropType<null | boolean>,
      required: true,
    },
    name: { type: String, required: true },
    rules: { type: Object as any, default: undefined },
    label: { type: String, required: true },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string | number) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style></style>
