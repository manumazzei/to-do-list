<script>
import Z from "webfontloader";
import Navregister from "@/layouts/default/Navregister.vue";
import {authApiMixin} from "@/api/auth";

export default {
  mixins: [authApiMixin],
  components: {
    Navregister
  },
  data: () => ({
    isFormValid: false,
    valid: false,
    username: "",
    password: "",
    confirm: "",
    user: "",
    email: "",
    loading: false,
    seePassword: false,

    nameRules: [
      (user) => {
        if (user) return true;
        return "Username is required.";
      },
      (user) => {
        if (user == user.toLowerCase() && !user.includes(" ")) return true;
        return "Your username must not contain capital letters or spaces.";
      }],

    passwordRules: [
      (password) => {
        if (password) return true;
        return "Password is required.";
      },
      (password) => {
        if (password?.length >= 8) return true;
        return "Password must be at least 8 characters long.";
      },
      (password) => {
        const pattern = /^(?=.*\d)(?=.*[!@#$%^&*]).+$/;
        if (pattern.test(password)) return true;
        return "Your password must contain at least one number and one special character.";
      }],

    emailRules: [
      (email) => {
        if (email) return true;
        return "E-mail is required.";
      },
      (email) => {
        if (/.+@.+\..+/.test(email) && !email.includes(" ")) return true;

        return "E-mail must be valid.";
      }],
  }),

  methods: {
    async submit() {
     const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
     };

     try{
      await this.register(payload);
      alert("Usuário criado com sucesso");
      this.$router.push("/login");
    } catch (err) {
      const status = err.response.status;
      if(status >= 500 && status <600) {
        alert("Ocorreu um erro no servidor!")
      } else {
        alert("Algo deu errado. Pedimos desculpas!")
      }
    }
    },

    validateConfirmPassword(confirm) {
      if (confirm) {
        if (confirm !== this.password) {
          return "Your confirmation password must match the password.";
        }
        return true;
      }
      return "Confirm password is required.";
    },
    showAlert(){
      alert("Opção indisponível! Estamos trabalhando nisso!")
    },
  },
};
</script>

<template>
<div class="h-100" style="background-color: whitesmoke;">
    <div class="w-50 h-75 ml-16" style="background-color: whitesmoke;">
    <navregister />

    <div
      class="d-flex justify-center align-center w-100 mt-10"
      style="font-size: 30px"
    >
      <h5>Sign up for free</h5>
    </div>

    <div class="d-flex justify-center align-center" style="margin: 10px">
      <p>Start automating your content flow.</p>
    </div>
    <div class="d-flex justify-center align-center">
      <p>One list, multiple tasks.</p>
    </div>

    <div class="d-flex justify-center align-center" style="margin: 20px">
      <v-btn
        variant="outlined"
        class="d-flex align-center justify-center w-50"
        @click="showAlert"
        disabled
      >
        <v-avatar>
          <img src="/google-sm.png" />
        </v-avatar>
        Continue with Google
      </v-btn>
    </div>

    <div class="d-flex justify-center">
      <div class="d-flex justify-center align-center w-50">
        <v-divider class="mt-4"></v-divider>
        <p class="mt-3 pa-2">or</p>
        <v-divider class="mt-4"></v-divider>
      </div>
    </div>

    <v-sheet max-width="400" class="mx-auto mt-18">
      <v-form
        v-model="isFormValid"
        @submit.prevent="submit"
        style="margin-top: 30px; background-color: whitesmoke;"
      >
        <p style="font-family: Poppins;">Username</p>
        <v-text-field
          v-model="username"
          :rules="nameRules"
          single-line
          denstiy="compact"
          variant="solo"
        ></v-text-field>

        <p class="mt-2" style="font-family: Poppins;">Email</p>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          single-line
          denstiy="compact"
          variant="solo"
        ></v-text-field>

        <p class="mt-2" style="font-family: Poppins;">Password</p>
        <v-text-field
          :type="seePassword ? 'text' : 'password'"
          :append-icon="seePassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="seePassword = !seePassword"
          v-model="password"
          :rules="passwordRules"
          :counter="8"
          single-line
          denstiy="compact"
          variant="solo"
        ></v-text-field>

        <p class="mt-2" style="font-family: Poppins;">Confirm Password</p>
        <v-text-field
          :type="seePassword ? 'text' : 'password'"
          @click:append="seePassword = !seePassword"
          v-model="confirm"
          :rules="[validateConfirmPassword]"
          :counter="8"
          single-line
          denstiy="compact"
          variant="solo"
        ></v-text-field>

        <v-btn
          color="indigo"
          :disabled="!isFormValid"
          :loading="loading"
          type="submit"
          block
          class="mt-4"
          text="Sign up"
        ></v-btn>
      </v-form>
    </v-sheet>
  </div>

  <div
    class="m-0"
    style="
      position: fixed;
      top: 0;
      right: 0;
      background-color: #e4d5eb;
      width: 600px;
      height: 100vh;
    "
  >
    <div style="height: 100vh">
      <div style="height: 200px"></div>
      <div style="width: 600px" class="d-flex justify-center mt-16">
        <img src="/horacio-poeta.jpg" class="rounded-circle w-50 h-50" />
      </div>

      <div class="d-inline-flex justify-center align-center">
        <img
          src="/aspas.png"
          style="width: 120px; height: 120px"
          class="ml-8"
        />

        <h6 style="font-size: 25px; width: 350px" class="mt-16">
          “He who is begun has half done.Dare to be wise; begin.”
        </h6>
      </div>

      <div class="d-flex justify-center mt-12">
        <p style="font-size: 20px">- Horace, Ancient Roman poet</p>
      </div>
    </div>
  </div>
</div>
  
</template>
