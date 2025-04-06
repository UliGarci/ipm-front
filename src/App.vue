<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script>
import themeOverrides from "@/assets/naive-ui-theme-overrides.json";

export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      themeOverrides
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* TEXTO CENTRADO ELIMINADO POR CENTRAR TODO EL TEXTO DE LOS INPUTS Y LAS VISTAS */
  color: #2c3e50;
  /* margin-top: 60px; */
  /* MARGEN ELIMINADO POR DESING MAL ESTRUCTURADO */
}
</style>