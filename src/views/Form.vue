<script>
  export default {
    data: () => ({
      firstName: '',
      rules: [
        value => {
          if (!value) return "Please say something";
          if(!value.includes(" "))
            return "You must enter a full name with spaces";
            return true;
        },
      ],
      isFormValid: true,
    }),
    methods: {
        handleSubmit(event) {
            event.preventDefault();
            if(!this.isFormValid) {
                alert("Preencha direito, por favor!")
            return;
        }
        //enviar os dados para api
        console.log(this.isFormValid);
    },
  },
};
</script>


<template>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent v-model="isFormValid">
        <v-text-field
          v-model="firstName"
          :rules="rules"
          label="Full name"
        ></v-text-field>
        <v-btn type="submit" @click="handleSubmit" block class="mt-2">Submit</v-btn>
      </v-form>
    </v-sheet>
  </template>

