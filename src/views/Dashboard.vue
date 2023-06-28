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
    <v-list-item>
      <router-link :to="`/list-detail/${list.id}`">
        <v-card-title>{{ list.title }}</v-card-title>
      </router-link>

      <template v-slot:append>
        <v-icon @click="startRemove(list.id)" color="error">
          mdi-delete
        </v-icon>
      </template>
    </v-list-item>
  </v-card>

  <v-card v-show="showRemove">
    <v-card-title class="font-weight-bold text-h5 text-error"
      >Deletar</v-card-title
    >
    <v-card-text>Tem certeza que deseja excluir?</v-card-text>

    <v-card-actions>
      <v-btn
        :loading="removeLoad"
        @click="removeList(this.selected)"
        color="error"
        >Deletar</v-btn
      >
      <v-btn @click="showRemove = !showRemove">Cancelar</v-btn>
    </v-card-actions>
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
      showRemove: false,
      selected: "",
      removeLoad: false,
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
    startRemove(id) {
      this.selected = id;
      this.showRemove = true;
    },
    async removeList(id) {
      try {
        this.removeLoad = true;
        await this.remove(id);
        this.toDoLists = this.toDoLists.filter((item) => item.id !== id);
      } catch (err) {
        console.log(err);
      } finally {
        this.showRemove = false;
        this.removeLoad = false;
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
