<template>
  <div class="">
    <h1 class="text-2xl py-2">
      認証画面
    </h1>
    <div class="w-5/6 md:w-3/4 m-auto my-8">
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
    <div class="mt-8">
      <router-link to="/MusicSearch">
        <p class="text-blue-300 underline hover:text-white inline-flex items-center m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>戻る
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Certification',
  methods: {
    spotifyLogin: function() {
      let endpoint = 'https://accounts.spotify.com/authorize'
      let response_type = 'token'
      //let response_type = 'code'
      let state = 'state'
      let client_id = process.env.VUE_APP_CLIENT_ID
      let redirect_uri = process.env.VUE_APP_REDIRECT_URL
      //let scope = 'user-read-currently-playing'
      const scopes = ['streaming', 'user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private','user-read-currently-playing']
      location.href = endpoint + 
        '?response_type=' + response_type +
        '&client_id=' + client_id +
        '&redirect_uri=' + redirect_uri +
        // '&scope=' + scope
        '&scope=' + scopes.join(' ') +
        '&state=' + state
    }
  },
}
</script>
