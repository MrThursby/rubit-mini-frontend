<template>
  <component :is="tag"
    class="flex items-center bg-primary rounded text-white h-10 px-4"
    :class="{
      'rounded-full h-14 px-16': lg,
      'rounded h-10': !lg
    }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    tag: { type: String, default: 'button' },
    lg: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>
