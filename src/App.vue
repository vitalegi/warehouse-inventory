<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1 class="d-flex align-center">Inventario</h1>
      <v-spacer></v-spacer>
      <nav id="nav">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </nav>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      font-weight: bold;
      color: white;
    }
  }
}
</style>
