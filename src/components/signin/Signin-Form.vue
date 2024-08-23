<template>
  <form @click.prevent>
    <div class="aligned g-3 align-items-center">
      <h1>Sign In</h1>
      <div class="col-auto d-block mx-auto">
        <input
          type="email"
          class="form-control"
          placeholder="Enter Your Email"
          v-model="email"
        />
        <span class="error-feedback" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="aligned g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
          v-model="password"
        />
        <span class="error-feedback" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <span class="error-feedback" v-if="error">no data found</span>
    <div class="aligned g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button @click="login" type="submit" class="btn btn-primary">
          Sign In
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "Signin-Form",
  data() {
    return {
      email: "",
      password: "",
      v$: useVuelidate(),
      error: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.error = false;
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "home" });
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
.aligned {
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
.error-feedback {
  color: red;
}
</style>
