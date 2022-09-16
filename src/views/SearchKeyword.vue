<template>
  <div class="search">
    <!-- <input
        placeholder="enter artist name"
        v-model="search_artist_name"
        class="py-1 text-black rounded"
        required>
    <button
      type="button"
      @click="seach_artist"
      class="py-1 px-4 ml-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50">
      search
    </button> -->

    <h1 class="text-2xl py-2">SearchKeywordMusic</h1>
    <input
        placeholder="enter track name"
        v-model="search_keyword"
        class="py-1 text-black rounded"
        required>
    <!-- <button
      type="button"
      @click="seachTrack"
      class="py-1 px-4 ml-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50">
      search
    </button> -->
    <br>
    
    <div class="py-1.5 text-red-600">
      {{err_message}}
    </div>
    <div class="py-1.5">
          {{type_wait_message}}
    </div>

    <div v-if="!err_message && response_data != null" v-cloak>
      <div v-for="(item,n) in response_data.tracks.items" v-bind:key="n" class="mt-12 order-dashed border-gray-600 border-4">
        <div class="container mx-auto">
          <div class="grid grid-cols-7">
            <div class="col-span-1"></div>
            <!-- アーティスト名 -->
            <p class="col-span-5 text-center">アーティスト : {{ item.artists[0].name }}</p>
            <div class="col-span-1"></div>
          </div>
          <div class="grid grid-cols-7">
            <div class="col-span-1"></div>
            <!-- 曲名 -->
            <p class="col-span-5 text-center">曲名 : {{ item.name }}</p>
            <div class="col-span-1"></div>
          </div>
          <div class="grid grid-cols-7">
            <div class="col-span-1"></div>
            <div class="col-span-5 mt-4">
              <!-- 画像 -->
              <div class="m-auto w-60 h-60 rounded-full ring-4 ring-indigo-600 py-2 bg-white">
                <a href="#" @click="openSpotify(item.external_urls.spotify)" class="cursor-pointer">
                  <img :src="item.album.images[1].url" class="rounded-full m-auto w-56 h-56"/>
                </a>
              </div>
            </div>
            <div class="col-span-1"></div>
          </div>
          <div v-if="array_response_audio_features_data.length != 0">
            <!-- 曲の詳細情報 -->
            <div class="grid grid-cols-7 mt-4">
              <div class="col-span-1"></div>
              <!-- key -->
              <p class="col-span-5 text-center">Key : 
                <span v-if="array_scale[n]">
                  {{ array_scale[n] }}
                </span>
                <span v-else>不明</span>
              </p>
              <div class="col-span-1"></div>
            </div>
            <div class="grid grid-cols-7">
              <div class="col-span-1"></div>
              <!-- BPM -->
              <p class="col-span-5 text-center">BPM : 
                <span v-if="array_tempo[n]">
                  {{ array_tempo[n] }}
                </span>
                <span v-else>不明</span>
              </p>
              <div class="col-span-1"></div>
            </div>
            <div class="grid grid-cols-7">
              <div class="col-span-1"></div>
              <!-- 曲の長さ -->
              <p class="col-span-5 text-center">時間 : 
                <span v-if="array_duration_m[n] && array_duration_s[n]">
                  {{ array_duration_m[n] }}分{{array_duration_s[n]}}秒
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
                <span v-if="array_time_signature[n]">
                  {{ array_time_signature[n] }}
                </span>
                <span v-else>不明</span>
              </p>
              <div class="col-span-1"></div>
            </div>

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
              <div class="grid grid-cols-7">
                <div class="col-span-1"></div>
                <!-- アコースティック感 -->
                <p class="col-span-5 text-center">アコースティック感 : 
                  <span v-if="array_acousticness[n]">
                    {{ array_acousticness[n] }}%
                  </span>
                  <span v-else>不明</span>
                </p>
                <div class="col-span-1"></div>
              </div>
              <div class="grid grid-cols-7">
                <div class="col-span-1"></div>
                <!-- ダンサブル -->
                <p class="col-span-5 text-center">ダンサブル(踊りやすさ) : 
                  <span v-if="array_danceability[n]">
                    {{ array_danceability[n] }}%
                  </span>
                  <span v-else>不明</span>
                </p>
                <div class="col-span-1"></div>
              </div>
              <div class="grid grid-cols-7">
                <div class="col-span-1"></div>
                <!-- エナジー -->
                <p class="col-span-5 text-center">エナジー(過激さ) : 
                  <span v-if="array_energy[n]">
                    {{ array_energy[n] }}%
                  </span>
                  <span v-else>不明</span>
                </p>
                <div class="col-span-1"></div>
              </div>
              <div class="grid grid-cols-7">
                <div class="col-span-1"></div>
                <!-- ライブ感 -->
                <p class="col-span-5 text-center">ライブ感 : 
                  <span v-if="array_liveness[n]">
                    {{ array_liveness[n] }}%
                  </span>
                  <span v-else>不明</span>
                </p>
                <div class="col-span-1"></div>
              </div>
              <div class="grid grid-cols-7">
                <div class="col-span-1"></div>
                <!-- ポジティブ -->
                <p class="col-span-5 text-center">ポジティブ感 : 
                  <span v-if="array_valence[n]">
                    {{ array_valence[n] }}%
                  </span>
                  <span v-else>不明</span>
                </p>
                <div class="col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  // response_data: [],
  props: {
    // routeParams: Object
    AuthorizationParam:String
  },
  data(){
    return {
      search_keyword: '',
      search_action_flg: false,
      response_data:null,
      array_response_audio_features_data:[],
      show_shosai:[false,false,false,false,false],
      // searched_track_name: '',
      // followers: '',
      // popularity: '',
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
      // console.log(newData.tracks.items[0].id)
      // this.seachTrackAudioFeature(newData.tracks.items[0].album.id)
      if(newData != null){
        this.seachTrackAudioFeature(newData.tracks.items)
      }
    }
  },
  created: function() {
    // console.log('↓↓response_data↓↓')
    // console.log(this.response_data)
    // console.log('↑↑response_data↑↑')
    this.err_message = ''
  },
  mounted:function(){
    // this.keyword = 'JavaScript'
    // this.getAnswer()

    // lodashの使用(最後の入力から3000msec待って、getAnswerを走らせる)
    this.debouncedSeachTrack = _.debounce(this.seachTrack,3000)

    if(!this.AuthorizationParam){
      //認証情報が渡ってきていなかった場合、ログイン画面に戻す。
      this.$router.push('/MusicSearch')
    }
  },
  methods:{
    seachTrack: function(){
      // console.log(this.$route.query.token_type + ' ' + this.$route.query.access_token)
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
          // "Authorization": this.$route.query.token_type + ' ' + this.$route.query.access_token
          "Authorization": this.AuthorizationParam
        },
        params:{"q": this.search_keyword , "limit": "5", "offset": "0", "type": "track", "market": "JP"}
      }).then(response=>{
        this.response_data = response.data;
        console.log(this.response_data);
        // this.retrieve_data();
        this.type_wait_message = ''
      }).catch(error =>{
        this.type_wait_message = ''
        this.err_message = 'API通信中にエラーが発生しました。¥nうまく動作しない場合は再度認証してください。'
        console.log(error)
      })
    },
    // retrieve_data: function(){
    //   // this.searched_track_name = this.track_data.tracks.items[0].name;
    //   // this.followers = this.track_data.tracks.items[0].followers.total;
    //   // this.popularity = this.track_data.tracks.items[0].popularity;
    // }
    openSpotify: function(url){
      window.open(url,'spotifyNowPlaying')
    },
    seachTrackAudioFeature: function(items){
      // console.log(this.$route.query.token_type + ' ' + this.$route.query.access_token)
      if(this.response_data === null){
        // console.log('seachTrackAudioFeature:空文字')
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
      // for((item,n) in items){
        id = item.id
        axios.get("https://api.spotify.com/v1/audio-features/"+id ,{
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            // "Authorization": this.$route.query.token_type + ' ' + this.$route.query.access_token,
            "Authorization": this.AuthorizationParam
          },
          // params:{"id": "37rDp8YkDeGVLqRS8INRiY"}
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
