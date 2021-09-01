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
        <order-info-item :item="{ title: 'Способ оплаты', value: 'Тинькофф' }" />
        <order-info-item :item="{ title: 'Отдаёте', value: '300 руб.' }" />
        <order-info-item :item="{ title: 'Получаете', value: '0.00013214 BTC' }" />
        <order-info-item
          underline :item="{ title: 'Адрес кошелька', value: '1CM8J8p6EccV2MaT4gRxBNBWFefVDrVrHp' }" />
      </div>

      <div>
        <order-step status="loading" :opened="true" class="mb-10">
          <div class="mb-5 last:mb-0">
            Отправьте <span class="underline font-bold">300</span> руб. через «<span class="font-bold">Тинькофф</span>»
            по указанным реквезитам в течении 3 часов.
          </div>

          <template v-slot:closed>
            <input-group
              disabled
              class="mb-10"
              input-value="1234 6344 1245 9854"
            ><app-button title="Скопировать" class="w-10" no-paddings secondary>
              <img src="~assets/icons/copy.svg" alt="Copy">
            </app-button></input-group>
            <div class="flex justify-center">
              <app-button lg>Подтвердить оплату</app-button>
            </div>
          </template>
        </order-step>
        <order-step class="mb-10">Проверка платежа</order-step>
        <order-step class="mb-10">Отправка монет на ваш кошелёк</order-step>

        <alert>
          Скопируйте ссылку на данную страницу,
          чтобы проверить статус обмена позже
        </alert>
      </div>
    </div>
  </div>
</template>

<script>
import OrderInfoItem from "../components/PageComponents/Order/OrderInfoItem";
import InputGroup from "../components/UI/Form/InputGroup";
import AppButton from "../components/UI/AppButton";
import OrderStep from "../components/PageComponents/Order/OrderStep";
import Alert from "../components/UI/Alert";
export default {
  name: "Order",
  data: () => ({
    fsOpened: false,
  }),
  components: {Alert, OrderStep, AppButton, InputGroup, OrderInfoItem}
}
</script>

<style scoped>

</style>
