import '@morioh/v-lightbox/dist/lightbox.css'
import Lightbox from '@morioh/v-lightbox'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UUID from "vue-uuid";

import "./firebaseInit";
import firebase from "firebase";

Vue.config.productionTip = false

// global register
Vue.use(Lightbox);
Vue.use(UUID);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  Lightbox,
  UUID,
  render: h => h(App),
}).$mount('#app')
