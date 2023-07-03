<template>
  <menu-dashboard @openMenu="$emit('openMenu')"></menu-dashboard>
  <left-dashboard @openMenu="$emit('openMenu')" :rail="rail"></left-dashboard>

  <v-main style="height: 950px; background-color: whitesmoke;">
    <v-sheet class="d-inline-flex justify-space-between w-75 h-75 ml-12" style="background-color: whitesmoke;">
      <v-card class="w-25 h-25 elevation-12">
        <v-sheet class="d-flex justify-center mt-4" style="font-family: Poppins; font-size: 20px">Create your items</v-sheet>
        <v-form @submit.prevent="handleCreate" class="mt-4">
          <v-text-field
            v-model="itemTitle"
            :loading="loading"
            single-line
            hide-details
            density="compact"
            variant="solo"
            class="w-75 ml-10"
          ></v-text-field>
          <v-sheet class="d-flex justify-center mt-4">
            <v-btn @click="handleCreate" :loading="loading" color="indigo" class="create-btn" :disabled="itemTitle === ''">Criar</v-btn>
          </v-sheet>
        </v-form>
      </v-card>

      <v-card class="w-50 ml-12 elevation-12" style="overflow-y: auto;">
        <h2 class="d-flex justify-center align-center mt-8" style="font-family: Poppins; color: indigo">{{ listTitle }}</h2>
        <v-card v-for="item in items" :key="item.id" style="width: 95%;" class="mt-4 ml-4">
          <v-list-item>
            <template v-slot:prepend>
              <v-checkbox-btn
                @click="updateItem(item)"
                v-model="item.done"
                color="grey"
              ></v-checkbox-btn>
            </template>

            <v-list-item-title>
              <span :class="item.done ? 'text-grey' : 'text-primary'">
                {{ item.title }}
              </span>
            </v-list-item-title>

            <template v-slot:append>
              <v-expand-x-transition>
                <v-icon v-if="item.done" color="success"> mdi-check </v-icon>
              </v-expand-x-transition>
              <v-icon @click="startEdit(item)"> mdi-pencil </v-icon>
              <v-icon @click="startRemove(item.id)" color="error">mdi-delete</v-icon>
            </template>
          </v-list-item>
        </v-card>
      </v-card>
    </v-sheet>

    <v-sheet class="w-25 h-25 pb-12" style="background-color: whitesmoke;">
      <v-img
        src="https://media.giphy.com/media/a2sx8GRESFjqu4fYoc/giphy-downsized-large.gif"
        alt="GIF animado"
      ></v-img>

      <v-dialog v-model="showRemove" max-width="400px">
        <v-card style="background-color: whitesmoke;">
          <v-card-title class="font-weight-bold text-h5 text-error">Deletar</v-card-title>
          <v-card-text>Tem certeza que deseja excluir?</v-card-text>

          <v-card-actions>
            <v-btn @click="showRemove = !showRemove">Cancelar</v-btn>
            <v-btn :loading="removeLoad" @click="removeItem(this.selected)" color="error">Deletar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEdit" max-width="400px">
        <v-card style="background-color: whitesmoke;">
          <v-card-title class="font-weight-bold text-h5 text-warning">Editar</v-card-title>
          <v-form @submit.prevent="editItem(this.selected)">
            <v-text-field
              single-line
              hide-details
              density="compact"
              variant="solo"
              v-model="editTitle"
            ></v-text-field>
          </v-form>

          <v-card-actions>
            <v-btn @click="showEdit = !showEdit">Cancelar</v-btn>
            <v-btn :loading="editLoad" @click="editItem(this.selected)" color="warning">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-main>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import { itemsApiMixin } from "@/api/items";
import MenuDashboard from "@/components/MenuDashboard.vue";
import LeftDashboard from "@/components/LeftDashboard.vue";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin],
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
      items: [],
      itemTitle: "",
      loading: false,
      listId: this.$route.params.id,
      listTitle: "",
      showRemove: false,
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
        this.showRemove = false;
        this.removeLoad = false;
      }
    },
    startRemove(id) {
      this.selected = id;
      this.showRemove = true;
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

<style>
.v-list-item__title {
  font-size: 18px !important;
  font-weight: bold !important;
  margin-left: 5px !important;
}

.create-btn:hover {
  background-color: white !important;
  color: indigo !important;
}
</style>

