<template>
  <div class="modal-success" v-if="show">
    <div class="modal-success--container">
      <div
        class="modal-success--close"
        v-html="closeIcon"
        @click="returnStore"
      ></div>
      <div class="modal-success--content">
        <Check class="check" />
        <p>Seu cadastro foi solicitado com sucesso</p>
        <p @click="returnStore" class="back-info">
          <Back class="back-icon" />Voltar para home
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import Check from "../assets/icons/check.svg";
import Back from "../assets/icons/left-arrow.svg";
export default {
  name: "Modal",
  components: {
    Check,
    Back,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    closeIcon() {
      return feather.icons.x.toSvg();
    },
  },
  methods: {
    returnStore() {
      this.$router.push({ name: "Home" });
      this.$store.state.cartList = [];
    },
  },
};
</script>

<style lang="less" scoped>
.modal-success {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);

  &--container {
    background: @white;
    width: 600px;
    padding: 30px;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }

  &--close {
    text-align: right;
    cursor: pointer;
  }

  &--content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: @dark-grey;

    .check {
      margin: 10px 0;
      color: @green;
    }

    .back-info {
      color: @purple;
      cursor: pointer;
      .back-icon {
        margin-right: 10px;
        path {
          fill: @purple;
        }
      }
    }
  }

  @media @tablets {
    &--container {
      width: 300px;

      p {
        text-align: center;
      }
    }
  }
}
</style>
