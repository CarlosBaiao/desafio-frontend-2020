<template>
  <div class="banner">
    <carousel
      :per-page="1"
      :navigate-to="someLocalProperty"
      :mouse-drag="false"
      :autoplay="true"
    >
      <slide class="bannner-one">
        <h2>Notebooks</h2>
        <p>As melhores ofertas</p>
      </slide>
      <slide class="bannner-one">
        <h2>MktPlace</h2>
        <p>Os melhores preços</p>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Banner",
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 400px;

  .banners {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: auto;
  }

  .bannner-one {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding-right: 150px;
    color: white;

    height: 300px;
    background-image: linear-gradient(to left, @light-purple, @purple);
  }
}
</style>
