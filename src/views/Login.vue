<script>
  import Navlogin from '@/layouts/default/Navlogin.vue';
  import {authApiMixin} from "@/api/auth";
  import { setupPrivateApi } from '@/api';

  export default {
    mixins: [authApiMixin],
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
        const payload = {
          email: this.email,
          password: this.password,
          loading: true
        };
        try{
          const {data} = await this.login(payload);
          const { access_token } = data;
          setupPrivateApi(access_token);
          localStorage.setItem("access_token", access_token);

          this.$router.push("/Dashboard");
        } catch (err) {
          alert("Algo deu errado")
        }
      },

      showAlert(){
        alert("Opção indisponível! Estamos trabalhando nisso!")
      }
    },
  }
</script>

<template>
  <div class="h-100" style="background-color: whitesmoke;">
    <div class="w-50 h-75 ml-16">
    <Navlogin/>
    <h3 class="d-flex justify-center align-center" style="font-size: 25px; color: #5b627d; height: 80px">Welcome Back!</h3>

   
<v-sheet max-width="400" class="mx-auto mt-28">
<v-form v-model="isFormValid" @submit.prevent="submit" style="margin-top: 30px;background-color: whitesmoke;">
    <v-sheet max-width="400" class="mx-auto mt-30" style="background-color: whitesmoke;">
      <v-form @submit.prevent="submit" v-model="isFormValid">

        <p style="font-family: Poppins;">Email</p>
        <v-text-field
          :loading="loading"
          v-model="email"
          :rules="emailRules"
          single-line
          denstiy="compact"
          variant="solo"
        ></v-text-field>

        <p class="mt-2" style="font-family: Poppins;">Password</p>
        <v-text-field
          :loading="loading"
          v-model="password"
          :type="seePassword ? 'text' : 'password'"
          :append-icon="seePassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="seePassword =!seePassword"
          :rules="passwordRules"
          single-line
          denstiy="compact"
          variant="solo"
        ></v-text-field>

        <h6 class="mt-2" style="font-size: 15px; color: indigo; cursor: pointer;"  @click="showAlert">Forgot your password?</h6>

          <v-btn
          color="indigo"
          :disabled="!isFormValid"
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Sign In"
        ></v-btn>

      </v-form>
    </v-sheet>

        <div class="d-flex justify-center">
          <div class="d-flex justify-center align-center w-75">
              <v-divider class="mt-4"></v-divider> <p class="mt-3 pa-2">or</p> <v-divider class="mt-4"></v-divider>
        </div>
        </div>

        <div class="d-flex justify-center align-center" style="margin: 20px">
      <v-btn variant="outlined" class="d-flex align-center justify-center w-75" @click="showAlert" disabled>
          <v-avatar>
            <img src="/google-sm.png">
          </v-avatar>
          Continue with Google
        </v-btn>
    </div>

      </v-form>
    </v-sheet>
    </div>
 
  <div class="m-0" style="position: fixed; top: 0; right: 0; background-color: #e4d5eb; width: 600px;height: 100vh;">
    <div style="height: 100vh;">

     <div style="height: 200px"></div>
      <div style="width: 600px;" class="d-flex justify-center mt-16">
      <img src="/dawson-trotman.jpg" class="rounded-circle w-50 h-50">
      </div>

      <div class="d-inline-flex justify-center align-center">
        <img src="/aspas.png" style="width: 120px; height: 120px" class="ml-8">

          <h6 style="font-size: 25px; width:350px" class="mt-16">“The greatest amount of wasted time is the time not getting started.”</h6>
      </div>

      <div class="d-flex justify-center mt-12">
        <p style="font-size: 20px;">- Dawson Trotman, evangelist</p>
      </div>
    </div>
  </div>
  </div>
  

</template>

