import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Index from '@/components/Index.vue';
import AddPhone from '@/components/AddPhone.vue';
import EditPhone from '@/components/EditPhone.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/add-phone",
    name: "AddPhone",
    component: AddPhone,
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
  {
    path: "/edit-phone/:phone_slug",
    name: "EditPhone",
    component: EditPhone,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
