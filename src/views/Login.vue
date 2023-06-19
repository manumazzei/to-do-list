<script>
  import Navlogin from '@/layouts/default/Navlogin.vue'

  export default {
    components: {
      Navlogin
    },
    data: () => ({
      isFormValid: false,
      loading: false,
      seePassword: false,
      userName: "",
      password: "",
      form: "",
      email: "",

      rules: [value => vm.checkApi(value)],
      passwordRules: [
         password => {
          if (password) return true
          return 'Password is required.'
          }, 
      ],

      emailRules: [
      (email) => {
        if (email) return true;
        return "E-mail is required.";
      },
      (email) => {
        if (/.+@.+\..+/.test(email) && !email.includes(" ")) return true;

        return "E-mail must be valid.";
      },
    ],
    }),

    methods: {
      async submit () {
        this.loading = true
        
        this.password = ''
        this.email = ''
        
        this.loading = false
      },
      showAlert(){
        alert("Opção indisponível! Estamos trabalhando nisso!")
      }
    },
  }
</script>

<template>

    <Navlogin />

    <h3 class="d-flex justify-center align-center" style="font-size: 20px; color: #5b627d; height: 80px">Welcome Back!</h3>

    <v-sheet max-width="400" class="mx-auto mt-30">
      <v-form @submit.prevent="submit" v-model="isFormValid">
        <p>Email</p>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="name@email.com"
        ></v-text-field>

        <p>Password</p>
        <v-text-field
          v-model="password"
          :type="seePassword ? 'text' : 'password'"
          :append-icon="seePassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="seePassword =!seePassword"
          :rules="passwordRules"
          label="Your password"
        ></v-text-field>

        <h6 style="font-size: 15px; color: indigo; cursor: pointer;">Forgot your password?</h6>

          <v-btn
          color="indigo"
          :disabled="!isFormValid"
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Sign In"
        ></v-btn>
        <div class="d-flex justify-center align-center">
          <v-divider class="mt-4"></v-divider> <p class="mt-3 pa-2">or</p> <v-divider class="mt-4"></v-divider>
        </div>

        <v-btn variant="outlined" class="d-flex align-center justify-center w-100" @click="showAlert">
          <v-avatar>
            <img src="public/google-sm.png">
          </v-avatar>
          Continue with Google
        </v-btn>

      </v-form>
    </v-sheet>
  </template>

  <style scoped>
</style>