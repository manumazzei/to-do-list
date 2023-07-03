<template>
  <router-view />
</template>

<script>
  import { setupPrivateApi } from "./api";
  export default {
    mounted() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        this.$router.push("/login");
        return;
      }
      setupPrivateApi(token);
    },
  };
</script>

<style>
   :any-link{
        text-decoration: none;
    }
</style>
