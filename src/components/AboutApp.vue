<template>
  <div class="AboutApp">
    <section class="text-white body-font overflow-hidden">
      <h2 class="sm:text-3xl text-2xl font-bold my-4">アプリについて</h2>
      <div class="container px-5 py-12 mx-auto">
        <div class="flex flex-wrap -m-12">
          <div class="p-12 md:w-1/2 flex flex-col items-start">
            <!-- 「１.楽曲情報検索 App」についての説明 -->
            <span class="inline-block py-1 px-2 rounded bg-green-300 text-xs font-medium tracking-widest">CATEGORY</span>
            <h2 class="sm:text-3xl text-2xl title-font font-medium mt-4 mb-4">１.楽曲情報検索 App</h2>
            <p class="leading-relaxed mb-8 text-left">楽曲の詳細な情報を検索したり、DJMixでの選曲をサポートします。3画面あり各画面の機能を以下に記載します。</p>
            <div class="flex flex-col items-start">
              <h3 class="sm:text-2xl text-xl">・SearchPlaying</h3>
              <p class="leading-relaxed mb-8 text-left ml-4">Spotifyのユーザーアカウントで再生中の楽曲情報を検索します。</p>
            </div>
            <div class="flex flex-col items-start mt-2">
              <h3 class="sm:text-2xl text-xl">・SearchKeyword</h3>
              <p class="leading-relaxed mb-8 text-left ml-4">入力されたキーワードをもとに楽曲を検索します。</p>
            </div>
            <div class="flex flex-col items-start mt-2">
              <h3 class="sm:text-2xl text-xl">・SearchDJNextTune</h3>
              <p class="leading-relaxed mb-8 text-left ml-4">DJMixなどでの選曲をサポートします。</p>
            </div>
            <router-link to="/MusicSearch" class="text-indigo-500 inline-flex items-center">Learn More
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
          <div class="p-12 md:w-1/2 flex flex-col items-start">
            <!-- 「2.コード検索 App」についての説明 -->
            <span class="inline-block py-1 px-2 rounded bg-green-300 text-white text-xs font-medium tracking-widest">CATEGORY</span>
            <h2 class="sm:text-3xl text-2xl title-font font-medium mt-4 mb-4">2.音楽理論 App</h2>
            <p class="leading-relaxed mb-8 text-left">鍵盤を用いて音楽理論のサポートを提供します。サポートできる理論は以下です。</p>
            <div class="flex flex-col items-start">
              <h3 class="sm:text-2xl text-xl">・コード検索</h3>
              <p class="leading-relaxed mb-8 text-left ml-4">コードの構成音と実際の音を確認できます。</p>
            </div>
            <div class="flex flex-col items-start mt-2">
              <p class="leading-relaxed mb-8 text-left ml-4">その他、バージョンアップで機能追加予定...</p>
            </div>
            <router-link to="/MusicSearch" class="text-indigo-500 inline-flex items-center">Learn More
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutApp',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
