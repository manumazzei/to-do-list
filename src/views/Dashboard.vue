<template>
  <div>
    <menu-dashboard @openMenu="$emit('openMenu')" :rail="rail"></menu-dashboard>
    <left-dashboard @openMenu="$emit('openMenu')" :rail="rail"></left-dashboard>

    <v-main style="background-color: whitesmoke; height: 1000px;">
      <p
        style="margin-top: -45px;background-color: #fffcdc; border: 1px solid #e9e082; font-family: Arial, Helvetica, sans-serif; height: 5%; width: 90%"
        class="d-flex align-center pl-8"
      >
        Welcome to To do! To get started, you'll need to create your first list.
        <a @click="startCreate()" style="cursor: pointer; color: purple">Click here to create.</a>
      </p>

      <v-sheet class="d-flex justify-space-between mt-8 h-100" style="background-color: whitesmoke; width: 95%">

      
      <v-card class="h-75 w-50 elevation-12">
        <v-sheet class="d-inline-flex ml-12" style="font-family: Poppins;">
          <strong style="padding: 0; font-size: 30px; font-weight: 700;" class="mt-4">Lists</strong>
          <span class="mdi mdi-format-list-checks mt-10"></span>
        </v-sheet>

        <v-sheet class="mt-4 w-100 h-75 d-flex flex-wrap justify-center" style="max-height: 75vh; overflow-y: auto;">
          <v-card v-for="(list, index) in toDoLists" :key="list.id" class="mt-4 ml-4 w-50">
            <v-list-item>
              <router-link :to="`/list-detail/${list.id}`">
                <v-icon icon="mdi mdi-eye-arrow-left-outline" color="indigo"></v-icon>
              </router-link>
              <v-card-title>{{ list.title }}</v-card-title>

              <template v-slot:append>
                <v-icon @click="startEdit(list)">mdi-pencil</v-icon>
                <v-icon @click="startRemove(list.id)" color="error">mdi-delete</v-icon>
              </template>
            </v-list-item>
          </v-card>
        </v-sheet>

      </v-card>

      <v-sheet class="d-flex justify-space-between mt-4" style="width: 18%; background-color: whitesmoke;">
          <v-btn class="create-btn" color="indigo" @click="startCreate()">
            <span class="mdi mdi-plus"></span>
            Create a new list
          </v-btn>
          <v-btn disabled style="background-color: #B5ECC1;">
            <v-icon style="color:#fffcdc" size="large" class="mdi mdi-playlist-plus"></v-icon>
          </v-btn>
        </v-sheet>

    </v-sheet>
       


      <v-dialog v-model="showCreate" max-width="500px">
        <v-card style="width: 500px; height: 180px; background-color: whitesmoke;">
          <strong class="d-flex justify-center mt-4" style="font-family:Poppins; font-size: 20px; color: indigo"
            >Create your list</strong
          >
          <v-form @submit.prevent="createList" class="d-inline-flex mt-4 align-center w-75 ml-16">
            <v-text-field
              :loading="loading"
              v-model="listTitle"
              single-line
              hide-details
              density="compact"
              variant="solo"
            ></v-text-field>
          </v-form>
          <v-card-actions class="d-flex justify-center align-center w-100" style="background-color: whitesmoke;">
            <v-btn @click="showCreate = false" class="mt-4 mr-8">Cancel</v-btn>
            <v-btn @click="createList" :loading="loading" color="indigo" class="mt-4">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showRemove" max-width="400px">
        <v-card style="background-color: whitesmoke;">
          <v-card-title class="font-weight-bold text-h5 text-error">Delete</v-card-title>
          <v-card-text>Are you sure you want to delete?</v-card-text>
          <v-card-actions>
            <v-btn @click="showRemove = false">Cancel</v-btn>
            <v-btn :loading="removeLoad" @click="removeList(selected)" color="error">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEdit" max-width="400px">
        <v-card style="background-color: whitesmoke;">
          <v-card-title class="font-weight-bold text-h5 text-warning">Edit</v-card-title>
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
            <v-btn @click="showEdit = false">Cancel</v-btn>
            <v-btn :loading="editLoad" @click="updateList(selected)" color="warning">Edit</v-btn>
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
      showCreate: false,
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
        this.showCreate = false;
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
    startCreate() {
      this.showCreate = true;
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
  computed: {
    aparece() {
      return this.rail;
    },
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
.create-btn:hover {
  background-color: white !important;
  color: indigo !important;
}
</style>
