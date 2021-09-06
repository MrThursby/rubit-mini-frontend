<template>
  <component
    @click="$emit('click')"
    :type="type"
    :is="tag" :to="to"
    class="flex items-center justify-center rounded text-white h-10"
    :class="{
      'rounded-full h-12 px-6': lg,
      'rounded h-10': !lg,
      'bg-secondary text-primary-2 font-semibold': secondary,
      'bg-primary': !secondary,
      'px-4': !noPaddings,
      'bg-opacity-80': disabled
    }"
    :disabled="disabled"
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
    type: { type: String, default: null },
    secondary: {type: Boolean, default: false},
    lg: {type: Boolean, default: false},
    to: {type: String},
    title: {type: String},
    noPaddings: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
  }
}
</script>

<style scoped>

</style>
