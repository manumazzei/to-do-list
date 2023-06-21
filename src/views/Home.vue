<template>
  <NavHome />

  <main style="height:820px">

    <div class="d-flex justify-center mt-16">
          <div class="w-50 mt-16 d-flex justify-center">
             <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Mivz8Qh-DwI"
          frameborder="0"
          allowfullscreen
             ></iframe>
          </div>
    </div>
   
    <div class="d-flex justify-center align-center ml-8">
      <div class="d-flex flex-column justify-center align-center mt-16">
          <p style="font-size: 60px; font-family: 'Bebas Neue', sans-serif; color:indigo">Watch this video!</p>
          <p style="font-size: 30px; font-family: 'Quicksand', sans-serif;" lass="mt-4">Our mission is always to help you!</p>
          <p style="font-size: 30px; font-family: 'Quicksand', sans-serif;" class="mt-4">With our platform you can improve your life!</p>
        </div>
    </div>
   
  </main>

  <v-footer
    class="bg-indigo-lighten-1 text-center d-flex flex-column">
    
    <div class="pt-0">
      You can be much more productive using our To do List! &#128211 &#129293
    </div>

  </v-footer>

</template>

<script setup>
  import NavHome from '@/components/NavHome.vue'
</script>
