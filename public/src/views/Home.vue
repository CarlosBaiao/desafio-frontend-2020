<template>
  <div class="home">
    
    <Header/>
    <Banner/>
   
    <ItemsList/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Banner from '@/components/Banner.vue';

import ItemsList from '@/components/ItemsList.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Banner,
    ItemsList,
    Footer
  },
 
}
</script>
<style >
</style>
