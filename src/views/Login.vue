<script>
  export default {
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
    },
  }
</script>

<template>
    <v-sheet max-width="300" class="mx-auto">
      <v-form @submit.prevent="submit" v-model="isFormValid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
        ></v-text-field>

        <v-text-field
           :type="seePassword ? 'text' : 'password'"
           :append-icon="seePassword ? 'mdi-eye' : 'mdi-eye-off'"
           @click:append="seePassword =!seePassword"
          v-model="password"
          :rules="passwordRules"
          label="Password"
        ></v-text-field>

        
          <v-btn
          :disabled="!isFormValid"
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Login"
        ></v-btn>
      </v-form>

        <v-sheet class="notyet" align="center"> <h3>Still not registered?</h3>
            <router-link to="/register">
                <v-btn variant="outlined" size="x-small">
                Register here
                </v-btn>
            </router-link>
        </v-sheet>

    </v-sheet>
  </template>

  <style scoped>
.notyet{
    padding-top: 2rem;
}
</style>