<template>
  <div class="AboutMyIntroduction">
    <section class=" body-font">
      <div class="container px-5 py-8 mx-auto flex flex-col">
        <h2 class="sm:text-3xl text-2xl font-bold mb-4">自己紹介</h2>
        <div class="lg:w-4/6 mx-auto">
          <div class="rounded-lg h-72 overflow-hidden">
            <img alt="content" class="object-cover object-center h-full w-full m-auto" src="../assets/mountains.jpg">
          </div>
          <div class="flex flex-col sm:flex-row mt-10">
            <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div class="w-30 h-30 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <img src="../assets/MyIntroduction.jpg" alt="自己紹介用画像" class="w-full h-full rounded-full inline-flex items-center justify-center">
              </div>
              <div class="flex flex-col items-center text-center justify-center">
                <h2 class="font-medium title-font mt-4  text-lg">桃谷 優寿</h2>
                <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p class="text-base">
                  生誕：1994年生(満28歳)<br/>
                  血液型：O型<br/>
                  趣味：音楽(DTM,弾き語りなど...)、キャンプ、犬と戯れる。など<br/>
                  家族構成：鬼よ...じゃなくて、優嫁と愛犬2匹♡
                </p>
              </div>
            </div>
            <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h3 class="text-lg text-center">経歴</h3>
              <p class="leading-relaxed mb-4">
                ・2003年〜2012年<br/>小学校3年生〜高校3年までの間、青春を野球に捧げる<br/><br/>
                ・2013年〜2015年<br/>消防士になるために専門学校に2年間通う。結果、広島県警に拝命<br/><br/>
                ・2015年〜2020年<br/>広島県警で５年勤めるも退職し、IT業界に挑戦<br/><br/>
                ・2020年〜<br/>エンジニアとして奮闘中！！！！<br/><br/>
                業務では基本的にC#やVB.NET等を使用して業務系のアプリケーションを開発してます。<br/>
                プライベートではVue.jsやAWSなどの勉強を主にしており、それを活かしてWebアプリケーションの開発をしております。<br/>
                今後は、Web系開発を目指して転職予定です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutMyIntroduction',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
