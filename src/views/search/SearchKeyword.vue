<template>
  <div class="search">
    <h1 class="text-2xl py-2">SearchKeywordMusic</h1>
    <input
        placeholder="enter track name"
        v-model="search_keyword"
        class="py-1 text-black rounded"
        required>
    <br>
    
    <div class="py-1.5 text-red-600">
      {{err_message}}
    </div>
    <div class="py-1.5">
          {{type_wait_message}}
    </div>

    <div v-if="!err_message && response_data != null" v-cloak>
      <!-- ここから -->
      <section class="body-font">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div v-for="(item,n) in response_data.tracks.items" v-bind:key="n" class="mt-12 p-4 w-full md:w-1/2 max-w-sm mx-auto lg:w-1/3">
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <!-- アーティスト名 -->
                <p class="text-center">アーティスト : {{ item.artists[0].name }}</p>
                <!-- 曲名 -->
                <p class="text-center">曲名 : {{ item.name }}</p>
                <!-- 画像 -->
                <div class="m-auto w-60 h-60 rounded-full ring-4 ring-indigo-600 py-2 bg-white">
                  <a href="#" @click="openSpotify(item.external_urls.spotify)" class="cursor-pointer">
                    <img :src="item.album.images[1].url" class="rounded-full m-auto w-56 h-56"/>
                  </a>
                </div>

                <div v-if="array_response_audio_features_data.length != 0">
                  <!-- 曲の詳細情報 -->
                  <!-- key -->
                  <p class="text-center">Key : 
                    <span v-if="array_scale[n]">
                      {{ array_scale[n] }}
                    </span>
                    <span v-else>不明</span>
                  </p>
                  <!-- BPM -->
                  <p class="text-center">BPM : 
                    <span v-if="array_tempo[n]">
                      {{ array_tempo[n] }}
                    </span>
                    <span v-else>不明</span>
                  </p>
                  <!-- 曲の長さ -->
                  <p class="text-center">時間 : 
                    <span v-if="array_duration_m[n] && array_duration_s[n]">
                      {{ array_duration_m[n] }}分{{array_duration_s[n]}}秒
                    </span>
                    <span v-else>不明</span>
                  </p>
                  <!-- 拍子 -->
                  <p class="text-center">拍子 : 
                    <span v-if="array_time_signature[n]">
                      {{ array_time_signature[n] }}
                    </span>
                    <span v-else>不明</span>
                  </p>
                  <div class="grid grid-cols-7">
                    <div class="col-span-2 py-2.5"><hr/></div>
                    <div class="col-span-3 text-center">
                      <button @click="f_show_shosai(n)" class="text-blue-600 text-sm">
                      <span v-if="!show_shosai[n]">
                        さらに詳しく
                      </span>
                      <span v-else>
                        詳細を隠す
                      </span>
                      </button>
                    </div>
                    <div class="col-span-2 py-2.5"><hr/></div>
                  </div>
                  <div v-show="show_shosai[n]">
                    <!-- アコースティック感 -->
                    <p class="text-center">アコースティック感 : 
                      <span v-if="array_acousticness[n]">
                        {{ array_acousticness[n] }}%
                      </span>
                      <span v-else>不明</span>
                    </p>
                    <!-- ダンサブル -->
                    <p class="text-center">ダンサブル(踊りやすさ) : 
                      <span v-if="array_danceability[n]">
                        {{ array_danceability[n] }}%
                      </span>
                      <span v-else>不明</span>
                    </p>
                    <!-- エナジー -->
                    <p class="text-center">エナジー(過激さ) : 
                      <span v-if="array_energy[n]">
                        {{ array_energy[n] }}%
                      </span>
                      <span v-else>不明</span>
                    </p>
                    <!-- ライブ感 -->
                    <p class="text-center">ライブ感 : 
                      <span v-if="array_liveness[n]">
                        {{ array_liveness[n] }}%
                      </span>
                      <span v-else>不明</span>
                    </p>
                    <!-- ポジティブ -->
                    <p class="text-center">ポジティブ感 : 
                      <span v-if="array_valence[n]">
                        {{ array_valence[n] }}%
                      </span>
                      <span v-else>不明</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ここまで -->
    </div>
    <div v-else-if="!err_message && search_action_flg && this.search_keyword != '' && response_data==null">
      <!-- 検索はかけたが、結果がなかった場合 -->
      <p class="py-1.5">
        データが見つかりませんでした。
      </p>
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
import axios from 'axios'
import _ from 'lodash'

export default {
  name:'search',
  props: {
    AuthorizationParam:String
  },
  data(){
    return {
      search_keyword: '',
      search_action_flg: false,
      response_data:null,
      array_response_audio_features_data:[],
      show_shosai:[false,false,false,false,false],
      // 詳細データ
      array_scale:[],
      array_tempo:[],
      array_duration_m:[],
      array_duration_s:[],
      array_time_signature:[],
      array_acousticness:[],
      array_danceability:[],
      array_energy:[],
      array_liveness:[],
      array_valence:[],
      err_message: '',
      type_wait_message: '検索してください。',
      //key:C=1、C#/Db=2、D=3....
      array_IT_musical_scale:['ド','ド#(レ♭)','レ','レ#(ミ♭)','ミ','ファ','ファ#(ソ♭)','ソ','ソ#(ラ♭)','ラ','ラ#(シ♭)','シ'],
      array_US_musical_scale:['C','C#(D♭)','D','D#(E♭)','E','F','F#(G♭)','G','G#(A♭)','A','A#(B♭)','B'],
      //mode:0「マイナー」、1「メジャー」
      array_musical_scale_type:['マイナー','メジャー']
    }
  },
  watch:{
    search_keyword:function(){
      this.type_wait_message = '入力中...'
      this.debouncedSeachTrack()
    },
    response_data: function(newData){
      this.search_action_flg = true
      if(newData != null){
        this.seachTrackAudioFeature(newData.tracks.items)
      }
    }
  },
  created: function() {
    this.err_message = ''
  },
  mounted:function(){
    // lodashの使用(最後の入力から3000msec待って、getAnswerを走らせる)
    this.debouncedSeachTrack = _.debounce(this.seachTrack,3000)

    if(!this.AuthorizationParam){
      //認証情報が渡ってきていなかった場合、ログイン画面に戻す。
      this.$router.push('/MusicSearch')
    }
  },
  methods:{
    seachTrack: function(){
      if(!this.search_keyword){
        // 検索文字が空文字だったら処理中断
        console.log('seachTrack:空文字')
        this.type_wait_message = '検索してください。'
        this.response_data = null
        return
      }

      this.type_wait_message = 'Loading...'

      axios.get("https://api.spotify.com/v1/search",{
        headers:{
          "Authorization": this.AuthorizationParam
        },
        params:{"q": this.search_keyword , "limit": "6", "offset": "0", "type": "track", "market": "JP"}
      }).then(response=>{
        this.response_data = response.data;
        console.log(this.response_data);
        this.type_wait_message = ''
      }).catch(error =>{
        this.type_wait_message = ''
        this.err_message = 'API通信中にエラーが発生しました。¥nうまく動作しない場合は再度認証してください。'
        console.log(error)
      })
    },
    openSpotify: function(url){
      window.open(url,'spotifyNowPlaying')
    },
    seachTrackAudioFeature: function(items){
      if(this.response_data === null){
        this.array_response_audio_features_data = []
        this.array_tempo = []
        this.array_duration_m = []
        this.array_duration_s = []
        this.array_time_signature = []
        this.array_acousticness = []
        this.array_danceability = []
        this.array_energy = []
        this.array_liveness = []
        this.array_valence = []
        this.err_message = ''
        return
      }
      let id = ''
      items.forEach((item,n) =>{
        id = item.id
        axios.get("https://api.spotify.com/v1/audio-features/"+id ,{
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": this.AuthorizationParam
          },
        }).then(response=>{
          // ******************
          //各詳細データのセット
          // ******************
          this.array_response_audio_features_data[n] = response.data
          // key
          if(this.array_response_audio_features_data[n].key >= 0 && this.array_response_audio_features_data[n].mode >= 0){
            this.array_scale[n] = this.array_US_musical_scale[this.array_response_audio_features_data[n].key]+''+ this.array_musical_scale_type[this.array_response_audio_features_data[n].mode]
          }else{
            this.array_scale[n] = null
          }
          // BPM
          this.array_response_audio_features_data[n].tempo != null ? this.array_tempo[n] = (Math.floor(this.array_response_audio_features_data[n].tempo * 10))/10 : this.array_tempo[n] = null
          // 時間
          if(this.array_response_audio_features_data[n].duration_ms != null){
            this.array_duration_m[n] = Math.floor(this.array_response_audio_features_data[n].duration_ms / 60000)
            this.array_duration_s[n] = Math.floor((this.array_response_audio_features_data[n].duration_ms % 60000) /1000)
          }else{
            this.array_duration_m[n] = null
            this.array_duration_s[n] = null
          }
          // 拍子
          this.array_response_audio_features_data[n].time_signature != null ? this.array_time_signature[n] = this.array_response_audio_features_data[n].time_signature : this.array_time_signature[n] = null
          // アコースティック感
          this.array_response_audio_features_data[n].acousticness != null ? this.array_acousticness[n] = (Math.floor(this.array_response_audio_features_data[n].acousticness * 1000))/10 : this.array_acousticness[n] = null
          // ダンサブル
          this.array_response_audio_features_data[n].danceability != null ? this.array_danceability[n] = (Math.floor(this.array_response_audio_features_data[n].danceability * 1000))/10 : this.array_danceability[n] = null
          // エナジー
          this.array_response_audio_features_data[n].energy != null ? this.array_energy[n] = (Math.floor(this.array_response_audio_features_data[n].energy * 1000))/10 : this.array_energy[n] = null
          // ライブ感
          this.array_response_audio_features_data[n].liveness != null ? this.array_liveness[n] = (Math.floor(this.array_response_audio_features_data[n].liveness * 1000))/10 : this.array_liveness[n] = null
          // ポジティブ感
          this.array_response_audio_features_data[n].valence != null ? this.array_valence[n] = (Math.floor(this.array_response_audio_features_data[n].valence * 1000))/10 : this.array_valence[n] = null

          this.err_message = ''
        }).catch(error => {
          this.err_message = 'API通信中にエラーが発生しました。¥nうまく動作しない場合は再度認証してください。'
          console.log(error)
        })
      })
      console.log('this.array_response_audio_features_data')
      console.log(this.array_response_audio_features_data)
    },
    f_show_shosai(index){
      this.show_shosai[index] = !this.show_shosai[index]
    }
  }
}
</script>