<template>
  <div>
    <h1 class="text-primary text-2xl md:text-center font-semibold mb-10">
      Обменяйте рубли на криптовалюту всего за несколько минут
    </h1>
    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">

      <div class="flex justify-between items-center h-12 mb-10">
        <span class="font-semibold text-primary-2">Способ оплаты</span>
        <app-select class="w-48" :options="[
          { value: 1, title: 'Любой банк РФ' },
          { value: 2, title: 'С карты на карту' },
          { value: 3, title: 'Сбербанк' },
          { value: 4, title: 'Альфа-Банк' },
          { value: 5, title: 'Тинькофф' },
          { value: 6, title: 'ВТБ-24' },
          { value: 7, title: 'QIWI' },
          { value: 8, title: 'ЮMoney' },
          { value: 9, title: 'WebMoney' },
          { value: 10, title: 'Мобильная свзяь' },
        ]" />
      </div>

      <form-group
        class="mb-10"
        label="Отдаёте"
        label-for="input-output"
      >
        <input-group
          input-type="text"
          input-value="300"
          input-id="input-output"
        >
          <label
            for="bankroll-address"
            class="pr-4 font-semibold text-primary-2"
          >руб.</label>
        </input-group>
      </form-group>

      <form-group
        class="mb-10"
        label="Получаете"
        label-for="input-input"
      >
        <input-group
          input-type="text"
          input-value="0.00013214"
          input-id="input-input"
        >
          <app-select sm :options="[
          { value: 1, title: 'BTC'},
          { value: 2, title: 'ITC'},
        ]"></app-select>
        </input-group>
      </form-group>

      <div class="text-non-active mb-10">1 BTC = '' (вкл. комиссию сервиса)</div>

      <form-group label="Адрес кошелька" label-for="bankroll-address">
        <app-input
          class="mb-10"
          id="bankroll-address"
          placeholder="Введите адрес вашего кошелька"
        />
      </form-group>

      <form-group class="flex justify-center mb-10">
        <app-button tag="button" lg>Обменять</app-button>
      </form-group>

    </div>
  </div>
</template>

<script>
import InputGroup from "../components/UI/Form/InputGroup";
import LabelSelect from "../components/UI/Form/LabelSelect";
import AppInput from "../components/UI/Form/AppInput";
import AppSelect from "../components/UI/Form/AppSelect";
import AppButton from "../components/UI/AppButton";
import FormGroup from "../components/UI/Form/FormGroup";
export default {
  name: 'Index',
  components: {FormGroup, AppButton, AppSelect, AppInput, LabelSelect, InputGroup}
}
</script>
