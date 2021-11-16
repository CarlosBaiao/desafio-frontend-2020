<template>
  <tr class="cart-item">
    <td class="cart-item--product">
      <Garbage @click="onRemoveItem" />
      <div class="content">
        <span class="content--category">{{ item.category }}</span>
        <span class="content--name">{{ item.name }}</span>
      </div>
    </td>
    <td class="cart-item--quantity">
      <div class="quantity-container">
        <button
          @click="decreaseQuantity(item.id)"
          :disabled="item.quantity === 1"
        >
          -
        </button>
        <span class="quantity-container--value"
          ><span v-if="checkQuantity">0</span>{{ item.quantity }}</span
        >
        <button @click="increaseQuantity(item.id)">+</button>
      </div>
    </td>
    <td class="cart-item--price">
      <span>{{ item.price | currency }}</span> à vista ou 10x
      {{ (item.price / 10) | currency }}
    </td>
    <td class="cart-item--price">
      <span>{{ (item.price * item.quantity) | currency }}</span> à vista ou 10x
      {{ ((item.price * item.quantity) / 10) | currency }}
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";
import Garbage from "../assets/icons/garbage.svg";
export default {
  name: "CartItem",
  props: {
    item: {},
  },
  data() {
    return {
      list: [],
    };
  },
  components: {
    Garbage,
  },
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })} `;
    },
  },
  computed: {
    checkQuantity() {
      return this.item.quantity <= 9;
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onRemoveItem() {
      this.$store.dispatch("removeFromCart", this.item.id);
    },
  },
};
</script>

<style lang="less" scoped>
.cart-item {
  text-align: center;
  height: 150px;

  &--quantity {
    .quantity-container {
      margin: auto;
      border: 1px solid @grey;
      width: 100px;
      height: 40px;
      display: flex;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        border: none;
        background: @white;
        font-family: "SourceSansBold", "sans-serif";
        color: @grey;
        font-size: 1rem;
      }

      &--value {
        width: 100%;
        height: 100%;
        border-left: 1px solid @grey;
        border-right: 1px solid @grey;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  &--price {
    font-size: 1rem;
    padding: 0 30px;
  }

  td {
    border-top: 1px solid @grey;

    span {
      font-family: "SourceSansBold", "sans-serif";
    }
  }

  &--product {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 150px;

    svg {
      path {
        fill: @grey;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 150px;
      text-align: left;
      font-family: "SourceSansBold", "sans-serif";

      &--category {
        color: @purple;
      }
    }
  }

  @media @tablets {
    &--quantity {
      width: fit-content;

      .quantity-container {
        flex-direction: column;
        align-items: center;
        width: fit-content;
        height: fit-content;

        &--value {
          width: 100%;
          border: none;
          border-top: 1px solid @grey;
          border-bottom: 1px solid @grey;
        }
      }
    }
    &--product {
      flex-direction: column;
      height: 150px;
      justify-content: center;
      font-size: 0.8rem;

      .content {
        width: fit-content;
        text-align: center;
      }
    }
    &--price {
      padding: 0;
      width: fit-content;
      font-size: 0.8rem;

      span {
        display: block;
      }
    }
  }
}
</style>
