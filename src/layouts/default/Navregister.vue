<template>
    <div class="d-flex">
        <div style="height: 150px; width: 800px;" class="d-inline-flex ml-16">
         <div class="d-inline-flex w-50 pt-16 pl-12" style="font-size: 40px;text-decoration: none;">
        <router-link to="/">
            <v-icon icon="mdi-list-box" color="indigo" />
          </router-link> 
        <p style="font-family: Poppins;"><span>To do list</span></p>
        </div>

        <div class="d-flex justify-center align-center w-50 pt-14" style="text-decoration: none;">
         
         <p class="mr-4" style="font-size: 18px; font-family: Poppins;">Have an account?</p>
         <router-link to="/login">
                <v-btn variant="text" size="medium" style="color: indigo">
                Sign in
                </v-btn>
            </router-link>
        </div>  
    </div>
</div>
        
</template>

<script setup></script>