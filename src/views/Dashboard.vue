<template>
  <div>
    <menu-dashboard @openMenu="$emit('openMenu')"></menu-dashboard>
    <left-dashboard @openMenu="$emit('openMenu')" :rail="rail"></left-dashboard>

    <v-main style="background-color: whitesmoke;">
      <v-sheet
        style="
          height: 900px;
          width: 900px;
          background-color: whitesmoke;
        "
      >
        <v-form @submit.prevent="createList" class="mt-4 align-center">
          <v-row>
            <v-col cols="12" md="6" class="d-flex justify-space-between ml-4">
              <v-text-field
                :loading="loading"
                v-model="listTitle"
                single-line
                hide-details
                density="compact"
                variant="solo"
              >
              </v-text-field>
              <v-btn @click="createList" :loading="loading" color="indigo"
                >Criar</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center" class="mt-4 w-50">
          <v-col v-for="list in toDoLists" :key="list.id">
            <v-card>
              <v-list-item>
                <router-link :to="`/list-detail/${list.id}`">
                  <v-icon
                    icon="mdi mdi-eye-arrow-left-outline"
                    color="indigo"
                  ></v-icon>
                </router-link>
                <v-card-title>{{ list.title }}</v-card-title>

                <template v-slot:append>
                  <v-icon @click="startEdit(list)">mdi-pencil</v-icon>
                  <v-icon @click="startRemove(list.id)" color="error"
                    >mdi-delete</v-icon
                  >
                </template>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>

      <v-dialog v-model="showRemove" max-width="400px">
        <v-card>
          <v-card-title class="font-weight-bold text-h5 text-error"
            >Deletar</v-card-title
          >
          <v-card-text>Tem certeza que deseja excluir?</v-card-text>
          <v-card-actions>
            <v-btn @click="showRemove = false">Cancelar</v-btn>
            <v-btn
              :loading="removeLoad"
              @click="removeList(selected)"
              color="error"
              >Deletar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEdit" max-width="400px">
        <v-card>
          <v-card-title class="font-weight-bold text-h5 text-warning"
            >Editar</v-card-title
          >
          <v-card-text>
            <v-form @submit.prevent="updateList(selected)">
              <v-text-field
                single-line
                hide-details
                density="compact"
                variant="solo"
                v-model="editTitle"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="showEdit = false">Cancelar</v-btn>
            <v-btn
              :loading="editLoad"
              @click="updateList(selected)"
              color="warning"
              >Editar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import MenuDashboard from "@/components/MenuDashboard.vue";
import LeftDashboard from "@/components/LeftDashboard.vue";

export default {
  mixins: [toDoListsApiMixin],
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
      toDoLists: [],
      listTitle: "",
      loading: false,
      showModal: false,
      showEdit: false,
      showRemove: false,
      showLogOut: false,
      selected: "",
      removeLoad: false,
      editTitle: "",
      editLoad: false,
      aparece: "",
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
        this.toDoLists = this.toDoLists.filter((list) => list.id !== id);
      } catch (err) {
        console.log(err);
      } finally {
        this.showRemove = false;
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
        const updatedList = this.toDoLists.find((list) => list.id === id);
        updatedList.title = this.editTitle;
      } catch (err) {
        console.log(err);
      } finally {
        this.showEdit = false;
        this.editLoad = false;
      }
    },
  },
  computed() {
    this.aparece = this.rail;
  },
  mounted() {
    this.getLists();
  },
};
</script>

<style>
.v-list-item__title {
  font-size: 18px !important;
  font-weight: bold !important;
  margin-left: 5px !important;
}
</style>
