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
        <v-icon @click="startEdit(list)"> mdi-pencil </v-icon>
        <v-icon @click="startRemove(list.id)" color="error">
          mdi-delete
        </v-icon>
      </template>
    </v-list-item>
  </v-card>

  <v-card v-show="showModal">
    <v-card-title class="font-weight-bold text-h5 text-error"
      >Deletar</v-card-title
    >
    <v-card-text>Tem certeza que deseja excluir?</v-card-text>

    <v-card-actions>
      <v-btn @click="showModal = !showModal" color="error">Cancelar</v-btn>
      <v-btn :loading="removeLoad" @click="removeList(this.selected)"
        >Deletar</v-btn
      >
    </v-card-actions>
  </v-card>

  <v-card v-show="showEdit">
    <v-card-title class="font-weight-bold text-h5">Editar</v-card-title>
    <v-form @submit.prevent="updateList(this.selected)">
      <v-text-field v-model="editTitle"></v-text-field>
    </v-form>

    <v-card-actions>
      <v-btn @click="showEdit = !showEdit">Cancelar</v-btn>
      <v-btn
        :loading="editLoad"
        @click="updateList(this.selected)"
        color="warning"
        >Editar</v-btn
      >
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
      showModal: false,
      showEdit: false,
      selected: "",
      removeLoad: false,
      editTitle: "",
      editLoad: false,
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
      this.showModal = true;
    },
    async removeList(id) {
      try {
        this.removeLoad = true;
        await this.remove(id);
        this.toDoLists = this.toDoLists.filter((item) => item.id !== id);
      } catch (err) {
        console.log(err);
      } finally {
        this.showModal = false;
        this.removeLoad = false;
      }
    },
    startEdit(list) {
      this.selected = list.id;
      this.editTitle = list.title;
      this.showEdit = true;
    },
    async updateList(id) {
      try {
        this.editLoad = true;
        const title = {
          title: this.editTitle,
        };
        await this.update(id, title);
        this.getLists();
      } catch (err) {
        console.log(err);
      } finally {
        this.showEdit = false;
        this.editLoad = false;
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
