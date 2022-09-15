<template>
  <div class="home">
    <p class="normal-case text-4xl">Momo's Music App</p>
    <Symbolicon/>
    <di class="top mt-8">
      <p class="text-3xl">
        すべての人が音を楽しむ
      </p>
      <p class="mt-4">
        そんな世界を願ってこんなアプリつくりました。<br/>
        いかかでしょうか(笑)
      </p>
    </di>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- 元ソース
    <p class="normal-case text-4xl">Momo's Music App</p>
    <Symbolicon/>
    <di class="top mt-8">
      
      <p class="text-3xl">
        すべての人が音を楽しむ
      </p>
      <p class="mt-4">
        そんな世界を願ってこんなアプリつくりました。<br/>
        いかかでしょうか(笑)
      </p>
    </di>
    <div class="h-about mt-8">
      <p class="text-xl">
        1.このアプリについて
      </p>
      <router-link to="/about" class="cursor-pointer py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none">
        
        <img src="../assets/guitar.jpg" alt="ギターの画像" srcset="">
      </router-link>
      <p>アプリの概要や自己紹介をしてます。<br/>ぜひ覗いてみてくだいさ！！</p>

      <p class="text-xl mt-8">
        2.楽曲情報検索アプリ
      </p>
      <router-link to="/MusicSearch" class="cursor-pointer py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none">
        
        <img src="../assets/music_festival.png" alt="ギターの画像" srcset="">
      </router-link>
      <p>世界最大手の音楽ストリーミングサービスを<br/>提供するSpotifyさんのAPIを利用させて<br/>
          いただき、このアプリを作成いたしました。
      </p>
    </div> -->

    <!-- テスト -->
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-8 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="p-4 lg:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <!-- 画像1 -->
              <!-- <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog"> -->
              <img class="lg:h-48 w-full object-cover object-center" src="../assets/guitar.jpg" alt="ギターの画像" srcset="">
              <div class="p-6">
                <!-- <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2> -->
                <h1 class="title-font text-xl font-bold text-white mb-3">1.このアプリについて</h1>
                <p class="leading-relaxed mb-3 text-white">アプリの概要や自己紹介をしてます。ぜひ覗いてみてくだいさ！！</p>
                <div class="flex items-center flex-wrap ">
                  <router-link to="/about" class="text-indigo-500 inline-flex items-center lg:mb-0">Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </router-link>
                  <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 lg:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <!-- 画像2 -->
              <img class="lg:h-48 w-full object-cover object-center" src="../assets/music_festival.png" alt="フェスの画像">
              <div class="p-6">
                <!-- <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2> -->
                <h1 class="title-font text-2xl font-bold text-white mb-3">2.楽曲情報検索アプリ</h1>
                <p class="leading-relaxed text-white mb-3">世界最大手の音楽ストリーミングサービスを提供するSpotifyさんのAPIを利用させていただきました。</p>
                <div class="flex items-center flex-wrap">
                  <router-link to="/MusicSearch" class="text-indigo-500 inline-flex items-center lg:mb-0">Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </router-link>
                  <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 lg:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <!-- 画像3 -->
              <img class="lg:h-48 w-full object-cover object-center" src="https://dummyimage.com/722x402" alt="blog">
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Shooting Stars</h1>
                <p class="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                <div class="flex items-center flex-wrap ">
                  <a class="text-indigo-500 inline-flex items-center lg:mb-0">Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                  <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>

</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Symbolicon from '@/components/Symbolicon.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Symbolicon
  }
}
</script>
