<template>
  <div class="checkout">
    <Header />
    <Data />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Data from "../components/Data.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Checkout",
  components: {
    Header,
    Data,
    Footer,
  },
};
</script>

<style lang="less" scoped></style>
