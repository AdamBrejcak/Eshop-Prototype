<template>
  <div id="app">

    <Navigation/>
    <User v-if="user.loggedIn"/>
    <router-view/>
    <Footer/>

  </div>
</template>

<script>


import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import User from "./components/User.vue"
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    }
  },
  name: 'App',
  components: {
    Navigation,
    Footer,
    User
  },
  computed: {
  ...mapGetters({
      user: "user"
    })
  },
  async mounted () {
    await this.$store.commit('GETSECTIONS')
    await this.$store.commit('GETORDERS')
    
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400&display=swap');
body{
  margin: 0 0;
   overflow-x: hidden;
   min-width: 300px;
}
#app {
  position: relative;
  font-family: 'Lato', Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  width: 100%;
  height: fit-content;
  background-color: white;
  color: #000;
}
button{
  cursor: pointer;
}
</style>
