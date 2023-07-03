<template>

    <menu-dashboard @openMenu="$emit('openMenu')" :rail="rail"></menu-dashboard>
    <left-dashboard @openMenu="$emit('openMenu')" :rail="rail"></left-dashboard>
    
    <v-main style="background-color: whitesmoke; height: 1000px;">
        <p style="margin-top: -45px;background-color: #fffcdc; border: 1px solid #e9e082; font-family: Arial, Helvetica, sans-serif; height: 5%; width: 90%"
        class="d-flex align-center pl-8">Here you access your account information!</p>

        <v-card class="h-75 w-50 mt-8 elevation-12">
            <v-sheet class="w-100 mt-4 ml-4">
                <v-avatar size="150px"><v-img alt="Avatar"  src="/horacio-poeta.jpg"></v-img></v-avatar>
            </v-sheet>
            
        </v-card>
    </v-main>
    
    </template>
    
    <script>
    import MenuDashboard from "@/components/MenuDashboard.vue";
    import LeftDashboard from "@/components/LeftDashboard.vue";
    
    export default {
      components: {
        MenuDashboard,
        LeftDashboard,
      },
      props: {
        rail: {
          type: Boolean,
        },
      },
      data() {
        return {
    
        };
      },
    }
    </script>
