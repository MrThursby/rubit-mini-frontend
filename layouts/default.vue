<template>
  <div>
    <app-header class="mb-10" />
    <main>
      <container>
        <nuxt />
      </container>
    </main>
  </div>
</template>

<script>
import Container from "../components/Layout/Container";
import AppHeader from "../components/Layout/Header/AppHeader";
export default {
  name: "default",
  components: {AppHeader, Container}
}
</script>

<style scoped>

</style>
