<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-navigation-drawer :rail="newRail" permanent>
        <v-list dense nav>
         <router-link to="/Dashboard">
          <v-list-item
            prepend-icon="mdi-home-city"
            title="My lists"
            value="home"
          ></v-list-item>
         </router-link> 
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          ></v-list-item>

          <router-link to="/Friends">
            <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Make friends"
            value="users"
          ></v-list-item>
          </router-link>
         
        </v-list>
      </v-navigation-drawer>
    </v-col>
  </v-row>
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
      newRail: true,
    };
  },
  updated() {
    this.newRail = this.$props.rail;
  },
};
</script>
