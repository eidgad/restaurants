<template>
  <div>
    <navbar />
    <ProfileForm />
  </div>
</template>
<script>
import navbar from "@/components/headers/nav-bar.vue";
import ProfileForm from "@/components/profile/profile-form.vue";
export default {
  name: "profile-info",
  components: { navbar, ProfileForm },
};
</script>

<style></style>
