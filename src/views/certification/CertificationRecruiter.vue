<!-- このページは2023/10以降、使用しない（ポートフォリオ用） -->

<template>
  <div class="CertificationRecruiter">
    <p class="text-2xl">人事採用担当者様専用<br/>ログインページ</p>
    <div class="w-5/6 md:w-3/4 m-auto mt-8">
      <p>以下、パスワードに転職サイトのプロフィールに記載されているパスワードを入力の上認証情報を取得してください。</p>
      <p class="text-red-600 w-5/6 md:w-3/4 m-auto mt-4">
        以下で取得できるアカウント情報は誰でも作成できる無料アカウントです。
        アカウントを使った迷惑行為や悪質な行為はご遠慮ください。
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
      E-Mail：
          <input type="text" readonly class="text-xl font-bold bg-main-background-color border-none w-72" id="e-mail" value="kilroy_here1016@yahoo.co.jp">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" @click="clipboardCopy('e-mail')" class="w-6 h-6 inline-block cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          <p class="inline-block" id="copied1" v-show="isCopiedEmail">Copied!!</p>
          <br/>
      Password：
        <input type="text" readonly class="text-xl font-bold bg-main-background-color border-none w-52" id="password" value="MomosMusic336454">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" @click="clipboardCopy('password')" class="w-6 h-6 inline-block cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
        <p class="inline-block" id="copied2" v-show="isCopiedPassword">Copied!!</p>
        <br/>
      <button 
        class="py-1.5 px-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 mt-4"
        id="certification_btn"
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
      isLoginDataShow:false,
      isCopiedEmail:false,
      isCopiedPassword:false,
    }
  },
  // watch:{
  //   isCopiedEmail:function(newBool){
  //     if(newBool){
  //       alert(this.isCopiedEmail)
  //       window.setTimeout(function(){
  //         this.isCopiedEmail = false
  //         alert(this.isCopiedEmail)
  //       }, 2000);
  //       this.isCopiedEmail = false
  //     }
  //   },
  //   isCopiedPassword:function(newBool){
  //     if(newBool){
  //       window.setTimeout(function(){
  //         console.log(this.isCopiedPassword)
  //         this.isCopiedPassword = false
  //       }, 2000);
  //     }
  //   }
  // },
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
      
      // window.open( endpoint + 
      //   '?response_type=' + response_type +
      //   '&client_id=' + client_id +
      //   '&redirect_uri=' + redirect_uri +
      //   // '&scope=' + scope
      //   '&scope=' + scopes.join(' ') +
      //   '&state=' + state
      //   , 'LoginWindow', 'width=700,height=700,status=0,menubar=0,toolbar=0')
    },
    getLoginAccount: function() {
      if(this.password==="TestLog2210"){
        this.isLoginDataShow=true
      }else{
        this.isLoginDataShow=false
      }
    },
    clipboardCopy:function(id){
      let textarea = document.getElementById(id);
      let selout = document.getElementById('certification_btn');
      textarea.focus()
      textarea.select()
      document.execCommand("copy")
      selout.focus()

      if(id==="e-mail"){
        this.isCopiedEmail = true
      }else{
        this.isCopiedPassword = true
      }
    },
    // copyToClipboard:()=>{
    // let text = document.querySelector('.copy').value;
    // navigator.clipboard.writeText(text)
    //     .then(
    //         success => alert('テキストのコピーに成功?'),
    //         error => alert('テキストのコピーに失敗?')
    //     )
    // }

  },
}
</script>
