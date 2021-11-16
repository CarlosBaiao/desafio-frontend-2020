<template>
  <div class="data container">
    <form>
      <div class="data-user">
        <div class="input-field">
          <label for="">{{ formData.name.label }}</label>
          <input
            type="text"
            v-model="formData.name.value"
            @blur="formData.name.isValid"
            :class="{ error: !formData.name.valid }"
          />
          <p class="error-messege" v-if="!formData.name.valid">
            {{ formData.name.errorMessege }}
          </p>
        </div>
        <div class="input-field">
          <label for="">{{ formData.email.label }}</label>
          <input
            type="text"
            v-model="formData.email.value"
            @blur="formData.email.isValid"
            :class="{ error: !formData.email.valid }"
          />
          <p class="error-messege" v-if="!formData.email.valid">
            {{ formData.email.errorMessege }}
          </p>
        </div>
        <div class="input-field">
          <label for="">{{ formData.cpf.label }}</label>
          <input
            type="text"
            v-model="formData.cpf.value"
            @blur="formData.cpf.isValid"
            :class="{ error: !formData.cpf.valid }"
            v-mask="'###.###.###-##'"
          />
          <p class="error-messege" v-if="!formData.cpf.valid">
            {{ formData.cpf.errorMessege }}
          </p>
        </div>
        <div class="birthAndPhone row">
          <div class="input-field col">
            <label for="">{{ formData.birth.label }}</label>
            <input
              type="text"
              placeholder="dd/mm/yy"
              v-model="formData.birth.value"
              @blur="formData.birth.isValid"
              :class="{ error: !formData.birth.valid }"
              v-mask="'##/##/####'"
            />
            <p class="error-messege" v-if="!formData.birth.valid">
              {{ formData.birth.errorMessege }}
            </p>
          </div>
          <div class="input-field col">
            <label for="">{{ formData.phone.label }}</label>
            <input
              type="text"
              v-model="formData.phone.value"
              @blur="formData.phone.isValid"
              :class="{ error: !formData.phone.valid }"
              v-mask="'(##) # ####-####'"
            />
            <p class="error-messege" v-if="!formData.phone.valid">
              {{ formData.phone.errorMessege }}
            </p>
          </div>
        </div>
      </div>
      <div class="address-user">
        <div class="input-field">
          <label for="">{{ formData.cep.label }}</label>
          <input
            type="text"
            v-model="formData.cep.value"
            @blur="getCep"
            :class="{ error: !formData.cep.valid }"
            v-mask="'#####-###'"
          />
          <p class="error-messege" v-if="!formData.cep.valid">
            {{ formData.cep.errorMessege }}
          </p>
        </div>
        <div class="addressAndNumber row">
          <div class="input-field col-8">
            <label for="">{{ formData.address.label }}</label>
            <input
              type="text"
              v-model="formData.address.value"
              @blur="formData.address.isValid"
              :class="{ error: !formData.address.valid }"
            />
            <p class="error-messege" v-if="!formData.address.valid">
              {{ formData.address.errorMessege }}
            </p>
          </div>
          <div class="input-field col-4">
            <label for="">{{ formData.number.label }}</label>
            <input
              type="text"
              v-model="formData.number.value"
              @blur="formData.number.isValid"
              :class="{ error: !formData.number.valid }"
            />
            <p class="error-messege" v-if="!formData.number.valid">
              {{ formData.number.errorMessege }}
            </p>
          </div>
        </div>
        <div class="complementAndDistrict row">
          <div class="input-field col">
            <label for="">{{ formData.complement.label }}</label>
            <input type="text" v-model="formData.complement.value" />
          </div>
          <div class="input-field col">
            <label for="">{{ formData.district.label }}</label>
            <input
              type="text"
              v-model="formData.district.value"
              @blur="formData.district.isValid"
              :class="{ error: !formData.district.valid }"
            />
            <p class="error-messege" v-if="!formData.district.valid">
              {{ formData.district.errorMessege }}
            </p>
          </div>
        </div>
        <div class="cityAndState row">
          <div class="input-field col-7">
            <label for="">{{ formData.city.label }}</label>
            <input
              type="text"
              v-model="formData.city.value"
              @blur="formData.city.isValid"
              :class="{ error: !formData.city.valid }"
            />
            <p class="error-messege" v-if="!formData.city.valid">
              {{ formData.city.errorMessege }}
            </p>
          </div>
          <div class="input-field col-5">
            <label for="">{{ formData.state.label }}</label>
            <input
              type="text"
              v-model="formData.state.value"
              @blur="formData.state.isValid"
              :class="{ error: !formData.state.valid }"
            />
            <p class="error-messege" v-if="!formData.state.valid">
              {{ formData.state.errorMessege }}
            </p>
          </div>
        </div>
      </div>
    </form>
    <Modal :show="showModal" />
    <div class="button-container container">
      <button @click="checkoutItens">Concluir compra</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/Modal.vue";

export default {
  name: "Data",
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      formData: {
        name: {
          value: "",
          errorMessege: "O nome é obrigatório",
          label: "Nome*",
          valid: true,
          isValid: () => {
            this.formData.name.valid = !!this.formData.name.value.length;
          },
        },
        email: {
          value: "",
          errorMessege: "O email é obrigatório",
          label: "Email*",
          valid: true,
          isValid: () => {
            this.formData.email.valid = this.validEmail(
              this.formData.email.value
            );
          },
        },
        cpf: {
          value: "",
          errorMessege: "O CPF é obrigatório",
          label: "CPF*",
          valid: true,
          isValid: () => {
            this.formData.cpf.valid = this.formData.cpf.value.length === 14;
          },
        },
        birth: {
          value: "",
          errorMessege: "A data de nascimento é obrigatório",
          label: "Data de nascimento*",
          valid: true,
          isValid: () => {
            this.formData.birth.valid = this.formData.birth.value.length === 10;
          },
        },
        phone: {
          value: "",
          errorMessege: "O telefone é obrigatório",
          label: "Telefone*",
          valid: true,
          isValid: () => {
            this.formData.phone.valid = this.formData.phone.value.length === 16;
          },
        },
        cep: {
          value: "",
          errorMessege: "O CEP não foi encontrado",
          label: "CEP*",
          valid: true,
          isValid: () => {
            this.formData.cep.valid = this.formData.cep.value.length === 9;
          },
        },
        address: {
          value: "",
          errorMessege: "O endereço é obrigatório",
          label: "Endereço*",
          valid: true,
          isValid: () => {
            this.formData.address.valid = !!this.formData.address.value.length;
          },
        },
        number: {
          value: "",
          errorMessege: "O número é obrigatório",
          label: "Número*",
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
        complement: {
          value: "",
          label: "Complemento",
        },
        district: {
          value: "",
          errorMessege: "O bairro é obrigatório",
          label: "Bairro*",
          valid: true,
          isValid: () => {
            this.formData.district.valid =
              !!this.formData.district.value.length;
          },
        },
        city: {
          value: "",
          errorMessege: "A cidade é obrigatório",
          label: "Cidade*",
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
        state: {
          value: "",
          errorMessege: "O estado é obrigatório",
          label: "Estado*",
          valid: true,
          isValid: () => {
            this.formData.state.valid = !!this.formData.state.value.length;
          },
        },
      },
      baseUrl: "https://viacep.com.br/ws/",
      response: "",
    };
  },
  computed: {
    haveCep() {
      return this.response === "";
    },
    isUserValid() {
      let isValid = true;
      isValid &= this.formData.name.valid;

      isValid &= this.formData.cpf.valid;
      isValid &= this.formData.birth.valid;
      isValid &= this.formData.phone.valid;
      isValid &= this.formData.address.valid;
      isValid &= this.formData.number.valid;
      isValid &= this.formData.district.valid;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.state.valid;
      return isValid;
    },
  },

  methods: {
    triggerValidations() {
      this.formData.name.isValid();
      this.formData.email.isValid();
      this.formData.cpf.isValid();
      this.formData.birth.isValid();
      this.formData.phone.isValid();
      this.formData.cep.isValid();
      this.formData.address.isValid();
      this.formData.number.isValid();
      this.formData.district.isValid();
      this.formData.city.isValid();
      this.formData.state.isValid();
    },
    checkoutItens() {
      this.triggerValidations();
      if (!this.isUserValid) return;
      this.showModal = true;
    },
    validEmail: function (email) {
      var emailValid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailValid.test(email);
    },
    getCep() {
      const url = `${this.baseUrl}${this.formData.cep.value}/json/`;
      axios.get(url).then((resp) => {
        const data = resp.data;
        if (!data.erro) {
          this.response = data;
          this.completeCep();
          this.formData.cep.isValid();
          this.formData.address.isValid();
          this.formData.district.isValid();
          this.formData.city.isValid();
          this.formData.state.isValid();
        } else {
          this.formData.cep.valid = false;
        }
      });
    },
    completeCep() {
      if (!this.haveCep) {
        this.formData.city.value = this.response.localidade;
        this.formData.address.value = this.response.logradouro;
        this.formData.district.value = this.response.bairro;
        this.formData.state.value = this.response.uf;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.data {
  margin: 100px auto;

  form {
    display: flex;

    input {
      margin-bottom: 10px;
    }

    .data-user,
    .address-user {
      width: 100%;
      margin: 0 10px;
    }

    .input-field {
      display: flex;
      flex-direction: column;
    }

    .error-messege {
      font-size: 0.9rem;
      color: @red;
    }
  }

  .button-container {
    display: flex;
    justify-content: end;

    button {
      width: 270px;
      height: 45px;
      margin: 70px 0;
      padding: 0;
      border: none;
      border-top: 1px solid @light-grey;
      background: @purple;

      color: @white;
      text-transform: uppercase;

      &:hover {
        font-family: "SourceSansBold", "sans-serif";
      }
    }
  }

  @media @tablets {
    form {
      flex-direction: column;
      .address-user {
        margin: 30px 10px;
      }
    }
    .button-container {
      justify-content: center;
    }
  }
}
</style>
