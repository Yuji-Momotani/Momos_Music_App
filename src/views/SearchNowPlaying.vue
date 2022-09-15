<template>
  <div class="nowplaying">
    <h1 class="text-2xl py-2">SearchPlaying</h1>
    <!-- <button @click="spotifyLogin">認証</button> -->
    <br>
    <button 
      class="py-1.5 px-4 mb-8 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
      @click="getNowPlaying">再生中の曲情報取得</button>
    <div class="pre-line">
      <p>{{message}}</p>
      <p class="text-red-600">{{err_message}}</p>
    </div>
    <div v-if="response_data == null || response_data == ''"></div>
    <div v-else v-cloak>
      <div class="container mx-auto">
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- アーティスト名 -->
          <p class="col-span-5 text-center">アーティスト : {{ response_data.item.artists[0].name }}</p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- 曲名 -->
          <p class="col-span-5 text-center">曲名 : {{ response_data.item.name }}</p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <div class="col-span-5 mt-4">
            <!-- 画像 -->
            <div class="m-auto w-60 h-60 rounded-full ring-4 ring-indigo-600 py-2 bg-white">
              <a href="#" @click="openSpotify(response_data.item.external_urls.spotify)" class="cursor-pointer">
                <img :src="response_data.item.album.images[1].url" class="rounded-full m-auto w-56 h-56"/>
              </a>
            </div>
          </div>
          <div class="col-span-1"></div>
        </div>
      </div>
      <!-- <div class="mx-auto mt-8">
        <ul class="">
          <li>・アルバムリリース日 : {{ response_data.item.album.release_date }}年</li>
          <li>・曲の長さ : {{ response_data.item.duration_ms/1000 }}秒</li>
        </ul> 
      </div> -->

      <div v-if="response_audio_features_data">
        <!-- 曲の詳細情報 -->
        <div class="grid grid-cols-7 mt-4">
          <div class="col-span-1"></div>
          <!-- key -->
          <p class="col-span-5 text-center">Key : 
            <span v-if="res_scale">
              {{ res_scale }}
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- BPM -->
          <p class="col-span-5 text-center">BPM : 
            <span v-if="res_tempo">
              {{ res_tempo }}
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- 曲の長さ -->
          <p class="col-span-5 text-center">時間 : 
            <span v-if="res_duration_m && res_duration_s">
              {{ res_duration_m }}分{{res_duration_s}}秒
            </span>
            <!-- <span v-if="true">テストテスト</span> -->
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- 拍子 -->
          <p class="col-span-5 text-center">拍子 : 
            <span v-if="res_time_signature">
              {{ res_time_signature }}
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- アコースティック感 -->
          <p class="col-span-5 text-center">アコースティック感 : 
            <span v-if="res_acousticness">
              {{ res_acousticness }}%
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- ダンサブル -->
          <p class="col-span-5 text-center">ダンサブル(踊りやすさ) : 
            <span v-if="res_danceability">
              {{ res_danceability }}%
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- エナジー -->
          <p class="col-span-5 text-center">エナジー(過激さ) : 
            <span v-if="res_energy">
              {{ res_energy }}%
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- ライブ感 -->
          <p class="col-span-5 text-center">ライブ感 : 
            <span v-if="res_liveness">
              {{ res_liveness }}%
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
        <div class="grid grid-cols-7">
          <div class="col-span-1"></div>
          <!-- ポジティブ -->
          <p class="col-span-5 text-center">ポジティブ感 : 
            <span v-if="res_valence">
              {{ res_valence }}%
            </span>
            <span v-else>不明</span>
          </p>
          <div class="col-span-1"></div>
        </div>
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
import axios from 'axios'
export default {
  data: function() {
    return {
      response_data: null,
      response_audio_features_data:null,
      res_scale:'',
      res_tempo:'',
      res_duration_m:'',
      res_duration_s:'',
      res_time_signature:'',
      res_acousticness:'',
      res_danceability:'',
      res_energy:'',
      res_liveness:'',
      res_valence:'',
      message:'再生中の曲を取得してください。',
      err_message:'',
      no_playing_flg:false,
      //key:C=1、C#/Db=2、D=3....
      array_IT_musical_scale:['ド','ド#(レ♭)','レ','レ#(ミ♭)','ミ','ファ','ファ#(ソ♭)','ソ','ソ#(ラ♭)','ラ','ラ#(シ♭)','シ'],
      array_US_musical_scale:['C','C#(D♭)','D','D#(E♭)','E','F','F#(G♭)','G','G#(A♭)','A','A#(B♭)','B'],
      //mode:0「マイナー」、1「メジャー」
      array_musical_scale_type:['マイナー','メジャー']
    }
  },
  props: {
    // routeParams: Object
    AuthorizationParam:String
  },
  mounted: function() {
    if(!this.AuthorizationParam){
      //認証情報が渡ってきていなかった場合、ログイン画面に戻す。
      this.$router.push('/MusicSearch')
    }
  },
  watch:{
    response_data: function(newData){
      // console.log('newData.item.id')
      // console.log(newData.item.id)
      if(newData != ''){
        console.log('↓↓newData↓↓')
        console.log(newData)
        this.seachTrackAudioFeature(newData.item.id)
      }else{
        console.log('No Playing')
        this.err_message = `再生中の曲がありません。 
                            Spotifyで曲が再生されているか確認してください。`
        // this.response_data = null
      }
    }
  },
  methods: {
    // spotifyLogin: function() {
    //   let endpoint = 'https://accounts.spotify.com/authorize'
    //   let response_type = 'token'
    //   let client_id = '6ecca994fa22486b808b122712ce91be'
    //   let redirect_uri = 'http://localhost:8080/NowPlaying'
    //   let scope = 'user-read-currently-playing'
    //   location.href = endpoint + 
    //     '?response_type=' + response_type +
    //     '&client_id=' + client_id +
    //     '&redirect_uri=' + redirect_uri +
    //     '&scope=' + scope
    // },
    getNowPlaying: function() {
      this.message = ''
      let endpoint = 'https://api.spotify.com/v1/me/player/currently-playing?market=JP'
      let data = {
        headers: {
          // 'Authorization': this.routeParams.token_type + ' ' + this.routeParams.access_token
          'Authorization': this.AuthorizationParam
        },
        data: {}
      }
      axios
      .get(endpoint, data)
      .then(res => {
        this.response_data = res.data
        // console.log('↓↓res↓↓')
        // console.log(res)
      })
      .catch(err => {
        console.error(err)
        this.err_message = `API通信中にエラーが発生しました。
                            うまく動作しない場合は再度認証してください。`
      })
    },
    seachTrackAudioFeature: function(id){
      // console.log(this.$route.query.token_type + ' ' + this.$route.query.access_token)
      if(this.response_data === null){
        console.log('seachTrackAudioFeature:空文字')
        this.response_audio_features_data = null
        this.res_scale = ''
        this.res_tempo = ''
        this.res_duration_m = ''
        this.res_duration_s = ''
        this.res_time_signature = ''
        this.res_acousticness = ''
        this.res_danceability = ''
        this.res_energy = ''
        this.res_liveness = ''
        this.res_valence = ''

        this.err_message = ''
        return
      }
      
      axios.get("https://api.spotify.com/v1/audio-features/"+id ,{
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json",
          // "Authorization": this.$route.query.token_type + ' ' + this.$route.query.access_token,
          "Authorization": this.AuthorizationParam
        },
        // params:{"id": "37rDp8YkDeGVLqRS8INRiY"}
      }).then(response=>{
        // // ******************
        // //各詳細データのセット
        // // ******************
        this.response_audio_features_data = response.data
        // key
        if(this.response_audio_features_data.key >= 0 && this.response_audio_features_data.mode >= 0){
          this.res_scale = this.array_US_musical_scale[this.response_audio_features_data.key]+''+ this.array_musical_scale_type[this.response_audio_features_data.mode]
        }else{
          this.res_scale = null
        }
        // BPM
        this.response_audio_features_data.tempo != null ? this.res_tempo = (Math.floor(this.response_audio_features_data.tempo * 10))/10 : this.res_tempo = null
        // 時間
        if(this.response_audio_features_data.duration_ms != null){
          this.res_duration_m = Math.floor(this.response_audio_features_data.duration_ms / 60000)
          this.res_duration_s = Math.floor((this.response_audio_features_data.duration_ms % 60000) /1000)
        }else{
          this.res_duration_m = null
          this.res_duration_s = null
        }
        // 拍子
        this.response_audio_features_data.time_signature != null ? this.res_time_signature = this.response_audio_features_data.time_signature : this.res_time_signature = null
        // アコースティック感
        this.response_audio_features_data.acousticness != null ? this.res_acousticness = (Math.floor(this.response_audio_features_data.acousticness * 1000))/10 : this.res_acousticness = null
        // ダンサブル
        this.response_audio_features_data.danceability != null ? this.res_danceability = (Math.floor(this.response_audio_features_data.danceability * 1000))/10 : this.res_danceability = null
        // エナジー
        this.response_audio_features_data.energy != null ? this.res_energy = (Math.floor(this.response_audio_features_data.energy * 1000))/10 : this.res_energy = null
        // ライブ感
        this.response_audio_features_data.liveness != null ? this.res_liveness = (Math.floor(this.response_audio_features_data.liveness * 1000))/10 : this.res_liveness = null
        // ポジティブ感
        this.response_audio_features_data.valence != null ? this.res_valence = (Math.floor(this.response_audio_features_data.valence * 1000))/10 : this.res_valence = null

        this.err_message = ''
      }).catch(error => {
        this.err_message = `API通信中にエラーが発生しました。
                            うまく動作しない場合は再度認証してください。`
        console.log(error)
      })
      
      console.log('this.response_audio_features_data')
      console.log(this.response_audio_features_data)
    },
    openSpotify:function(url){
      window.open(url,'spotifyNowPlaying')
    }
  },
}
</script>