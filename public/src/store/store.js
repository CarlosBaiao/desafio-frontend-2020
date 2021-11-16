import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cartList: JSON.parse(localStorage.getItem("list")) || [],
  },
  mutations: {
    addToCart(state, el) {
      state.cartList.push({ ...el, quantity: 1 });
      localStorage.setItem("list", JSON.stringify(state.cartList));
    },
    increaseQuantity(state, index) {
      ++state.cartList[index].quantity;
    },
    decreaseQuantity(state, index) {
      --state.cartList[index].quantity;
    },
    removeFromCart(state, index) {
      state.cartList.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(state.cartList));
    },
    removeTotal(state) {
      state.cartList = [];
      localStorage.setItem("list", JSON.stringify(state.cartList));
    },
  },
  actions: {
    addToCart({ state, commit }, el) {
      const cartItem = state.cartList.find((cartItem) => cartItem.id === el.id);
      const index = state.cartList.findIndex(
        (cartItem) => cartItem.id === el.id
      );
      cartItem ? commit("increaseQuantity", index) : commit("addToCart", el);
    },
    removeFromCart({ state, commit }, id) {
      const index = state.cartList.findIndex((cartItem) => cartItem.id === id);
      if (index !== -1) commit("removeFromCart", index);
    },
    removeTotal({ state, commit }) {
      const list = state.cartList;
      commit("removeTotal", list);
    },
    increaseQuantity({ state, commit }, id) {
      const index = state.cartList.findIndex((cartItem) => cartItem.id === id);
      commit("increaseQuantity", index);
    },
    decreaseQuantity({ state, commit }, id) {
      const index = state.cartList.findIndex((cartItem) => cartItem.id === id);
      commit("decreaseQuantity", index);
    },
  },
  getters: {
    getCartTotal: (state) => {
      return state.cartList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
  },
});
