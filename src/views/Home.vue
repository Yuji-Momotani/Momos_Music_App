<template>
  <div class="home">
    <h1 class="normal-case text-4xl">Momo's Music App</h1>
    <Symbolicon/>
    <di class="top mt-8">
      <p class="text-3xl">
        すべての人が音を楽しむ
      </p>
      <p class="mt-4">
        そんな世界を願ってこんなアプリつくりました。
      </p>
    </di>
    <section class="body-font">
      <div class="container px-5 py-8 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="p-4 lg:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <!-- 画像1 -->
              <img class="lg:h-48 w-full object-cover object-center" src="../assets/guitar.jpg" alt="ギターの画像" srcset="">
              <div class="p-6">
                <h2 class="title-font text-xl font-bold text-white">1.このアプリについて</h2>
                <p class="leading-relaxed mb-3 text-white">アプリの概要や自己紹介をしてます。ぜひ覗いてみてくだいさ！！</p>
                <div class="flex items-center flex-wrap">
                  <router-link to="/about" class="text-blue-300 underline hover:text-white inline-flex items-center m-auto">Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 lg:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <!-- 画像2 -->
              <img class="lg:h-48 w-full object-cover object-center" src="../assets/music_festival.png" alt="フェスの画像">
              <div class="p-6">
                <h2 class="title-font text-2xl font-bold text-white mb-3">2.楽曲情報検索 App</h2>
                <p class="leading-relaxed text-white mb-3">世界最大手の音楽ストリーミングサービスを提供するSpotifyさんのAPIを利用させていただきました。</p>
                <div class="flex items-center flex-wrap">
                  <router-link to="/MusicSearch" class="text-blue-300 underline hover:text-white inline-flex items-center m-auto">Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 lg:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <!-- 画像3 -->
              <img class="lg:h-48 w-full object-cover object-center" src="../assets/piano.jpg" alt="ピアノの画像">
              <div class="p-6">
                <h2 class="title-font text-2xl font-bold text-white mb-3">3.コード検索 App</h2>
                <p class="leading-relaxed text-white mb-3">コードの構成音を確認できます。</p>
                <div class="flex items-center flex-wrap ">
                  <router-link to="/Piano" class="text-blue-300 underline hover:text-white inline-flex items-center m-auto">Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </router-link>
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
import Symbolicon from '@/components/Symbolicon.vue';
export default {
  name: 'Home',
  components: {
    Symbolicon
  }
}
</script>
