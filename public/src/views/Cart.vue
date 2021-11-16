<template>
  <div class="cart">
    <Header />
    <table class="cart--table container">
      <thead>
        <tr>
          <th>Produtos</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <CartItem v-for="item in cartList" :key="item.id" :item="item" />
      </tbody>
    </table>
    <div class="cart--total container">
      <p class="empty" v-if="itemCart">O carrinho está vazio</p>
      <p v-if="!itemCart" class="total-value">
        <span>Total à vista</span><span>{{ getCartTotal | currency }}</span>
      </p>
      <div v-if="!itemCart" class="part">
        <p>Total parcelado</p>
        <p>
          <span>em até 10x {{ (getCartTotal / 10) | currency }} </span> (Total
          {{ getCartTotal | currency }})
        </p>
      </div>
    </div>
    <div class="cart--finish-buy container">
      <div class="clean-cart">
        <Garbage />
        <p @click="onRemoveTotal">Limpar carrinho</p>
      </div>
      <div class="buttons">
        <button class="buttons--continue" @click="returnStore">
          Continuar comprando
        </button>

        <button
          :disabled="itemCart"
          class="buttons--finish"
          @click="goToCheckout"
        >
          Concluir compra
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CartItem from "@/components/CartItem.vue";
import { mapGetters } from "vuex";
import Garbage from "../assets/icons/garbage.svg";
import Footer from "@/components/Footer.vue";

export default {
  name: "Cart",
  components: {
    Header,
    CartItem,
    Garbage,
    Footer,
  },
  data() {
    return {
      list: this.$store.state.cartList,
    };
  },
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
    ...mapGetters(["getCartTotal"]),

    itemCart() {
      return this.$store.state.cartList.length == 0;
    },
  },
  methods: {
    onRemoveTotal() {
      this.$store.dispatch("removeTotal", this.cartList);
    },
    returnStore() {
      this.$router.push({ name: "Home" });
    },
    goToCheckout() {
      this.$router.push({ name: "Checkout" });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  &--table {
    margin: 30px auto;

    thead {
      tr {
        height: 60px;
        text-align: center;

        th {
          width: 150px;

          text-transform: uppercase;
        }
      }
    }
  }

  &--total {
    border-top: 1px solid @light-grey;
    border-bottom: 1px solid @light-grey;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .empty {
      font-size: 1.5rem;
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }

    .total-value {
      margin: 30px 0;

      span {
        padding: 0 10px;
        text-transform: uppercase;
        color: @dark-grey;
        font-family: "SourceSansBold", "sans-serif";
      }
    }

    .part {
      display: flex;

      p {
        color: @dark-grey;
        padding: 0 10px;
        font-family: "SourceSansBold", "sans-serif";
      }
      p:nth-child(1) {
        text-transform: uppercase;
      }

      span {
        color: black;
        display: block;
      }
    }
  }

  &--finish-buy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "SourceSansBold", "sans-serif";
    padding-left: 20px;
    height: 150px;

    .clean-cart {
      display: flex;
      align-items: center;
      color: @grey;
      transition: all 1s ease;

      &:hover {
        color: @dark-grey;
      }
      p {
        padding-left: 5px;
        margin: 0;
      }

      svg {
        path {
          fill: @grey;
        }
      }
    }

    .buttons {
      button {
        width: 170px;
        height: 35px;
        margin: 0 5px;
        border: none;
        transition: all 1s ease;
      }
      &--continue {
        background: @light-grey;
        color: @dark-grey;

        &:hover {
          background: @grey;
          color: @white;
        }
      }
      &--finish {
        background: @purple;
        color: @white;

        &:disabled {
          color: @grey;

          &:hover {
            font-family: "SourceSansRegular", "sans-serif";
          }
        }

        &:hover {
          font-family: "SourceSansBold", "sans-serif";
        }
      }
    }
  }

  @media @tablets {
    &--table {
      th {
        width: 100%;
        font-size: 0.8rem;
      }
    }
    &--total {
      align-items: center;
    }

    &--finish-buy {
      .buttons {
        display: flex;
        flex-direction: column;

        button {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
