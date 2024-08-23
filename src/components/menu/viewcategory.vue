<template>
  <navbar />
  <div class="container">
    <router-link
      :to="{
        name: 'menu',
        params: { locationid: locationid },
      }"
    >
      <button class="btn btn-dark">Back To Menu</button> </router-link
    >&nbsp;&nbsp;
    <router-link
      :to="{
        name: 'addnewcategory',
        params: { locationid: locationid },
      }"
    >
      <button class="btn btn-success">Add Categories</button>
    </router-link>
  </div>
</template>

<script>
import navbar from "../headers/nav-bar.vue";
import axios from "axios";
export default {
  name: "viewCategory",
  components: { navbar },
  data() {
    return {
      locationid: this.$route.params.locationid,
      username: "",
      userid: "",
      listoflocations: [],
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push("signin");
    } else {
      this.username = JSON.parse(user).name;
      this.userid = JSON.parse(user).id;
    }
    this.canuseraccessthislocation();
    this.getAllCategories();
  },
  methods: {
    async getAllCategories() {
      let result = await axios.get(
        `http://localhost:3000/categories?userid=${this.userid}&id=${this.locationid}`
      );
      if (result.status == 200) {
        this.listofcategories = result.data;
      } else {
        this.message = "Something Went Wrong...";
      }
    },
    async canuseraccessthislocation() {
      let result = await axios.get(
        `http://localhost:3000/locations?userid=${this.userid}&locationid=${this.locationid}`
      );
      if (result.status == 200) {
        this.listoflocations = result.data;
        if (this.listoflocations.length != 1) {
          this.$router.push("home");
        }
      }
    },
  },
};
</script>

<style></style>
