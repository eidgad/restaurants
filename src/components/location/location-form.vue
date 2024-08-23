<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      style="margin-left: 0; margin-right: 1142px"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add New Restaurant
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Add New Restaurant
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @click.prevent>
              <div class="aligned g-3 col-6 align-items-center">
                <div class="col-auto d-block mx-auto">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Restaurant Name"
                    v-model="Resturantname"
                  />
                  <span class="error-feedback" v-if="v$.Resturantname.$error">{{
                    v$.Resturantname.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <br />
              <div class="aligned g-3 col-6 align-items-center">
                <div class="col-auto d-block mx-auto">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone Number"
                    v-model="phone"
                  />
                  <span class="error-feedback" v-if="v$.phone.$error">{{
                    v$.phone.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <br />
              <div class="aligned g-3 col-6 align-items-center">
                <div class="col-auto d-block mx-auto">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Restaurant location"
                    v-model="location"
                  />
                  <span class="error-feedback" v-if="v$.location.$error">{{
                    v$.location.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <span
                class="done alert alert-success d-block"
                v-if="message.length"
                >{{ message }}</span
              >
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addrestaurant"
            >
              Add Restaurant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric } from "@vuelidate/validators";
export default {
  name: "location-form",
  data() {
    return {
      v$: useVuelidate(),
      Resturantname: "",
      phone: "",
      location: "",
      message: "",
      userid: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push("signup");
    } else {
      this.userid = JSON.parse(user).id;
    }
  },
  validations() {
    return {
      Resturantname: { required, minLength: minLength(3) },
      phone: { required, numeric, minLength: minLength(11) },
      location: { required },
    };
  },
  methods: {
    // async allows functions to run in parallel
    async addrestaurant() {
      this.v$.$validate();
      if (!this.v$.$error) {
        // await is to wait some time like using settimeout() to give a chance to request and response to be sent or recieved
        // result is the response
        let result = await axios.post("http://localhost:3000/locations", {
          Restaurantname: this.Resturantname,
          Phone: this.phone,
          location: this.location,
          userid: this.userid,
        });
        if (result.status == 201) {
          this.message = "Done!";
          setTimeout(() => {
            this.Resturantname = "";
            this.phone = "";
            this.location = "";
            this.message = "";
            this.v$.Resturantname.$errors[0].$message = "";
            this.v$.phone.$errors[0].$message = "";
            this.v$.location.$errors[0].$message = "";
          }, 3000);
        }
      }
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
}
.done {
  color: green;
  margin-top: 20px;
}
</style>
