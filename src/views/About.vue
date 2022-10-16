<template>
  <div class="about">
    <button @click="switchView(APP_ABOUT)" :class="{textBlue:!isAppAboutShow}">アプリについて</button>
     | 
    <button @click="switchView(MY_ABOUT)" :class="{textBlue:isAppAboutShow}">自己紹介</button>
    <div v-if="isShowAbout=='AppAbout'" class="mt-4">
      <AboutApp/>
    </div>
    <div v-else class="mt-4">
      <AboutMyIntroduction/>
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
import AboutApp from '../components/AboutApp.vue'
import AboutMyIntroduction from '../components/AboutMyIntroduction.vue'
export default {
  name: 'About',
  components: {
    AboutApp,
    AboutMyIntroduction
},
  data(){
    return {
      APP_ABOUT : 'AppAbout',
      MY_ABOUT : 'MyAbout',
      isShowAbout: '',
      isAppAboutShow:false,
    }
  },
  created:function(){
    this.isShowAbout = this.APP_ABOUT
  },
  watch:{
    isShowAbout: function(newData){
      if(newData === this.APP_ABOUT){
        this.isAppAboutShow = true
      }else{
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