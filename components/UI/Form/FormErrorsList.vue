<template>
  <div class="mt-1">
    <div
      v-for="(error, index) of errors"
      class="text-red text-sm font-semibold"
      :key="index"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FormErrorsList",
  props: {
    errors: { type: Array, default: []}
  }
}
</script>

<style scoped>

</style>
