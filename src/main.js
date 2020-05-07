import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Navbar from '@/components/Navbar.vue';
import AddPhone from '@/components/AddPhone.vue';
import EditPhone from '@/components/EditPhone.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
Vue.config.productionTip = false;

Vue.component('Navbar',Navbar)
Vue.component('AddPhone',AddPhone)
Vue.component('EditPhone',EditPhone)
Vue.component('Signup',Signup)
Vue.component('Login',Login)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
