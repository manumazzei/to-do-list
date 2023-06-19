<template>
   <div class="d-flex justify-center align-center">
    <div class="d-flex justify-space-between w-50" style="height: 80px"> 
         <div class="d-flex justify-center align-center">
            <router-link to="/">
            <v-icon icon="mdi-list-box" color="indigo" style="text-decoration: none;" size="x-large"/>
          </router-link> 
          <h3>To do list</h3>
         </div> 

        <div class="d-flex justify-center align-center w-50" style="text-decoration: none;">
         
         <p class="mr-3">Don't have an account?</p>
         <router-link to="/register">
                <v-btn variant="text" size="x-small" style="color: indigo">
                Sign up for free
                </v-btn>
            </router-link>
        </div>  
      </div>
   </div> 

</template>

<script setup>
</script>