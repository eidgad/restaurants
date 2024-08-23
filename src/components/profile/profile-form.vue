<template>
  <div>
    <form @click.prevent>
      <div class="aligned g-3 align-items-center">
        <h1 name="title">Edit Profile</h1>
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
          <button type="submit" @click="updateprofile" class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "profile-form",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      password: "",
      userid: "",
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
    if (!user) {
      this.$router.push({ name: "signin" });
    } else {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.password = JSON.parse(user).password;
      this.userid = JSON.parse(user).id;
    }
  },
  methods: {
    async updateprofile() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.put(
          `http://localhost:3000/users/${this.userid}`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.$router.push({ name: "home" });
        }
      }
    },
  },
};
</script>

<style>
.aligned {
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
</style>
