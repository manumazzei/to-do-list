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

  <div v-for="item in items" :key="item.id">
    <h3>{{ item.title }}</h3>
  </div>
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
  },
  mounted() {
    this.getItems();
  },
};
</script>
