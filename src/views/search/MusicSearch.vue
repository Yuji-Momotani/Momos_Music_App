<template>
  <div class="music-search">
    <p class="text-2xl">楽曲情報検索アプリ</p>
    <Symbolicon/>

    <div v-if="AuthorizeTokun != ''" class="mt-16">
      <div>
        <router-link :to="{ name: 'SearchNowPlaying', params: {AuthorizationParam: AuthorizeTokun } }" class="no-underline hover:underline text-blue-300">1.SearchPlaying</router-link><br/>
      </div>
      <div class="mt-8">
        <router-link :to="{ name: 'SearchKeyword', params: {AuthorizationParam: AuthorizeTokun } }" class="no-underline hover:underline text-blue-300">2.SearchKeyword</router-link>
      </div>
      <div class="mt-8">
        <router-link :to="{ name: 'SearchDJNextTune', params: {AuthorizationParam: AuthorizeTokun } }" class="no-underline hover:underline text-blue-300">3.SearchDJNextTune</router-link>
      </div>
    </div>
    <div v-else class="mt-16">
      <div>
        <!-- <router-link to="/Certification">
          <p class="bg-green-500 hover:bg-green-400 text-white rounded py-1.5 px-2 w-32 m-auto">ログイン</p>
        </router-link> -->
        <!-- ↓↓仮 -->
        <button @click="sampleLogin" class="bg-green-500 hover:bg-green-400 text-white rounded py-1.5 px-2 w-32 m-auto">
          ログイン
        </button>
      </div>
      <div class="mt-8">
        <router-link to="/CertificationRecruiter" class="m mt-8">
          <p class="text-blue-300 underline hover:text-white inline-flex items-center m-auto">
            人事採用の方はこちらへ
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
  /* チラツキを抑える */
  [v-cloak]{
    display: none;
  }
</style>

<script>
import Symbolicon from '@/components/Symbolicon.vue';

export default {
  name:'MusicSearch',
  props: {
    routeParams: Object,
    AuthorizationParam: String
  },
  data(){
    return {
      AuthorizeTokun:''
    }
  },
  mounted: function() {
    if(this.routeParams.token_type && this.routeParams.access_token){
      this.AuthorizeTokun = this.routeParams.token_type + ' ' + this.routeParams.access_token
      this.$emit('Login',true,this.AuthorizeTokun)
    }else if(this.AuthorizationParam){
      this.AuthorizeTokun = this.AuthorizationParam
    }
  },
  methods:{
    sampleLogin:function(){
      // これは仮のログインボタン処理です。
      alert(`現在、ポートフォリオとしてのみ公開しております。のちに一般公開予定です。
人事採用の方は「人事採用の方はこちらへ」のリンクより遷移してください。`)
    }
  },
  components: {
    Symbolicon
  }
}
</script>
