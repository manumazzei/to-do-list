<script>
import Z from "webfontloader";
import Navregister from "@/layouts/default/Navregister.vue";

export default {
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
      this.loading = true;
      this.username = "";
      this.email = "";
      this.password = "";
      this.confirm = "";

      const message = "Você está cadastrado!";
      this.loading = false;
      alert(message);
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
    }
  },
};
</script>

<template>
  <div class="w-50 h-75 ml-16">
    <navregister/>

    <div class="d-flex justify-center align-center w-100 mt-12" style="font-size: 30px">
            <h5>Sign up for free</h5>
        </div>

    <div class="d-flex justify-center align-center" style="margin:10px">
            <p>Start automating your content flow.</p>
        </div>
        <div class="d-flex justify-center align-center">
            <p>One list, multiple tasks.</p>
        </div>

    <div class="d-flex justify-center align-center" style="margin: 20px">
      <v-btn variant="outlined" class="d-flex align-center justify-center w-50" @click="showAlert">
          <v-avatar>
            <img src="/google-sm.png">
          </v-avatar>
          Continue with Google
        </v-btn>
    </div>

    <div class="d-flex justify-center">
      <div class="d-flex justify-center align-center w-50">
          <v-divider class="mt-4"></v-divider> <p class="mt-3 pa-2">or</p> <v-divider class="mt-4"></v-divider>
     </div>
    </div>

<v-sheet max-width="400" class="mx-auto mt-28">
<v-form v-model="isFormValid" @submit.prevent="submit" style="margin-top: 30px;">
    <p>Username</p>
    <v-text-field
      v-model="username"
      :rules="nameRules"
      label="Create your username"
      required
    ></v-text-field>
  
    <p>Email</p>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Enter your email to continue"
      required
    ></v-text-field>

    <p>Password</p>
    <v-text-field
      :type="seePassword ? 'text' : 'password'"
      :append-icon="seePassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="seePassword = !seePassword"
      v-model="password"
      :rules="passwordRules"
      :counter="8"
      label="Create your password"
      required
    ></v-text-field>

    <p>Confirm Password</p>
    <v-text-field
      :type="seePassword ? 'text' : 'password'"
      @click:append="seePassword = !seePassword"
      v-model="confirm"
      :rules="[validateConfirmPassword]"
      :counter="8"
      label="Confirm your password"
      required
    ></v-text-field>

    <v-btn
          color="indigo"
          :disabled="!isFormValid"
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Sign up"
        ></v-btn>

  </v-form>
</v-sheet>

  </div>
 
 

  <div class="m-0" style="position: fixed;
  top: 0;
  right: 0;
  background-color: #e4d5eb;
  width: 600px;
  height: 100vh;">
  </div>

</template>

