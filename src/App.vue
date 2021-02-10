<template>
  <v-app>
   <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Navbar from  './components/Navbar_Sidebar';
import Footer from './components/Footer';
import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Navbar,
    Footer
  },

  async mounted() {
    const auth = firebase.auth()
    setTimeout(()=>{
      const user = auth.currentUser
      this.$store.dispatch('setToken',user.email)
      this.$store.dispatch('getPosts')
      this.$store.dispatch('getInfo')
      this.$router.push('/')
    },500)

  }
};
</script>


