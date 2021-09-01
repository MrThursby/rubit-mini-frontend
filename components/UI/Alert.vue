<template>
  <div class="flex items-start gap-4">
    <div class="w-5 h-5 py-px my-px flex-shrink-0">
      <img v-if="type === 'info'" src="~assets/icons/info.svg" alt="Информация">
    </div>
    <div class="font-semibold text-non-active">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    type: { type: String, default: 'info' }
  }
}
</script>

<style scoped>

</style>
