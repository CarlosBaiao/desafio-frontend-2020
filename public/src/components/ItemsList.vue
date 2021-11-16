<template>
  <div class="items-list container">
    <div class="search">
      <p class="search--info">Encontre seu produto</p>
      <input
        class="search--field"
        type="text"
        placeholder="Pesquisar"
        v-model="fieldSearch"
      />
      <Magnifying />
    </div>
    <div class="itens row container">
      <Item
        class="col-sm-6 col-lg-3"
        v-for="item in itemsList"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Item from "./Item.vue";
import Magnifying from "../assets/icons/magnifying-glass.svg";

export default {
  name: "ItemsList",
  components: {
    Item,
    Magnifying,
  },
  data() {
    return {
      filter: [],
      itemsList: [],
      fieldSearch: "",
    };
  },
  created() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      axios
        .get(
          "https://raw.githubusercontent.com/owInteractive/desafio-frontend-2020/master/produtos.json"
        )
        .then((response) => {
          this.itemsList = response.data;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.items-list {
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;

  .search {
    height: 80px;
    width: 80%;
    margin: 50px auto;
    border: 1px solid @light-grey;
    box-shadow: 0 0 1em @light-grey;
    display: flex;
    align-items: center;
    justify-content: center;

    &--info {
      padding: 0 20px;
      color: @grey;
      font-family: "SourceSansBold", "sans-serif";
      margin: 0;
    }

    &--field {
      border: 1px solid @light-grey;
      height: 40px;
      width: 65%;
      padding: 0 20px;
    }

    svg {
      background: @purple;
      width: 5%;
      height: 40px;
      padding: 10px;

      path {
        fill: @white;
      }
    }
  }

  .itens {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
  }

  @media @tablets {
    .search {
      &--field {
        width: 80%;
      }

      &--info {
        display: none;
      }

      svg {
        width: 10%;
      }
    }
  }
}
</style>
