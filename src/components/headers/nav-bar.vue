<template>
  <ul>
    <router-link :to="{ name: 'home' }" exact>
      <a>Home</a>
    </router-link>
    <router-link to="/signin" @click="logmeout"> <a>Logout</a></router-link>
  </ul>
</template>

<script>
export default {
  name: "nav-bar",
  methods: {
    logmeout() {
      localStorage.clear();
      this.$router.push({ name: "signin" });
    },
  },
};
</script>

<style lang="scss" scoped>
$navcolor: #525a5a;
$fontcolor: darkcyan;
ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-bottom: 50px;
  padding: 10px;
  a {
    text-decoration: none;
    font-weight: bold;
    color: $fontcolor;
    padding: 10px;
  }
}
a.router-link-exact-active a,
ul a a:hover {
  color: $navcolor;
  box-shadow: 2px 2px 4px 0px $navcolor;
  border-radius: 3px;
}
</style>
