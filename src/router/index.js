import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import signup from "../views/sign-up.vue";
import signin from "../views/sign-in.vue";
import profile from "../views/profile.vue";
import errorpage from "../views/errorpage.vue";
import deletelocation from "../components/location/deletelocation.vue";
import editlocation from "../components/location/editlocation.vue";
import menu from "../components/menu/menu.vue";
import viewcategory from "../components/menu/viewcategory.vue";
import addnewcategory from "../components/menu/addNewCategory.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
  },
  {
    path: "/signin",
    name: "signin",
    component: signin,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
  {
    path: "/deletelocation/:locationid",
    name: "deletelocation",
    component: deletelocation,
  },
  {
    path: "/editlocation/:locationid",
    name: "editlocation",
    component: editlocation,
  },
  {
    path: "/menu/:locationid",
    name: "menu",
    component: menu,
  },
  {
    path: "/menu/categories/view/:locationid",
    name: "viewcategory",
    component: viewcategory,
  },
  {
    path: "/menu/categories/add/:locationid",
    name: "addnewcategory",
    component: addnewcategory,
  },
  {
    path: "/:catchAll(.*)",
    name: "errorpage",
    component: errorpage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});
export default router;
