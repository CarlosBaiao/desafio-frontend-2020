<template>
  <div class="item">
    <img class="item--image" :src="item.imageUrl" :alt="item.name" />
    <div class="content">
      <p class="item--category">{{ item.category }}</p>
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{ item.price | currency }}</p>
      <button class="item--addCart" @click="addToCart">
        Adicionar ao carrinho
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  props: {
    item: {},
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 300px;
  height: 560px;
  border: 1px solid @light-grey;
  box-shadow: 0 0 1em @light-grey;
  margin: 20px;
  display: flex;
  flex-direction: column;
  padding: 0;

  &--image {
    padding: 30px;
    width: 100%;
    height: 270px;
    display: block;
    margin: auto;
    border-bottom: 1px solid @light-grey;
  }

  &--category {
    color: @purple;
    font-family: "SourceSansBold", "sans-serif";
    width: 100%;
    padding: 0 20px;
    margin: 10px 0 5px 0;
  }
  &--name {
    font-size: 1.1rem;
    padding: 0 20px;
    margin: 0;
  }

  &--description {
    color: @grey;
    line-height: 1.5em;
    height: 4.5em;
    overflow: hidden;
    padding: 0 20px;
  }

  &--price {
    font-family: "SourceSansBold", "sans-serif";
    font-size: 1.3rem;
    padding: 0 20px;
    margin-top: 0;
  }

  &--addCart {
    width: 100%;
    height: 35px;
    border: none;
    border-top: 1px solid @light-grey;
    background: @white;
    font-family: "SourceSansBold", "sans-serif";
    color: @purple;
    text-transform: uppercase;
    transition: all 1s ease;

    &:hover {
      background: @purple;
      color: @white;
    }
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
