<template>
  <table class="table caption-top" v-if="locations.length > 0">
    <caption style="width: 97%; margin-left: auto; margin-right: auto">
      list of locations: ({{
        locations.length
      }})
    </caption>
    <thead class="table-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(loc, i) in locations" :key="i">
        <td>{{ loc.Restaurantname }}</td>
        <td>{{ loc.Phone }}</td>
        <td>{{ loc.location }}</td>
        <td>
          <router-link
            :to="{ name: 'deletelocation', params: { locationid: loc.id } }"
          >
            <button class="btn btn-danger">Delete</button>
          </router-link>
          &nbsp;
          <router-link
            :to="{ name: 'editlocation', params: { locationid: loc.id } }"
          >
            <button class="btn btn-primary">Edit</button>
          </router-link>
          &nbsp;
          <router-link
            :locationa="locations"
            :to="{ name: 'menu', params: { locationid: loc.id } }"
          >
            <button class="btn btn-success">Menu</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="alert alert-warning" role="alert">
    No Locations Added Yet
  </div>
</template>

<script>
export default {
  name: "user-location",
  props: ["locations"],
};
</script>

<style>
.table {
  width: 90%;
  text-transform: capitalize;
  margin-left: auto;
  margin-right: auto;
}
tbody > tr > td:first-of-type {
  font-size: 20px;
}
</style>
