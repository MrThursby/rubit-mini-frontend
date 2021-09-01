<template>
  <div class="flex items-start gap-4">
    <div class="w-5 py-px my-px flex-shrink-0">
      <img v-if="status === 'wait'" src="~assets/icons/point.svg" alt="Ожидание">
      <img v-if="status === 'loading'" class="animate-spin" src="~assets/icons/loader.svg" alt="Проверка">
    </div>
    <div class="font-semibold text-primary-2">
      <slot />
      <div v-if="opened === true">
        <slot name="closed" />
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "../../UI/Form/InputGroup";
import AppButton from "../../UI/AppButton";
export default {
  name: "OrderStep",
  props: {
    status: { type: String, default: 'wait' },
    opened: { type: Boolean, default: false },
  },
  components: {AppButton, InputGroup}
}
</script>

<style scoped>

</style>
