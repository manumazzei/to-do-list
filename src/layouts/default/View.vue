<template>
  <v-main>
    <router-view @openMenu="abreMenu" :rail="rail"/>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      mostraMenu: false,
      rail: true,
    };
  },
  methods: {
    abreMenu() {
      this.rail = !this.rail;
    },
  },
};
</script>
