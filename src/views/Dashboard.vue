<template>
  <v-app>
    <v-main>
      <v-layout>
        <v-app-bar app fixed color="white">
          <v-btn
            icon
            @click="rail = !rail"
          >
            <v-icon color="indigo" style="font-size: 34px;">mdi-menu-open</v-icon>
          </v-btn>

          <v-sheet class="d-inline-flex ml-6">
            <router-link to="/">
              <v-icon icon="mdi-list-box" color="indigo" style="text-decoration: none;" size="x-large" class="mt-2"/>
            </router-link> 
            <strong class="mt-2 ml-2" style="font-size: 25px;">To do list</strong>
          </v-sheet>
          
          <v-sheet class="ml-4" style="width:75%">
          
          </v-sheet>
          
      <template v-slot:append>
        <v-icon @click="startEdit(list)"> mdi-pencil </v-icon>
        <v-icon @click="startRemove(list.id)" color="error">
          mdi-delete
        </v-icon>
      </template>
    </v-list-item>
  </v-card>

          <v-sheet class="d-flex justify-space-between ml-4" style="width: 10%">
            <v-icon class="mdi mdi-help-circle-outline mt-2"></v-icon>
            <v-icon class="mdi mdi-bell-outline mt-2"></v-icon>
            <v-avatar>
              <v-img
              src="/horacio-poeta.jpg"
              contain
              class="rounded-circle"
              >
              </v-img>
            </v-avatar>
          </v-sheet>

        </v-app-bar>

        <v-navigation-drawer
          :rail="rail"
          permanent
        >
          <v-list density="compact" nav>
              <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
              <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
              <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 1000px; background-color: whitesmoke;">
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
                <v-icon icon="mdi-checkbox-marked-circle-outline" color="indigo"></v-icon>
              </router-link>
              <v-card-title>{{ list.title }}</v-card-title>

              <template v-slot:append>
                <v-icon @click="startRemove(list.id)" color="error">
                  mdi-delete
                </v-icon>
              </template>
            </v-list-item>
          </v-card>

          <v-card v-show="showRemove">
            <v-card-title class="font-weight-bold text-h5 text-error">Deletar</v-card-title>
            <v-card-text>Tem certeza que deseja excluir?</v-card-text>

            <v-card-actions>
              <v-btn
                :loading="removeLoad"
                @click="removeList(this.selected)"
                color="error"
              >Deletar</v-btn>
              <v-btn @click="showRemove = !showRemove">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-main>
      </v-layout>
    </v-main>
  </v-app>
  
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
import NavDashboard from "@/components/NavDashboard.vue";
import MenuDashboard from "@/components/MenuDashboard.vue";

export default {
  mixins: [toDoListsApiMixin],
  components: {
    NavDashboard,
    MenuDashboard
  },
  data() {
    return {
      toDoLists: [],
      listTitle: "",
      loading: false,
      showModal: false,
      showEdit: false,
      showRemove: false,
      selected: "",
      removeLoad: false,
      rail: true
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
