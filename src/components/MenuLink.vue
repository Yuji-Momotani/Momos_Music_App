<template>
  <div class="flex flex-wrap py-2 mb-8 bg-green-300">
    <div class="w-full px-2">
      <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-lime-500 rounded">
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
            <button @click="backHome" class="text-sm font-bold leading-relaxed inline-block px-1 py-2 whitespace-nowrap uppercase text-white">
              <p class="normal-case">Momo's Music App <span class="text-xs">~{{subTitle}}~</span></p>
            </button>
            <div class="flex flex-wrap">
              <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
                <!-- ハンバーガーメニューアイコン -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- 画面幅がLarge以上の時のメニュー Satrt -->
          <div class="lg:flex lg:flex-grow items-center hidden">
            <ul v-if="isSpotifyLogin" class="lg:flex flex-col lg:flex-row list-none ml-auto">
              <!-- ログインしている時 -->
              <li class="nav-item">
                <router-link :to="{ name: 'MusicSearch', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">楽曲情報検索アプリTop</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'SearchNowPlaying', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">SearchPlaying</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'SearchKeyword', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">SearchKeyword</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'SearchDJNextTune', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">SearchDJNextTune</router-link>
              </li>
            </ul>
            <ul v-else  class="lg:flex flex-col lg:flex-row list-none ml-auto">
              <li class="nav-item" v-for="(link,n) in linksName" v-bind:key="n">
                <!-- ログインしていない時 -->
                <router-link :to="linksPath[n]" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">
                  {{link}}
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 画面幅がLarge以上の時のメニュー End -->

          <!-- ハンバーガメニューの内容(画面幅がmiddle以下) Start -->
          <div v-bind:class="{'hidden': !menuShow, 'flex': menuShow}" class="flex lg:flex-grow items-center lg:hidden">
            <ul class="flex flex-col lg:flex-row list-none ml-auto">
              <div v-if="isSpotifyLogin">
                <!-- ログインしている時 -->
                <li class="nav-item">
                  <router-link :to="{ name: 'MusicSearch', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">楽曲情報検索アプリTop</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'SearchNowPlaying', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">SearchPlaying</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'SearchKeyword', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">SearchKeyword</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'SearchDJNextTune', params: {AuthorizationParam: AuthorizeTokun } }" class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">SearchDJNextTune</router-link>
                </li>
              </div>
              <div v-else>
                <li class="nav-item" v-for="(link,n) in linksName" v-bind:key="n">
                  <!-- ログインしていない時 -->
                  <router-link :to="linksPath[n]" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    {{link}}
                  </router-link>
                </li>
              </div>
            </ul>
          </div>
          <!-- ハンバーガメニューの内容(画面幅がmiddle以下) End -->
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "lime-menu",
  data() {
    return {
      menuShow: false,
      linksName:['Home','このアプリについて','楽曲情報検索アプリ','Piano App'],
      linksPath:['/','/about','/MusicSearch','/Piano'],
      subTitle:'Top'
    }
  },
  methods: {
    toggleNavbar: function(){
      this.menuShow = !this.menuShow;
    },
    backHome:function(){
      this.$emit('Login',false,'')
      this.$router.push('/')
    }
  },
  props:{
    isSpotifyLogin:Boolean,
    AuthorizeTokun:String,
  },
  watch:{
    isSpotifyLogin: function(newBool){
      if(newBool){
        this.subTitle='MusicSearch'
        this.linksName = ['楽曲情報検索アプリTop','SearchPlaying','SearchKeyword','SearchDJNextTune']
        this.linksPath = ['/MusicSearch','/MusicSearch/SearchNowPlaying','/MusicSearch/SearchKeyword','/MusicSearch/SearchDJNextTune']
      }else{
        this.subTitle='Top'
        this.linksName = ['Home','このアプリについて','楽曲情報検索アプリ']
        this.linksPath = ['/','/about','/MusicSearch']
      }
    }
  }
}
</script>

