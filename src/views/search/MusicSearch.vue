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
        <router-link to="/Certification">
          <p class="bg-green-500 hover:bg-green-400 text-white rounded py-1.5 px-2 w-32 m-auto">ログイン</p>
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
  components: {
    Symbolicon
  }
}
</script>
