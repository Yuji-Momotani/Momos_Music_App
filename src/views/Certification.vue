<template>
  <div class="">
    <h1 class="text-2xl py-2">
      認証画面
    </h1>
    <!-- <button @click="spotifyLogin" class="">認証</button> -->
    <div class="w-3/4 m-auto my-8">
      <p>
        一部の機能を使用するためには、Spotifyアカウントで認証が必要です。<br/>
        以下のボタンを押下して認証してください。
      </p>
      <p class="text-red-600 font-medium my-2">※Spotifyアカウントをお持ちで無い場合、作成が必要となります。</p>
    </div>
    <button 
      class="py-1.5 px-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
      @click="spotifyLogin">
      認証する
    </button>
  </div>
</template>

<script>
export default {
  name: 'Certification',
  methods: {
    spotifyLogin: function() {
      let endpoint = 'https://accounts.spotify.com/authorize'
      let response_type = 'token'
      let client_id = '6ecca994fa22486b808b122712ce91be'
      let redirect_uri = 'http://localhost:8080/login'
      let scope = 'user-read-currently-playing'
      location.href = endpoint + 
        '?response_type=' + response_type +
        '&client_id=' + client_id +
        '&redirect_uri=' + redirect_uri +
        '&scope=' + scope
    }
  },
  created: function() {
    if (this.$route.hash) {
      // this.$router.push(this.$route.fullPath.replace('#', '?'))
      console.log(this.$route)
    }
  },
}
</script>
