<template>
  <div class="mb-10">
    <div class="mb-10">
      <ul class="text-sm text-non-active font-semibold flex gap-5">
        <li><nuxt-link to="/">Главная</nuxt-link></li>
        <li class="text-primary-2"><nuxt-link to="/order">Обмен #15</nuxt-link></li>
      </ul>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
      <div class="pl-9 mb-10">
        <order-info-item title="Способ оплаты" value="Тинькофф" />
        <order-info-item title="Отдаёте" :value="`${order.invoice.total_amount} руб.`" />
        <order-info-item
          title="Получаете"
          :value="`${order.invoice.bitcoin} ${order.invoice.coin.toUpperCase()}`"
        />
        <order-info-item
          underline title="Адрес кошелька" :value="order.invoice.address.toUpperCase()" />
      </div>

      <div>
        <order-step :status="payingStepStatus"
                    :opened="!checkingBuy && order.invoice.status === 'created'" class="mb-10">
          <div class="mb-5 last:mb-0">
            Отправьте <span class="underline font-bold">{{ order.invoice.total_amount }}</span>
            руб. через «<span class="font-bold">Тинькофф</span>»
            по указанным реквезитам в течении 3 часов.
          </div>

          <template v-slot:completed>
            Отправка платежа подтверждена
          </template>

          <template v-slot:error>
            Время для оплаты заказа истекло
          </template>

          <template v-slot:closed>
            <input-group
              disabled
              class="mb-10"
              v-model="order.invoice.card_number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()"
            ><app-button v-clipboard="order.invoice.card_number" title="Скопировать" class="w-10" no-paddings secondary>
              <img src="~assets/icons/copy.svg" alt="Copy">
            </app-button></input-group>
            <div class="flex justify-center">
              <app-button @click="startCycleFetch" lg>Подтвердить оплату</app-button>
            </div>
          </template>
        </order-step>

        <order-step
          v-if="order.invoice.status !== 'expired'"
          :status="checkingStepStatus" class="mb-10"
        >
          Проверка платежа

          <template v-slot:completed>
            Платёж проверен
          </template>
        </order-step>

        <order-step
          v-if="order.invoice.status !== 'expired'"
          :status="pendingStepStatus" class="mb-10"
        >
          Отправка монет на ваш кошелёк

          <template v-slot:completed>
            Монеты были зачислены на ваш кошелёк
          </template>
        </order-step>

        <alert>
          Скопируйте ссылку на данную страницу,
          чтобы проверить статус обмена позже
        </alert>
      </div>
    </div>
  </div>
</template>

<script>
import OrderInfoItem from "../../components/PageComponents/Order/OrderInfoItem";
import InputGroup from "../../components/UI/Form/InputGroup";
import AppButton from "../../components/UI/AppButton";
import OrderStep from "../../components/PageComponents/Order/OrderStep";
import Alert from "../../components/UI/Alert";
export default {
  name: "Order",
  async fetch({store, params}) {
    await store.dispatch('fetchOrder', params.hash);
  },
  methods: {
    reFetch() {
      this.$store.dispatch('reFetchOrder', this.$route.params.hash)
    },
    startCycleFetch() {
      do {
        setTimeout(this.reFetch, 20 * 1000)
      } while (this.cycleFetchOn === true)
    }
  },
  computed: {
    payingStepStatus() {
      if(this.checkingBuy ||
        this.order.invoice.status === 'completed' ||
        this.order.invoice.status === 'pending'){
        return 'completed'
      }

      if(this.order.invoice.status === 'expired') {
        return 'error'
      }

      return 'loading'
    },
    checkingStepStatus() {
      if(this.checkingBuy){
        return 'loading'
      }

      if(this.order.invoice.status === 'completed' || this.order.invoice.status === 'completed'){
        return 'completed'
      }

      return 'wait'
    },
    pendingStepStatus() {
      if(this.order.invoice.status === 'pending'){
        return 'loading'
      }

      if(this.order.invoice.status === 'completed' || this.order.invoice.status === 'completed'){
        return 'completed'
      }

      return 'wait'
    },
    order() {
      return this.$store.getters['order']
    },
    cycleFetchOn() {
      return this.$store.getters['cycleFetchOn']
    },
    checkingBuy() {
      return this.$store.getters['orderLoadingStatus']
    },
  },
  components: {Alert, OrderStep, AppButton, InputGroup, OrderInfoItem}
}
</script>

<style scoped>

</style>
