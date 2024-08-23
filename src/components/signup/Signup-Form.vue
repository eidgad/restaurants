<template>
  <form @click.prevent>
    <div class="aligned g-3 align-items-center">
      <h1>Sign Up</h1>
      <div class="col-auto d-block mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Name"
          v-model="name"
        />
      </div>
    </div>
    <br />
    <div class="aligned g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="email"
          class="form-control"
          placeholder="Enter Email"
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
          placeholder="Enter Password"
          v-model="password"
        />
        <span class="error-feedback" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="aligned g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="submit" @click="signup" class="btn btn-primary">
          Sign Up
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "Signup-Form",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "signin" });
    }
  },
  methods: {
    // async allows functions to run in parallel
    async signup() {
      // this will active the validation
      this.v$.$validate();
      if (!this.v$.$error) {
        // await is to wait some time like using settimeout() to give a chance to request and response to be sent or recieved
        // result is the response
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        if (result.status == 201) {
          // save user data in local storage
          // json.stringify(result.data) will convert the data in the response to the json format
          localStorage.setItem("user-info", JSON.stringify(result.data));
          // redirect to the path which has a name 'home'
          this.$router.push({ name: "home" });
        }
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
