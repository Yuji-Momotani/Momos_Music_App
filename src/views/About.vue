<template>
  <div class="about">
    <button @click="switchView(APP_ABOUT)" :class="{textBlue:isAppAboutShow}">アプリについて</button>
     | 
    <button @click="switchView(MY_ABOUT)" :class="{textBlue:isMyAboutShow}">自己紹介</button>
    <div v-if="isShowAbout=='AppAbout'" class="mt-4">
      アプリについて
      <br/>
      <p class="mt-4">記載予定......</p>
      
    </div>
    <div v-else class="mt-4">
      <p class="text-xl pre-line">自己紹介</p>
      <div class="m-auto w-60 h-60 rounded-lg ring-4 ring-pink-600 py-2 bg-white">
        <img src="../assets/Dogs.png" class="rounded-lg m-auto w-56 h-56"/>      
      </div>
      <div class="mt-4">
        <p class="text-lg">こんな人間です。</p>
        <ul class="text-sm">
          <li class="py-1.5">生誕：1994年地球に爆誕</li>
          <li class="py-1.5">血液型：O型</li>
          <li class="py-1.5">趣味：音楽(DTM,ギターetc...)、犬と戯れる</li>
          <li class="py-1.5">
            家族構成：鬼よ...じゃなくて、優嫁と愛犬2匹♡
          </li>
        </ul>
      </div>
      <div class="mt-4">
        <p class="text-lg">経歴</p>
        <ul class="text-sm">
          <li class="py-1.5">・2003年〜2012年<br/>小学校3年生〜高校3年までの間、青春を野球に捧げる</li>
          <li class="py-1.5 mt-1">・2013年〜2015年<br/>消防士になるために専門学校に2年間通う。<br/>結果、広島県警に拝命</li>
          <li class="py-1.5 mt-1">・2015年〜2020年<br/>広島県警で５年勤めるも退職し、IT業界に挑戦</li>
          <li class="py-1.5 mt-1">・2020年〜<br/>結婚、転職と波乱万丈人生継続中</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.textBlue{
  color: skyblue;
  text-decoration: underline;
}
</style>
<script>
// import Symbolicon from '../components/Symbolicon.vue';
// const APP_ABOUT = 'AppAbout'
// const MY_ABOUT = 'MyAbout'
export default {
  name: 'About',
  components: {
    // Symbolicon
  },
  data(){
    return {
      APP_ABOUT : 'AppAbout',
      MY_ABOUT : 'MyAbout',
      // isShowAbout: this.APP_ABOUT
      isShowAbout: '',
      isAppAboutShow:false,
      isMyAboutShow:false
    }
  },
  created:function(){
    this.isShowAbout = this.APP_ABOUT
    // this.isAppAboutShow = true
  },
  watch:{
    isShowAbout: function(newData){
      if(newData === this.APP_ABOUT){
        this.isAppAboutShow = true
        this.isMyAboutShow = false
      }else{
        this.isMyAboutShow = true
        this.isAppAboutShow = false

      }
    }
  },
  methods:{
    switchView:function(target){
      this.isShowAbout = target
    }
  }
}
</script>