<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
       <router-link to="/register">
        <v-btn height="72" min-width="164">
          Register
        </v-btn>
       </router-link> 
      </v-col>

      <v-col cols="auto">
       <router-link to="/login">
        <v-btn height="72" min-width="164">
          Login
        </v-btn>
       </router-link> 
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
  //
</script>

<style scoped>
.card{
  background: rgb(248, 248, 248);
}

.custom{
  width: 80%;
  height: 800px;
  background: lightblue;
}
.row {
  background: lightblue;
  height: 400px;
}
.v-col {
  background: whitesmoke;
  border: 1px solid white;
}

</style>
