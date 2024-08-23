<template>
  <NavBar />
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <h1>Delete Restaurant</h1>
        <p class="text-danger">
          Are you sure you want to delete this location?
        </p>
        <span style="font-weight: bold; font-size: 20px">
          {{ name.toUpperCase() }}
        </span>
        <br />
        <span style="text-transform: capitalize; font-size: 18px">{{
          address
        }}</span>
        <br />
        {{ phone }}
        <br />
        <br />
        <button class="btn btn-primary" @click="redirecthome">Go Back</button>
        <!-- this &nbsp means none break space and this mean that take a space without breaking line -->
        &nbsp;&nbsp;&nbsp;
        <button class="btn btn-danger" @click="deleterestaurant()">
          Delete Now
        </button>
      </div>
    </div>
    <span class="done alert alert-success d-block" v-if="message.length">{{
      message
    }}</span>
  </form>
</template>

<script>
import NavBar from "@/components/headers/nav-bar.vue";
import axios from "axios";
export default {
  name: "deleteLocation",
  components: { NavBar },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      userid: "",
      locationid: "",
      locationdata: [],
      message: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signup" });
    } else {
      this.userid = JSON.parse(user).id;
      this.locationid = this.$route.params.locationid;
      this.canuseraccessthislocation();
    }
  },
  methods: {
    redirecthome() {
      this.$router.push({ name: "home" });
    },
    async canuseraccessthislocation() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.locationid}&userid=${this.userid}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.locationdata = result.data;
        this.name = this.locationdata[0].Restaurantname;
        this.address = this.locationdata[0].location;
        this.phone = this.locationdata[0].Phone;
      } else {
        this.$router.push({ name: "home" });
      }
    },
    async deleterestaurant() {
      let result = await axios.delete(
        `http://localhost:3000/locations/${this.locationid}`
      );
      if (result.status == 200) {
        this.message = "Location Is Deleted...";
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 2000);
      } else {
        this.message = "Not Deleted!";
      }
    },
  },
};
</script>

<style></style>
