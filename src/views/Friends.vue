<template>

<menu-dashboard @openMenu="$emit('openMenu')" :rail="rail"></menu-dashboard>
<left-dashboard @openMenu="$emit('openMenu')" :rail="rail"></left-dashboard>

<v-main style="background-color: whitesmoke; height: 1000px;">
    <p style="margin-top: -45px;background-color: #fffcdc; border: 1px solid #e9e082; font-family: Arial, Helvetica, sans-serif; height: 5%; width: 90%"
        class="d-flex align-center pl-8">Here you find and connect with your friends!</p>
            <v-card class=" h-75 w-50 mt-8 elevation-12">
            <strong class="mt-4 d-flex justify-center align-center" style="font-family: Poppins;">Find your friend by username</strong>
                <v-form>
                    <v-sheet class="d-inline-flex align-center w-100 mt-6">
                        <v-text-field 
                    class="w-75 ml-6 mt-6"
                    :loading="loading"
                    single-line
                    hide-details
                    density="compact"
                    variant="solo"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn disabled color="indigo"><v-icon size="large" class="mdi mdi-magnify mt-6"></v-icon></v-btn>
                    </v-card-actions>
                    </v-sheet>
                </v-form>

            <v-sheet class="mt-6 h-100 ml-12">
                <v-sheet class="d-inline-flex justify-space-between w-75 ml-12 mt-12">
                    <v-avatar size="150px"><v-img alt="Avatar"  src="/FreeVector-Cars-Character_Cars-Character.jpg"></v-img></v-avatar>
                    <v-avatar size="150px"><v-img alt="Avatar"  src="/FreeVector-Christmas-Minnie-Mouse.jpg"></v-img></v-avatar>
                    <v-avatar size="150px"><v-img alt="Avatar"  src="/FreeVector-FreeVector-Piglet-Vector.jpg"></v-img></v-avatar>
                </v-sheet>
                <v-sheet class="d-inline-flex justify-space-between w-75 mt-12 ml-12">
                    <v-avatar size="150px"><v-img alt="Avatar"  src="/FreeVector-FreeVector-Sulley.jpg"></v-img></v-avatar>
                    <v-avatar size="150px"><v-img alt="Avatar"  src="/FreeVector-Winnie-The-Pooh-Rabbit.jpg"></v-img></v-avatar>
                    <v-avatar size="150px"><v-img alt="Avatar"  src="/FreeVector-Winnie-The-Pooh-Tiger.jpg"></v-img></v-avatar>
                </v-sheet>
                
                    
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