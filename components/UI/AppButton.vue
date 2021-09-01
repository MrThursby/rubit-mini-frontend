<template>
  <component
    :is="tag" :to="to"
    class="flex items-center justify-center rounded text-white h-10"
    :class="{
      'rounded-full h-12 px-6': lg,
      'rounded h-10': !lg,
      'bg-secondary text-primary-2 font-semibold': secondary,
      'bg-primary': !secondary,
      'px-4': !noPaddings
    }"
    :title="title"
  >
    <slot/>
  </component>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    tag: {type: String, default: 'button'},
    secondary: {type: Boolean, default: false},
    lg: {type: Boolean, default: false},
    to: {type: String},
    title: {type: String},
    noPaddings: {type: Boolean, default: false}
  }
}
</script>

<style scoped>

</style>
