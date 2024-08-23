<template>
  <div>
    <form @click.prevent>
      <div class="aligned g-3 align-items-center">
        <h1 name="title">Edit Restaurant</h1>
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Restaurant Name"
            v-model="name"
          />
        </div>
      </div>
      <br />
      <div class="aligned g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="number"
            class="form-control"
            placeholder="Enter Phone Number"
            v-model="phone"
          />
          <span class="error-feedback" v-if="v$.phone.$error">{{
            v$.phone.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="aligned g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter address"
            v-model="address"
          />
          <span class="error-feedback" v-if="v$.address.$error">{{
            v$.address.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="aligned g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            type="submit"
            @click="updaterestaurant"
            class="btn btn-primary"
          >
            Update
          </button>
        </div>
      </div>
    </form>
    <span class="done alert alert-success d-block" v-if="message.length">{{
      message
    }}</span>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "edit-location",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      phone: "",
      address: "",
      userid: "",
      locationid: "",
      message: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
      phone: { required, numeric },
      address: { required },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signin" });
    } else {
      this.userid = JSON.parse(user).id;
      this.locationid = this.$route.params.locationid;
    }
    this.getinfo();
  },
  methods: {
    async getinfo() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.locationid}&userid=${this.userid}`
      );

      if (result.status == 200) {
        this.name = result.data[0].Restaurantname;
        this.phone = result.data[0].Phone;
        this.address = result.data[0].location;
      }
    },
    async updaterestaurant() {
      let result = await axios.put(
        `http://localhost:3000/locations/${this.locationid}`,
        {
          Restaurantname: this.name,
          Phone: this.phone,
          location: this.address,
          userid: this.userid,
        }
      );
      if (result.status == 200) {
        this.message = "Restaurant Info Updated Successfully...";
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 2000);
      } else {
        this.message = "Something Went Wrong...";
      }
    },
  },
};
</script>

<style></style>
