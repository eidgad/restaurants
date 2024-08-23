<template>
  <div class="container">
    <SigninForm />
  </div>
  <div class="redirect">
    <p>Don't have an account? <a href="/signup">sign-up</a></p>
  </div>
</template>

<script>
import SigninForm from "@/components/signin/Signin-Form.vue";
export default {
  components: { SigninForm },
};
</script>

<style scoped>
.redirect {
  margin-top: 20px;
}
</style>
