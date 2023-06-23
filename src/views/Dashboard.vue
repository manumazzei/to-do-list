<template>
  <v-form @submit.prevent="createList">
    <v-text-field
      :loading="loading"
      v-model="listTitle"
      label="Criar nova lista"
    ></v-text-field>
    <v-btn @click="createList" :loading="loading">Criar</v-btn>
  </v-form>

  <v-card v-for="list in toDoLists" :key="list.id">
    <router-link :to="`/list-detail/${list.id}`">
      <v-card-title>{{ list.title }}</v-card-title>
    </router-link>
  </v-card>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      toDoLists: [],
      listTitle: "",
      loading: false,
    };
  },
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data;
      } catch (err) {
        alert("Algo deu errado");
      }
    },
    async createList() {
      try {
        this.loading = true;
        const title = {
          title: this.listTitle,
        };
        const { data } = await this.create(title);
        this.toDoLists.push(data);
      } catch (err) {
        console.log(err);
      } finally {
        this.listTitle = "";
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
