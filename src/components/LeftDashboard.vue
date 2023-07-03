<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-navigation-drawer :rail="newRail" permanent>
        <v-list dense nav>
          <router-link to="/Dashboard" class="link-item">
            <v-list-item
              prepend-icon="mdi-home-city"
              title="My lists"
              value="home"
              class="link-item-content"
            ></v-list-item>
          </router-link>

          <router-link to="/Account" class="link-item" v-if="isAccountLinkEnabled">
            <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
              class="link-item-content"
            ></v-list-item>
          </router-link>

          <router-link to="/Friends" class="link-item">
            <v-list-item
              prepend-icon="mdi-account-group-outline"
              title="Make friends"
              value="users"
              class="link-item-content"
            ></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-col>
  </v-row>
</template>

<style>
.link-item {
  text-decoration: none;
}

.link-item-content {
  text-decoration: none !important;
}
</style>

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
      isAccountLinkEnabled: false, 
    };
  },
  updated() {
    this.newRail = this.$props.rail;
  },
};
</script>



