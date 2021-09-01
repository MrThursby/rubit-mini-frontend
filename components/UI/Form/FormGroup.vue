<template>
  <div class="block">
    <label
      :for="labelFor"
      class="block mb-4 font-semibold text-primary-2"
      v-if="label !== null"
    >{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    labelFor: { type: String },
    label: { type: String }
  }
}
</script>

<style scoped>

</style>
