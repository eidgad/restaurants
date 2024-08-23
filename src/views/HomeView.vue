<template>
  <div class="home">
    <navbar />
    <p>
      Welcome
      <span style="font-weight: bold">{{ username }} <span></span></span>
      <router-link :to="{ name: 'profile' }"
        ><button class="btn btn-dark">Edit Profile</button></router-link
      >
    </p>
    <locationForm />
    <br />
  </div>
  <userlocation :locations="locations" />
</template>
<script>
// @ is an alias to /src
import navbar from "@/components/headers/nav-bar.vue";
import locationForm from "@/components/location/location-form.vue";
import userlocation from "@/components/location/user-location.vue";
import axios from "axios";
export default {
  name: "HomeView",
  components: { navbar, locationForm, userlocation },
  data() {
    return {
      username: "",
      locations: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signin" });
    } else {
      this.username = JSON.parse(user).name;
    }
    let result = await axios.get(`http://localhost:3000/locations`);
    this.locations = result.data;
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 0 20px;
}
p:first-of-type {
  font-size: 20px;
  color: #333;
  text-align: left;
}
</style>
