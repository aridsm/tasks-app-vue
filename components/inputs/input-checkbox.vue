<template>
  <div>
    <Field
      v-slot="{ field, errorMessage }"
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
          :name="name"
          class="hidden"
          v-bind="field"
          :value="true"
          @input="$emit('update:modelValue', !field.checked)"
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
export default defineComponent({
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
});
</script>

<style></style>
