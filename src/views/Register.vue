<script>
import Z from "webfontloader";

export default {
  data: () => ({
    valid: false,
    username: "",
    password: "",
    confirm: "",
    user: "",
    email: "",
    confirm: "",
    seePassword: false,
    nameRules: [
      (user) => {
        if (user) return true;

        return "Username is required.";
      },
      (user) => {
        if (user == user.toLowerCase() && !user.includes(" ")) return true;

        return "Your username must not contain capital letters or spaces.";
      },
    ],
    passwordRules: [
      (password) => {
        if (password) return true;

        return "Password is required.";
      },
      (password) => {
        if (password?.length <= 8) return true;

        return "Password must be at least 8 characters long.";
      },
      (password) => {
        const pattern = /^(?=.*\d)(?=.*[!@#$%^&*]).+$/;
        if (pattern.test(password)) return true;

        return "Your password must contain at least one number and one special character.";
      },
    ],
    emailRules: [
      (email) => {
        if (email) return true;

        return "E-mail is requred.";
      },
      (email) => {
        if (/.+@.+\..+/.test(email) && !email.includes(" ")) return true;

        return "E-mail must be valid.";
      },
    ],
  }),
  methods: {
    async submit() {
      this.loading = true;

      this.user='';
      this.email= '';
      this.password = '';
      this.confirm= '';
      

      const message = 'Você está cadastrado!';
      
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

    submitForm() {
      this.form = '';
      this.password = '';
      this.password = ''

      this.$refs.form.resetValidation()
    },
    seePassword(){
      console.log(this.password);
    }
  },
};
</script>

<template>
  <v-form v-model="confirmUsername" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="username"
            :rules="nameRules"
            label="Username"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            :type="seePassword ? 'password' : 'text'"
            :append-icon="seePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="seePassword =!seePassword"
            v-model="password"
            :rules="passwordRules"
            :counter="8"
            label="Password"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            type="password"
            v-model="confirm"
            :rules="[validateConfirmPassword]"
            :counter="8"
            label="Confirm password"
            required
          ></v-text-field>
        </v-col>

        <v-btn
          :loading="loading"
          type="submit"
          class="mt-2"
          text="Register"
        ></v-btn>
      </v-row>
    </v-container>
  </v-form>
  <v-sheet class="notyet" align="center">
    <h3>Already have registration?</h3>
    <router-link to="/login">
      <v-btn variant="outlined" size="x-small"> Login here </v-btn>
    </router-link>
  </v-sheet>
</template>
