<template>
  <div class="home">
    <Navbar />
    <Index />
  </div>
</template>

<script>
// @ is an alias to /src
import Index from "@/components/Index.vue";
import Navbar from '@/components/Navbar.vue';

export default {
  name: "Home",
  components: {
    Index,Navbar
  }
};
</script>
