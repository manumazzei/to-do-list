<template>
    <v-sheet class="w-100" style="background-color: white; height: 5%; border: 2px solid black">
        <v-icon icon="mdi mdi-menu-open" color="indigo" style="font-size: 69px;"></v-icon>
        
        <v-btn icon="mdi-list-box" color="indigo" style="font-size: 60px;" @click.stop="drawer = !drawer"></v-btn>
    </v-sheet>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
      }
    },
  }
</script>