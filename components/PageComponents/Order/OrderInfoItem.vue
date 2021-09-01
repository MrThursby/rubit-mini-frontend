<template>
  <div class="flex items-start mb-5">
    <div class="w-2/5 font-semibold text-non-active">{{ item.title }}</div>
    <div
      class="w-3/5 font-semibold text-primary-2 break-all"
      :class="{'underline': underline}"
    >{{ item.value }}</div>
  </div>
</template>

<script>
export default {
  name: "OrderInfoItem",
  props: {
    item: { type: Object, required: true },
    underline: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>
