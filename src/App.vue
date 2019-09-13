<template>
  <v-app>
    <v-content>
      <router-view> </router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    const shuqbara = JSON.parse(window.localStorage.getItem('shuqbara'))
    this.$store.dispatch('fromFile', shuqbara)
  }

};
</script>
