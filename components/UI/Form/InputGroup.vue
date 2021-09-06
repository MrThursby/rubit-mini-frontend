<template>
  <div
    class="flex rounded border items-center px-1"
    :class="{
      'border-primary': focused && !invalid,
      'border-non-active-2': !focused && !invalid,
      'border-red': invalid
    }"
  >
    <input class="w-full h-12 outline-none px-3 bg-transparent"
           :value="value"
           :min="min"
           :max="max"
           :maxlength="maxLength"
           @input="$emit('input', $event.target.value)"
           :disabled="disabled"
           @focusin="focused = true"
           @focusout="focused = false"
           :id="inputId"
           :placeholder="inputPlaceholder"
           :type="inputType"
    >
    <slot />
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  data: () => ({
    focused: false
  }),
  props: {
    value: null,
    invalid: { type: Boolean, default: false },
    inputId: { type: String },
    inputType: { type: String, default: "text" },
    inputValue: null,
    min: null,
    max: null,
    maxLength: null,
    inputPlaceholder: { type: String },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>
