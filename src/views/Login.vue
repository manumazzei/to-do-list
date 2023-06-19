<script>
  export default {
    data: () => ({
      loading: false,
      rules: [value => vm.checkApi(value)],
      timeout: null,
      userName: '',
      password: '',
      form: '',
      email: '',
      seePassword: false,
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
    computed: {
      valitedForm() {
        return this.$refs.form.validate();

      }
    },
    methods: {
      async submit () {
        this.loading = true
        
        this.password = ''
        this.email = ''
        

        this.loading = false

      
      },
      async checkApi (userName) {
        return new Promise(resolve => {
          clearTimeout(this.timeout)

          this.timeout = setTimeout(() => {
            if (!userName) return resolve('Please enter a user name.')
            if (userName === 'johnleider') return resolve('User name already taken. Please try another one.')

            return resolve(true)
          }, 1000)
        },
        )
      },
    },
    seePassword(){
      console.log(this.password);
    }
  }
</script>

<template>
    <v-sheet max-width="300" class="mx-auto">
      <v-form @submit.prevent="submit">
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