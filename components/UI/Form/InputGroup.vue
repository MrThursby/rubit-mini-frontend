<template>
  <div
    class="flex rounded border items-center px-1"
    :class="focused ? 'border-primary' : 'border-non-active-2'"
  >
    <input class="w-full h-12 outline-none px-3 bg-transparent"
           :disabled="disabled"
           @focusin="focused = true"
           @focusout="focused = false"
           :id="inputId"
           :placeholder="inputPlaceholder"
           :type="inputType"
           :value="inputValue"
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
    inputId: { type: String },
    inputType: { type: String, default: "text" },
    inputValue: null,
    inputPlaceholder: { type: String },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>
