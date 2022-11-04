<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <MenuLink @Login="loginEvent" :isSpotifyLogin="loginUserData.isSpotifyLogin" :AuthorizeTokun="access_tokun"/>
    </header>
    <main class="flex-grow">
      <router-view @Login="loginEvent"/>
    </main>
    <footer class="bg-gray-800">
      <Footer />
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color:#2c3e50;
  height: 100%;
}

.bg-main-background-color{
  background-color:#2c3e50;
}
.pre-line{
  white-space: pre-line;
}
</style>
<script>
// @ is an alias to /src
import MenuLink from './components/MenuLink.vue'
import Footer from './components/Footer.vue'
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
    MenuLink,
    Footer
  },
  methods: {
    loginEvent:function(isLogin,access_token){
      this.loginUserData.isSpotifyLogin = isLogin
      this.access_tokun = access_token
    }
  }
}
</script>