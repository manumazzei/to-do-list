<template>
  <h2>{{ listTitle }}</h2>
  <v-form @submit.prevent="handleCreate">
    <v-text-field
      v-model="itemTitle"
      :loading="loading"
      label="Digite uma tarefa"
    ></v-text-field>
    <v-btn @click="handleCreate" :loading="loading">Criar</v-btn>
  </v-form>

  <v-card v-for="item in items" :key="item.id">
    <v-list-item>
      <template v-slot:prepend>
        <v-checkbox-btn
          @click="updateItem(item)"
          v-model="item.done"
          color="grey"
        ></v-checkbox-btn>
      </template>

      <v-list-item-title>
        <span :class="item.done ? 'text-grey' : 'text-primary'">{{
          item.title
        }}</span>
      </v-list-item-title>

      <template v-slot:append>
        <v-expand-x-transition>
          <v-icon v-if="item.done" color="success"> mdi-check </v-icon>
        </v-expand-x-transition>
        <v-icon @click="startEdit(item)"> mdi-pencil </v-icon>
        <v-icon @click="startRemove(item.id)" color="error">
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
      <v-btn :loading="removeLoad" @click="removeItem(this.selected)"
        >Deletar</v-btn
      >
    </v-card-actions>
  </v-card>

  <v-card v-show="showEdit">
    <v-card-title class="font-weight-bold text-h5">Editar</v-card-title>
    <v-form @submit.prevent="editItem(this.selected)">
      <v-text-field v-model="editTitle"></v-text-field>
    </v-form>

    <v-card-actions>
      <v-btn @click="showEdit = !showEdit">Cancelar</v-btn>
      <v-btn
        :loading="editLoad"
        @click="editItem(this.selected)"
        color="warning"
        >Editar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import { itemsApiMixin } from "@/api/items";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin],
  data() {
    return {
      items: [],
      itemTitle: "",
      loading: false,
      listId: this.$route.params.id,
      listTitle: "",
      showModal: false,
      selected: "",
      removeLoad: false,
      showEdit: false,
      editTitle: "",
      editLoad: false,
    };
  },
  methods: {
    async getItems() {
      try {
        const { data } = await this.view(this.listId);
        this.items = data.items;
        this.listTitle = data.title;
      } catch (err) {
        alert("Algo deu errado");
      }
    },
    async handleCreate() {
      try {
        this.loading = true;
        const item = {
          title: this.itemTitle,
          deadline: "2012-01-26T13:51:50.417-07:00",
          listId: this.listId,
        };
        const { data } = await this.createItem(item);
        this.items.push(data);
      } catch (err) {
        console.log(err);
      } finally {
        this.itemTitle = "";
        this.loading = false;
      }
    },
    async updateItem(item) {
      try {
        item.done = !item.done;
        const status = {
          done: item.done,
        };
        await this.update(item.id, status);
      } catch (err) {
        console.log(err);
      }
    },
    async removeItem(id) {
      try {
        this.removeLoad = true;
        await this.remove(this.selected);
        this.items = this.items.filter((item) => item.id !== id);
      } catch (err) {
        console.log(err);
      } finally {
        this.showModal = false;
        this.removeLoad = false;
      }
    },
    startRemove(id) {
      this.selected = id;
      this.showModal = true;
    },
    startEdit(list) {
      this.selected = list.id;
      this.editTitle = list.title;
      this.showEdit = true;
    },
    async editItem(id) {
      try {
        this.editLoad = true;
        const title = {
          title: this.editTitle,
        };
        await this.update(id, title);
        this.getItems();
      } catch (err) {
        console.log(err);
      } finally {
        this.showEdit = false;
        this.editLoad = false;
      }
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>
