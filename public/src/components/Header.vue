<template>
  <div class="header">
    <h1 class="logo">Mkt<span>Place</span></h1>
    <div class="containerr">
      <p>Produtos</p>
      <router-link to="/Cart">
        <div class="shopping">
          <Cart />
          <p>{{ cartList }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Cart from "../assets/icons/shopping-cart.svg";
export default {
  name: "Header",
  components: {
    Cart,
  },
  computed: {
    cartList() {
      return this.$store.state.cartList.length || 0;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  height: 130px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid @light-grey;

  .logo {
    color: @dark-grey;
    margin: 0;

    span {
      color: @purple;
    }
  }

  .containerr {
    display: flex;
    align-items: center;

    p {
      margin: 0;
      font-size: 0.9rem;
      color: @dark-grey;
      font-weight: 700;
    }

    .shopping {
      display: flex;
      align-items: center;
      padding-left: 15px;

      svg {
        path {
          fill: @purple;
        }
      }

      p {
        background: @red;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0;
        color: @white;
      }
    }
  }
}
</style>
