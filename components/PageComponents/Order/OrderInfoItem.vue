<template>
  <div class="flex items-start mb-5">
    <div class="w-2/5 font-semibold text-non-active">{{ title }}</div>
    <div
      class="w-3/5 font-semibold text-primary-2 break-all"
      :class="{'underline': underline}"
    >{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: "OrderInfoItem",
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    underline: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>
