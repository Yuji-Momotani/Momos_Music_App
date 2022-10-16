<template>
  <div class="CertificationRecruiter">
    <p class="text-2xl">人事採用担当者様専用<br/>ログインページ</p>
    <div class="w-5/6 md:w-3/4 m-auto mt-8">
      <p>以下、パスワードに転職サイトのプロフィールに記載されているパスワードを入力の上認証情報を取得してください。</p>
      <p class="text-red-600 w-5/6 md:w-3/4 m-auto mt-4">
        以下で取得できるアカウント情報は誰でも作成できる無料アカウントです。
        アカウントを使った迷惑行為や悪質なセキュリティ攻撃はご遠慮ください。
        なお、下記アカウントやe-mailは転職活動期終了後速やかに削除いたします。
      </p>
    </div>
    <div class="mt-8">
      パスワード：
      <input type="text" class="text-black w-32" v-model="password">
      <button 
          class="px-4 ml-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          @click="getLoginAccount">
        確定
      </button>
    </div>
    <div v-if="isLoginDataShow" class="mt-4">
      email:[kilroy_here1016@yahoo.co.jp] <br/>
      password:[MomosMusic336454]<br/>
      <button 
        class="py-1.5 px-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 mt-4"
        @click="spotifyLogin">
        認証する
      </button>
    </div>
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
  name: 'CertificationRecruiter',
  data(){
    return {
      password:'',
      isLoginDataShow:false
    }
  },
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
    },
    getLoginAccount: function() {
      if(this.password==="TestLog2210"){
        this.isLoginDataShow=true
      }else{
        this.isLoginDataShow=false
      }
    }
  },
}
</script>
