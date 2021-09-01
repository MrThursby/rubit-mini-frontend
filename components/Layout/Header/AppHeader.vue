<template>
  <header class="border-non-active-2 border-b">
    <container class="flex justify-between items-center h-20">
      <div>
        <nuxt-link to="/">
          <app-logo />
        </nuxt-link>
      </div>
      <div>
        <app-button tag="a" href="https://t.me/mrthursby">
          <img class="w-5 mr-2" src="~/assets/telegram-logo.svg" alt="Связаться с поддержкой">
          Связаться с поддержкой
        </app-button>
      </div>
    </container>
  </header>
</template>

<script>
import Container from "../Container";
import AppButton from "../../UI/AppButton";
import AppLogo from "../../UI/AppLogo";
export default {
  name: "AppHeader",
  components: {AppLogo, AppButton, Container}
}
</script>

<style scoped>

</style>
