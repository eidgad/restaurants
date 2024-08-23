<template>
  <navbar />
  <div>
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
        name: 'viewcategory',
        params: { locationid: locationid },
      }"
    >
      <button class="btn btn-dark">Back To Category</button>
    </router-link>
  </div>
</template>

<script>
import navbar from "../headers/nav-bar.vue";

export default {
  name: "addNewCategory",
  components: {
    navbar,
  },
  data() {
    return {
      locationid: this.$route.params.locationid,
    };
  },
};
</script>

<style></style>
