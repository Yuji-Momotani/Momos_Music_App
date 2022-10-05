<template>
  <div class="piano">
    <div class="py-1.5 text-red-600 whitespace-pre-line text-center mx-4">
      {{message}}
    </div> 
    <div id="keyboard" v-if="!isDispWidthErr" class="w-full">
      <!-- <div v-for="(item,n) in arrayKeyboardAllMusicalScale" v-bind:key="n" class="">
        <button v-bind:class="{blackkey:item.isSharp,whitekey:!item.isSharp}" @click="playSound(item.sound)">
          <div class="flex items-end h-full w-full">
            <span class="mx-auto">{{item.sound}}</span>
          </div>
        </button>
      </div> -->
      <button v-for="(item,n) in arrayKeyboardAllMusicalScale" v-bind:key="n" 
          v-bind:class="{blackkey:item.isSharp,whitekey:!item.isSharp}" @click="playSound(item.sound,0.7,'8n')">
        <div class="flex items-end h-full w-full">
          <span class="mx-auto">{{item.sound}}</span>
        </div>
      </button>
    </div>
    <div class="mt-8">
      <p>コードチェック</p>
      <div class="mt-4 mx-auto flex justify-around w-3/4">
        <div>
          <!-- ルート音 -->
          <span>ルート音：</span>
          <select v-model="selectRootSound" name="" id="" class="text-black h-8">
            <option value=""></option>
            <option v-for="(item,n) in arrayMusicalScale" v-bind:key="n" v-bind:value="item">{{item}}</option>
          </select>
        </div>
        
        <div>
          <!-- メジャー・マイナー -->
          <span>ムード：</span>
          <select v-model="selectMood" name="" id="" class="text-black h-8">
            <option value=""></option>
            <option value="ma">major</option>
            <option value="mi">minor</option>
            <option value="di">dim</option>
          </select>
        </div>
        
        <div>
          <!-- テンション -->
          <span>テンション：</span>
          <select v-model="selectTension" name="" id="sel_Tension" class="text-black h-8">
            <option value=""></option>
            <option value="7">7th</option>
            <option value="M7">M7th</option>
            <option value="9">9th</option>
            <option value="11">11th</option>
            <option value="13">13th</option>
          </select>
        </div>
        
        <div>
          <button class="px-4 h-8 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              @click="chordSearch">検索実行
          </button>
        </div>
      </div>

      <div class="mt-4">
        <!-- 検索結果表示エリア -->
        <div v-if="dispChord">
          <!-- コードの構成音表示 -->
          <p class="">
            {{dispChord}}
          </p>
        </div>
        <div v-if="searchChordMsg">
          <!-- コード検索時メッセージ -->
          <p class="text-red-600">
            {{searchChordMsg}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#keyboard {
  /* width: 100%; */
  position: relative;
}

/* 白鍵のスタイル */
.whitekey {
  width: 30px;
  height: 240px;
  display: inline-block;
  border: 1px solid #000;
  background-color: #ffffff;
  color: #000;
}
/* 黒鍵のスタイル */
.blackkey {
  width: 20px;
  height: 140px; 
  margin-left: -10px;
  display: inline-block;
  background-color: #000;
  position: absolute;
  top: 0;
  z-index: 1;
}

.whitekey:hover{
  background-color: rgb(243 244 246);
}
.whitekey:active{
  background-color: rgb(229 231 235);
}
.whitekey:first,
.blackkey:first{
  border-top-left-radius: 0.5rem; /* 8px */
  border-bottom-left-radius: 0.5rem; /* 8px */
}
.whitekey:last,
.blackkey:last{
  border-top-right-radius: 0.5rem; /* 8px */
  border-bottom-right-radius: 0.5rem; /* 8px */
}
.blackkey:hover{
  /* background-color: rgb(12 11 9); */
  /* background-color: rgb(24 22 18); */
  background-color: rgb(36 33 27);
}
.blackkey:active{
  /* background-color: rgb(26 24 22); */
  /* background-color: rgb(52 48 44); */
  background-color: rgb(78 72 66);
}
</style>
<script>

import * as Tone from 'tone'
  export default {
    name:'piano',
    data(){
      return {
        //鍵盤数
        keyboardNum:0,
        //(配列)鍵盤で使用される音階の全て
        arrayKeyboardAllMusicalScale:[],
        arrayMusicalScale:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],
        //各キーボードの鍵盤数に応じて最初の音を返す
        keyboardStartSound:{
          37: function(){return {sound:"C",soundPitch:3}},//C3
          49: function(){return {sound:"C",soundPitch:2}},//C2
          61: function(){return {sound:"C",soundPitch:2}},//C2
          88: function(){return {sound:"A",soundPitch:0}},//A0
        },
        message:"",
        isDispWidthErr:false,
        //コード検索のセレクトボックス
        selectRootSound:"",
        selectMood:"",
        selectTension:"",
        dispChord:"",
        searchChordMsg:"",
      }
    },
    watch:{
      selectMood:function(newData){
        if(newData === "di"){
          document.getElementById('sel_Tension').disabled = true
        }else{
          document.getElementById('sel_Tension').disabled = false
        }

      },
    },
    created: function() {
      
    },
    mounted:function(){
      //画面サイズを検知してキーボードの作成
      this.dispKeyboard()
      //画面リサイズのイベント追加
      window.addEventListener('resize', this.dispKeyboard);
    },
    methods:{
      dispKeyboard(){
        let dispWidth = window.innerWidth
        if(dispWidth<649){
          this.message=`画面の横幅が規定値以下のためこの画面は表示できません。
                        スマートフォンをご利用の場合は横向きに設定の上ご使用ください。
                        (横向きにした場合でも横幅が規定値以下の場合はご利用できませんのでPCもしくはタブレットでのご使用を推奨しております。)`
          this.isDispWidthErr = true
          return
        }else{
          this.message = ""
          this.isDispWidthErr = false
        }
        this.arrayKeyboardAllMusicalScale = [] //鍵盤の音階配列を一旦空にして描画スタート
        this.keyboardNum = 37 //とりあえず仮で37鍵盤を作る
        
        //鍵盤の最初の音が配列の何番目かを取得
        let arryIndex = this.arrayMusicalScale.indexOf(this.keyboardStartSound[this.keyboardNum]().sound)
        let keyboardSound = ""
        let keyboardSoundPitch = this.keyboardStartSound[this.keyboardNum]().soundPitch
        let isSharp = false
        for(let i=0; i< this.keyboardNum; i++){
          //鍵盤数分の音階を「arrayKeyboardAllMusicalScale」にセット
          keyboardSound = this.arrayMusicalScale[arryIndex] + keyboardSoundPitch
          isSharp = keyboardSound.length > 2
          this.arrayKeyboardAllMusicalScale.push({sound:keyboardSound,isSharp:isSharp})
          if(arryIndex > 10){
            arryIndex = 0
            keyboardSoundPitch++
          }else{
            arryIndex++
          }
          //arryIndex = arryIndex > 10 ? arryIndex = 0 : arryIndex + 1
        }
        //console.log(this.arrayKeyboardAllMusicalScale)
      },
      playSound(key,release,duration_s){
        //*****************************
        //シンセ音源のサンプル 
        //*****************************
        // const synth = new Tone.Synth({
        //   // 発振器の設定
        //   oscillator:{
        //       type:"triangle8"
        //   },
        //   // エンベロープ(包絡線)の設定
        //   envelope:{
        //       attack:0.005,  // 最大音量アタック・レベル(Attack Level)に達する時間
        //       decay:0.1,     // 一定音量まで減衰(Decay)する時間
        //       sustain:0.4,   // 一定振幅(Sustain Level)が続く時間
        //       release:2      // 音が消えるまでの時間
        //   }
        // }).toDestination()
        // //const synth = new Tone.PluckSynth().toDestination()
        // // div要素のテキスト(音名)を代入する
        // synth.triggerAttackRelease(key, '8n');


        //*****************************
        //ピアノ音源のサンプル 
        //*****************************
        const sampler = new Tone.Sampler({
          urls: {
            // "C4": "C4.mp3",
            // "D#4": "Ds4.mp3",
            // "F#4": "Fs4.mp3",
            // "A4": "A4.mp3",
            "C3":"C3.mp3",
            "D#3":"Ds3.mp3",
            "F#3":"Fs3.mp3",
            "A3":"A3.mp3",
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
            "C5": "C5.mp3",
            "D#5": "Ds5.mp3",
            "F#5": "Fs5.mp3",
            "A5": "A5.mp3",
            "C6": "C6.mp3",
          },
          release: release,
          baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();
        
        Tone.loaded().then(() => {
          sampler.triggerAttackRelease(key, duration_s);
        })
      },
      chordSearch(){
        const chordSounds = []
        // const rootSound = "C" + "3"
        // const rootUpperSound = "C" + "4"
        // const thirdSound = "E" + "4"
        // const fifthSound = "G" + "4"
        let rootBaseSound = ""
        let rootSoundAryIndex = -1
        let rootSound = ""
        let thirdSound = ""
        let thirdSoundAryIndex = -1
        let fifthSound = ""
        let fifthSoundAryIndex = -1
        let tensionSound = ""
        let tensionSoundAryIndex = -1

        //選択項目チェック
        if(this.selectRootSound.trim()){
          // ルート音の選択チェック(必須)
          rootBaseSound = this.selectRootSound.trim() + "3"
          rootSound = this.selectRootSound.trim() + "4"
        }else{
          this.searchChordMsg="ルート音を選択してください。"
          this.dispChord = ""
          return
        }
        if(!this.selectMood.trim()){
          //ムードの選択チェック(必須)
          this.searchChordMsg="ムードを選択してください。"
          this.dispChord = ""
          return
        }
        this.searchChordMsg="" //必須チェックで問題なければメッセージを空にする。

        //ルート音が配列の何番目にあるかチェック
        rootSoundAryIndex = this.arrayMusicalScale.indexOf(this.selectRootSound.trim())
        if(this.selectMood.trim()=="ma"){
          //メージャーが選択された場合
          thirdSoundAryIndex = rootSoundAryIndex + 4
          fifthSoundAryIndex = rootSoundAryIndex + 7
        }else if(this.selectMood.trim()=="mi"){
          //マイナーが選択された場合
          thirdSoundAryIndex = rootSoundAryIndex + 3
          fifthSoundAryIndex = rootSoundAryIndex + 7
        }else if(this.selectMood.trim()=="di"){
          //ディミニッシュが選択された場合(2度ずつ積み重ね)
          thirdSoundAryIndex = rootSoundAryIndex + 3
          fifthSoundAryIndex = thirdSoundAryIndex + 3
          tensionSoundAryIndex = fifthSoundAryIndex + 3
        }
        

        if(rootSoundAryIndex === -1 || 
            thirdSoundAryIndex === -1 || fifthSoundAryIndex === -1){
            //万が一、インデックスが不正な値だった場合
            this.searchChordMsg="検索処理で予期せぬエラーが発生いたしました。"
            this.dispChord = ""
            return
        }

        //3度の音を配列より取得
        thirdSound = thirdSoundAryIndex < 12 ? this.arrayMusicalScale[thirdSoundAryIndex] + "4" :this.arrayMusicalScale[thirdSoundAryIndex-12] + "4"
        //5度の音を配列より取得
        fifthSound = fifthSoundAryIndex < 12 ? this.arrayMusicalScale[fifthSoundAryIndex] + "4" :this.arrayMusicalScale[fifthSoundAryIndex-12] + "4"

        this.dispChord = "構成音： " + rootSound.slice(0,-1) + " " + thirdSound.slice(0,-1) + " " + fifthSound.slice(0,-1)
        
        //基本構成音を配列にセット
        chordSounds.push(rootBaseSound)
        chordSounds.push(rootSound)
        chordSounds.push(thirdSound)
        chordSounds.push(fifthSound)

        // テンションが選択されている場合、構成音に追加
        if(this.selectTension.trim()==="7"){
          tensionSoundAryIndex = rootSoundAryIndex + 10
        }else if(this.selectTension.trim()==="M7"){
          tensionSoundAryIndex = rootSoundAryIndex + 11
        }else if(this.selectTension.trim()==="9"){
          tensionSoundAryIndex = rootSoundAryIndex + 2
        }else if(this.selectTension.trim()==="11"){
          tensionSoundAryIndex = rootSoundAryIndex + 5
        }else if(this.selectTension.trim()==="13"){
          tensionSoundAryIndex = rootSoundAryIndex + 9
        }


        if(tensionSoundAryIndex != -1){
          //tensionSound = tensionSoundAryIndex < 12 ? this.arrayMusicalScale[tensionSoundAryIndex] + "5" :this.arrayMusicalScale[tensionSoundAryIndex-12] + "5"
          let checkTensionSoundIndex = tensionSoundAryIndex < 12 ? tensionSoundAryIndex :tensionSoundAryIndex-12
          if(checkTensionSoundIndex < 6){
            //ド~ファの間の音なら高い音(5)を使用
            tensionSound = this.arrayMusicalScale[checkTensionSoundIndex] + "5"
          }else{
            //ファ#~シの間の音なら低い音(4)を使用
            tensionSound = this.arrayMusicalScale[checkTensionSoundIndex] + "4"
          }
          chordSounds.push(tensionSound)
          this.dispChord += " " + tensionSound.slice(0,-1)
        }

        this.playSound(chordSounds,1,'2')
      }
    }
  }
</script>