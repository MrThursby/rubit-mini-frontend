<template>
  <div class="flex items-start gap-4">
    <div class="w-5 py-px my-px flex-shrink-0">
      <img v-if="status === 'loading'" class="animate-spin" src="~assets/icons/loader.svg" alt="Проверка">
      <img v-else-if="status === 'completed'" src="~assets/icons/completed.svg" alt="Шаг завершён">
      <img v-else-if="status === 'error'" src="~assets/icons/error.svg" alt="Время истекло">
      <img v-else src="~assets/icons/point.svg" alt="Ожидание">
    </div>
    <div class="font-semibold text-primary-2">
      <template v-if="status !== 'completed' && status !== 'error'">
        <slot />
      </template>
      <div v-if="status === 'completed'">
        <slot name="completed" />
      </div>
      <div v-if="status === 'error'">
        <slot name="error" />
      </div>
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
