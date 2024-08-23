<template>
  <navbar />
  <div class="container">
    <div>
      <router-link
        :to="{
          name: 'viewcategory',
          params: { locationid: locationid },
        }"
      >
        <button class="btn btn-success float-start">View/Add Categories</button>
      </router-link>
      <button class="btn btn-success float-end">Add New Items</button>
    </div>
    <div class="clearfix">is user logged in? {{ isuserloggedin }}</div>
    <div>{{ listofcategories.length }}</div>
    <div>{{ listofcategories }}</div>
    <div class="done alert alert-danger" v-if="message.length > 0">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "../headers/nav-bar.vue";
export default {
  name: "res-menu",
  components: { navbar },
  data() {
    return {
      username: "",
      userid: "",
      locationid: this.$route.params.locationid,
      isuserloggedin: "",
      listofcategories: [],
      message: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signin" });
      this.isuserloggedin = false;
    } else {
      this.username = JSON.parse(user).name;
      this.userid = JSON.parse(user).id;
      this.isuserloggedin = true;
    }
    this.getAllCategories();
  },
  methods: {
    async getAllCategories() {
      let result = await axios.get(
        `http://localhost:3000/categories?userid=${this.userid}&locationid=${this.locationid}`
      );
      if (result.status == 200) {
        this.listofcategories = result.data;
        this.numofcategories = this.listofcategories.length;
      } else {
        this.message = "Something Went Wrong...";
      }
    },
  },
};
</script>

<style></style>
