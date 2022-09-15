<template>
  <div class="pb-12">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <!-- <MenuLink links="{ name:'Home', path:'/' }"/> -->
    <MenuLink @Login="loginEvent" :isSpotifyLogin="loginUserData.isSpotifyLogin" :AuthorizeTokun="access_tokun"/>
    <router-view @Login="loginEvent"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: white;
  background-color:#2c3e50;
  height: 100%;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
  .pre-line{
    white-space: pre-line;
  }
</style>
<script>
// @ is an alias to /src
import MenuLink from './components/MenuLink.vue'
export default {
  name: 'Menu',
  data() {
    return {
      loginUserData:{
        isSpotifyLogin :false,
        access_tokun:''
      }

    }
  },
  components: {
    MenuLink
  },
  methods: {
    loginEvent:function(isLogin,access_token){
      this.loginUserData.isSpotifyLogin = isLogin
      this.access_tokun = access_token
    }
  }
}
</script>