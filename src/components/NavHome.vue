<template>
  <div class="d-flex justify-center mt-4">
        <div class="d-flex justify-space-between align-center w-50">

    <div class="d-inline-flex">
      <router-link to="/">
        <v-icon icon="mdi-list-box" color="indigo" style="text-decoration: none;" size="x-large" class="mt-2"/>
      </router-link> 
      <p class="mt-2" style="font-size: 25px;">To do list</p>
    </div>


      <router-link to="/register">
        <v-btn
          color="indigo"
          type="submit"
          block
          class="mt-2"
          text="Start free"
        ></v-btn>
    </router-link> 

    <router-link to="/login">
      <v-btn
          color="indigo"
          type="submit"
          block
          class="mt-2"
          text="Login"
        ></v-btn>
    </router-link> 

    </div>
  </div>
    

</template>

<script setup>
  //
</script>

