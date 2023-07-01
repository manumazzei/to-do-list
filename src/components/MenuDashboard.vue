<template>
  <div>
    <v-app-bar app fixed color="white">
      <v-btn icon @click="apareceBarra">
        <v-icon color="indigo" style="font-size: 34px">mdi-menu-open</v-icon>
      </v-btn>

      <v-sheet class="d-inline-flex ml-6">
        <router-link to="/">
          <v-icon
            icon="mdi-list-box"
            color="indigo"
            style="text-decoration: none"
            size="x-large"
            class="mt-2"
          />
        </router-link>
        <strong class="mt-2 ml-2" style="font-size: 25px">To do list</strong>
      </v-sheet>

      <v-sheet class="ml-4" style="width: 70%"></v-sheet>

      <v-sheet class="d-flex justify-space-between ml-16" style="width: 10%">
        <v-btn disabled icon
          ><v-icon class="mdi mdi-help-circle-outline mt-2"></v-icon
        ></v-btn>
        <v-btn disabled icon
          ><v-icon class="mdi mdi-bell-outline mt-2"></v-icon
        ></v-btn>
        <v-btn @click="showLogOut = !showLogOut"
          ><v-icon class="mdi mdi-logout mt-4" size="large"></v-icon
        ></v-btn>

        <v-avatar class="mt-2 ml-2">
          <v-img
            src="/horacio-poeta.jpg"
            contain
            class="rounded-circle"
          ></v-img>
        </v-avatar>
      </v-sheet>
    </v-app-bar>

    <v-dialog v-model="showLogOut" max-width="400px">
      <v-card>
        <v-card-title class="font-weight-bold text-h5 text-danger"
          >Log Out</v-card-title
        >
        <v-card-text>Tem certeza que deseja sair?</v-card-text>
        <v-card-actions>
          <v-btn @click="showLogOut = false">Cancelar</v-btn>
          <v-btn @click="startLogOut" color="error">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    rail: {
      type: Boolean,
    },
  },
  data() {
    return {
      rail: false,
      showLogOut: false,
    };
  },
  methods: {
    openLeftDashboard() {},
    startLogOut() {
      localStorage.removeItem("access_token");
      this.showLogOut = false;
      location.replace("/");
    },
    apareceBarra() {
      this.rail = !this.rail;
      console.log("passei aqui");
      this.$emit("openMenu");
      console.log("deveria ter emitido os 2");
    },
  },
};
</script>
