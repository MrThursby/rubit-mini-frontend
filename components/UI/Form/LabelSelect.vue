<template>
  <div class="flex justify-between items-center h-12">
    <span class="font-semibold text-primary-2">Способ оплаты</span>
    <app-select class="w-48" :id="id" :options="options" />
  </div>
</template>

<script>
import AppSelect from "./AppSelect";
export default {
  name: "LabelSelect",
  props: {
    options: { type: Array },
    id: { type: String, required: true }
  },
  components: {AppSelect}
}
</script>

<style scoped>

</style>
