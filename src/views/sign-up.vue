<template>
  <div class="container">
    <signupform />
  </div>
  <div class="redirect">
    <p>Already have an account? <a href="/signin">sign-in</a></p>
  </div>
</template>

<script>
import Signupform from "@/components/signup/Signup-Form.vue";
export default {
  components: { Signupform },
};
</script>

<style>
.redirect {
  margin-top: 20px;
}
</style>
