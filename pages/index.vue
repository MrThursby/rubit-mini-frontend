<template>
  <div>
    <h1 class="text-primary text-2xl md:text-center font-semibold mb-10">
      Обменяйте рубли на криптовалюту всего за несколько минут
    </h1>
    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
      <form @submit="submit">
        <form-group class="mb-10">
          <div class="flex justify-between items-center h-12">
            <span class="font-semibold text-primary-2">Способ оплаты</span>
            <app-select
              @input="validatePaymentMethod"
              value-field="id"
              v-model="form.paymentMethod"
              class="w-48"
              :options="config.typePayment"
            />
          </div>
          <form-errors-list :errors="errors.paymentMethod" />
        </form-group>

        <form-group
          class="mb-10"
          label="Отдаёте"
          label-for="input-output"
        >
          <input-group
            @input="e => { calcGet(); validatePut(e); validateSum();}"
            v-model.number="put"
            :invalid="errors.put.length !== 0"
            max-length="20"
            input-type="text"
            input-id="input-output"
          >
            <label
              for="input-output"
              class="pr-4 font-semibold text-primary-2 z-0"
            >руб.</label>
          </input-group>
          <form-errors-list :errors="errors.put" />
        </form-group>

        <form-group
          class="mb-10"
          label="Получаете"
          label-for="input-input"
        >
          <input-group
            v-model.number="form.get"
            :invalid="errors.sum.length !== 0 || errors.typeCrypto.length !== 0"
            @input="() => {calcPut(); validateSum(); validatePut();}"
            max-length="20"
            input-type="text"
            input-id="input-input"
          >
            <app-select
              value-field="id"
              @input="() => {calcGet(); validateTypeCrypto(); validateSum(); validatePut();}"
              uppercase
              v-model="form.currency"
              :options="config.configBtc.coins"
              sm
            ></app-select>
          </input-group>
          <form-errors-list :errors="errors.sum.concat(errors.typeCrypto)" />
        </form-group>

        <div class="text-non-active mb-10">
          1 {{ config.configBtc.coins[form.currency].title.toUpperCase() || '' }} =
          {{ config.configBtc.coins[form.currency].exchange_rates }} (вкл. комиссию сервиса)
        </div>

        <form-group class="mb-10" label="Адрес кошелька" label-for="wallet-address">
          <app-input
            id="wallet-address"
            @input="errors.wallet = []"
            v-model="form.wallet_address"
            :invalid="errors.wallet.length !== 0"
            placeholder="Введите адрес вашего кошелька"
          />
          <form-errors-list :errors="errors.wallet" />
        </form-group>

        <form-group class="flex flex-col items-center mb-10">
          <recaptcha @success="errors['g-recaptcha-response'] = []" />

          <form-errors-list :errors="errors['g-recaptcha-response']" />
        </form-group>

        <form-group class="flex justify-center mb-10">
          <app-button
            :disabled="submitBtnDisabled || loading"
            tag="button"
            type="submit"
            lg
          >Обменять</app-button>
        </form-group>
      </form>
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
import FormErrorsList from "../components/UI/Form/FormErrorsList";
export default {
  name: 'Index',
  async fetch({store}) {
    await store.dispatch('fetchConfig');
  },
  data() {
    return {
      loading: false,
      put: 400,
      form: {
        currency: 0,
        paymentMethod: null,
        get: null,
        wallet_address: null,
      },
      errors: {
        paymentMethod: [],
        typeCrypto: [],
        sum: [],
        wallet: [],
        put: [],
        'g-recaptcha-response': [],
      }
    }
  },
  methods: {
    validatePaymentMethod() {
      this.errors.paymentMethod = []
      if(!this.config.typePayment[this.form.paymentMethod]){
        this.errors.paymentMethod.push('Выберите один из доступных способов оплаты')
      }
    },
    validateTypeCrypto() {
      this.errors.typeCrypto = []
      if(!this.config.configBtc.coins[this.form.currency]){
        this.errors.typeCrypto.push('Выберите одну из доступных криптоволют')
      }
    },
    validateSum() {
      this.errors.sum = []
      const coin_name = this.config.configBtc.coins[this.form.currency].title.toUpperCase()

      const max = this.config.configBtc.coins[this.form.currency].max
      if(this.form.get > max){
        this.errors.sum.push(`Максимально возможный заказ составляет ${max} ${coin_name}`)
      }

      const min = this.config.configBtc.coins[this.form.currency].min
      if(this.form.get < min){
        this.errors.sum.push(`Минимально возможный заказ составляет ${min} ${coin_name}`)
      }
    },
    validatePut() {
      this.errors.put = []
      const max = this.config.configBtc.coins[this.form.currency].max_rub
      if(this.put > max){
        this.errors.put.push(`Максимальная сумма - ${max} руб.`)
      }

      const min = this.config.configBtc.coins[this.form.currency].min_rub
      if(this.put < min){
        this.errors.put.push(`Минимальная сумма - ${min} руб.`)
      }
    },

    submit(e) {
      e.preventDefault()

      console.log(this.$recaptcha)
      this.loading = true

      let formData = new FormData()
      formData.append('typeCrypto', (this.form.currency + 1).toString())
      formData.append('paymentMethod', this.form.paymentMethod)
      formData.append('sum', this.form.get)
      formData.append('wallet', this.form.wallet_address)

      this.$recaptcha.getResponse()
        .then(token => {
          formData.append('g-recaptcha-response', token)
        })
        .catch(() => {
          this.errors["g-recaptcha-response"].push('Пожалуйста, пройдите капчу')
        })

      if(this.submitBtnDisabled ){
        this.loading = false
        return false;
      }

      this.$axios.post('/api/order/store', formData)
        .then(r => {
          this.loading = false
          this.$router.push(`/order/${r.data.hash}`)
        })
        .catch(e => {
          this.loading = false
          if(e.response.status === 422){
            if(e.response.data.errors.paymentMethod){
              this.errors.paymentMethod.push('Выберите способ оплаты из списка')
            }
            if(e.response.data.errors.sum){
              this.errors.sum.push('')
            }
            if(e.response.data.errors["g-recaptcha-response"]){
              this.errors["g-recaptcha-response"].push('Обновите страницу и повторите попытку')
            }
            if(e.response.data.errors.typeCrypto){
              this.errors.typeCrypto.push('')
            }
          } else {
            this.errors.wallet.push('Невалидный адрес кошелька')
          }
        })
      this.$recaptcha.reset()
    },
    calcGet() {
      const exchange_rate = this.config.configBtc.coins[this.form.currency].exchange_rates
      const percent_comission = this.config.configBtc.percent_comission
      const put = this.put

      this.form.get = (put / exchange_rate) - ( (put / exchange_rate) * (percent_comission / 100) )
    },
    calcPut() {
      const exchange_rate = this.config.configBtc.coins[this.form.currency].exchange_rates
      const percent_comission = this.config.configBtc.percent_comission
      const get = this.form.get

      this.put = get / (1 - (percent_comission / 100)) * exchange_rate
    },
  },
  computed: {
    config() {
      return this.$store.getters['config']
    },
    submitBtnDisabled() {
      for (let errorsKey in this.errors) {
        if(this.errors[errorsKey].length !== 0) {
          return true;
        }
      }

      return false;
    }
  },
  components: {FormErrorsList, FormGroup, AppButton, AppSelect, AppInput, LabelSelect, InputGroup}
}
</script>
