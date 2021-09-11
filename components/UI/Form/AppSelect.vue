<template>
  <div
    tabindex="0"
    class="relative min-w-max outline-none"
    @focus="focused = true"
    @blur="focused = false"
    ref="select"
  >
    <div
      class="bg-secondary cursor-pointer rounded px-4 flex gap-2 items-center justify-between border border-b-0 w-full"
      :class="{
        'border-transparent': !focused,
        'rounded-b-none border-primary': focused,
        'h-12': !sm,
        'h-10': sm
      }"
    >
      <span
          class="text-primary-2 font-semibold"
          :class="{'uppercase': uppercase}"
      >{{ options[selected].title || '' }}</span>
      <span
        class="transform transition duration-200"
        :class="{ 'rotate-180': focused }"
      ><img src="~static/arrow.svg" alt="Open" /></span>
    </div>
    <div
      class="absolute z-20 bg-white left-0 w-full border border-t-0 border-primary rounded-b"
      :class="sm ? 'top-10' : 'top-12'"
      v-show="focused"
    >
      <div
        class="pl-4 pr-10 h-12 flex items-center cursor-pointer text-primary-2 font-semibold"
        :class="{'uppercase': uppercase}"
        v-for="(option, index) of options"
        @click="() => selectItem(index)"
        :key="index"
      >{{ option.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSelect",
  data: () => ({
    selected: 0,
    focused: false,
  }),
  mounted() {
    this.$emit('input', 0)
  },
  methods: {
    selectItem(index) {
      this.selected = index
      this.$emit('input', index)
      this.$refs.select.blur()
    }
  },
  props: {
    options: null,
    sm: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>
