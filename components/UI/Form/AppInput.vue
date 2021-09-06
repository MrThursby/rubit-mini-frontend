<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="rounded border items-center w-full h-12 outline-none px-4"
    :class="{
      'border-red': invalid,
      'border-non-active-2 focus:border-primary': !invalid
    }"
    type="text"
  />
</template>

<script>
export default {
  name: "AppInput",
  props: {
    value: null,
    invalid: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>
