<template>
  <div class="search">
    <h1 class="text-2xl py-2">SearchDJNextTune</h1>
    
    <!-- エラー情報 -->
    <div class="py-1.5 text-red-600">
      {{err_message}}
    </div>

    <!-- 選曲リスト -->
    <div v-if="!err_message && array_music_select_data.length != 0" v-cloak class="mt-8">
      <div v-for="(item,n) in array_music_select_data" v-bind:key="n">
        <div v-if="n>0">
          <!-- 1件目以降は矢印をつける -->
          ↓<br />
        </div>
        {{n+1}}：{{item.name}}&emsp;{{item.artists[0].name}}
      </div>
      <div class="mt-4">
        <button class="py-1.5 px-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          @click="CreateList">リストを作成
        </button>
      </div>
    </div>

    <div v-if="isKeyword_Select" class="mt-8">
      <input
          placeholder="enter track name"
          v-model="search_keyword"
          class="py-1 text-black rounded"
          required>
      <button class="py-1.5 px-4 transition-colors bg-green-300 border active:bg-green-600 font-medium border-green-600 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 ml-4"
        @click="seachTrack">
        検索
      </button>
    </div>
    <!-- 一般情報 -->
    <div class="py-1.5 mt-4">
          {{type_wait_message}}
    </div>

    <div v-if="!err_message && array_response_data.length > 0" v-cloak>
      <div v-for="(item,n) in array_response_data" v-bind:key="n" class="mt-12 order-dashed border-gray-600 border-4">
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

            <div class="grid grid-cols-7 my-4">
              <div class="col-span-2"></div>
              <div class="col-span-3 text-center">
                <button @click="AddMusic(n)" class="py-1 px-8 transition-colors bg-green-300 border active:bg-green-600 font-medium border-white text-white rounded-lg hover:bg-green-600 disabled:opacity-50">
                  リストに追加</button>
              </div>
              <div class="col-span-2"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!err_message && search_action_flg && array_response_data.length === 0">
      <!-- 検索はかけたが、結果がなかった場合 -->
      <p class="py-1.5">
        データが見つかりませんでした。
      </p>
    </div>

    <div v-if="!isKeyword_Select" class="mt-4">
      <p>推奨された曲に気に入ったものがありませんか？</p><br/>
      <button @click="ChangeSearchKeyword" class="py-1.5 px-4 transition-colors bg-transparent active:bg-gray-200 font-medium text-blue-600 rounded-lg hover:bg-gray-100 disabled:opacity-50">
        キーワード検索にする</button>
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
  // import _ from 'lodash'

  export default {
    name:'search',
    props: {
      // routeParams: Object
      AuthorizationParam:String
    },
    data(){
      return {
        search_keyword: '',
        search_action_flg: false,
        array_response_data:[], //キーワード検索のデータ
        array_response_audio_features_data:[],//キーワード検索の詳細データ
        array_next_music_data:[], //レコメンド検索のデータ
        array_next_music_audio_features_data:[], //レコメンド検索の詳細データ
        array_music_select_data:[], //選曲された曲の一般情報
        array_music_select_audio_features_data:[], //選曲された曲の詳細情報
        isKeyword_Select:true,

        // 詳細データ(詳細情報の個別配列を用意するのは、それぞれデータを変換しないといけないから
        // v-forの中でやるには少々面倒なため、変換後のデータが格納される。)
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
      // search_keyword:function(){
      //   this.type_wait_message = '入力中...'
      //   this.debouncedSeachTrack()
      // },
      array_response_data: function(newData){
        // console.log(newData.tracks.items[0].id)
        // this.seachTrackAudioFeature(newData.tracks.items[0].album.id)
        if(newData != null){
          this.seachTrackAudioFeature(newData)
        }
      }
    },
    created: function() {
      this.err_message = ''
    },
    mounted:function(){
      // lodashの使用(最後の入力から3000msec待って、getAnswerを走らせる)
      //this.debouncedSeachTrack = _.debounce(this.seachTrack,3000)

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
          this.type_wait_message = '検索してください。'
          this.array_response_data = []
          return
        }
        this.search_action_flg = true

        axios.get("https://api.spotify.com/v1/search",{
          headers:{
            // "Authorization": this.$route.query.token_type + ' ' + this.$route.query.access_token
            "Authorization": this.AuthorizationParam
          },
          params:{"q": this.search_keyword , "limit": "5", "offset": "0", "type": "track", "market": "JP"}
        }).then(response=>{
          this.array_response_data = response.data.tracks.items
          //デバッグ
          console.log('テストsearch')
          console.log(this.array_response_data)
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
        // console.log(this.$route.query.token_type + ' ' + this.$route.query.access_token)
        if(this.array_response_data.length === 0){
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
            //デバッグ
            // console.log('audio_featureテスト')
            // console.log(response.data)

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
      },
      AddMusic(index){
        this.array_music_select_data.push(this.array_response_data[index])
        this.array_music_select_audio_features_data.push(this.array_response_audio_features_data[index])

        // 追加された音楽の情報を元に次の曲を検索
        const arrLen = this.array_music_select_audio_features_data.length // 何件リストに入っているか
        axios.get("https://api.spotify.com/v1/recommendations",{
          headers:{
            // "Authorization": this.$route.query.token_type + ' ' + this.$route.query.access_token
            "Authorization": this.AuthorizationParam
          },
          params:{
            "seed_tracks": this.array_music_select_audio_features_data[arrLen-1].id
            ,"seed_artists": this.array_music_select_data[arrLen-1].artists[0].id
            , "min_tempo": (this.array_music_select_audio_features_data[arrLen-1].tempo * 0.9).toString()
            , "max_tempo": (this.array_music_select_audio_features_data[arrLen-1].tempo * 1.1).toString()
            , "min_danceability": (this.array_music_select_audio_features_data[arrLen-1].danceability * 0.9).toString()
            , "max_danceability": (this.array_music_select_audio_features_data[arrLen-1].danceability * 1.1).toString()
            , "min_energy": (this.array_music_select_audio_features_data[arrLen-1].energy * 0.9).toString()
            , "max_energy": (this.array_music_select_audio_features_data[arrLen-1].energy * 1.1).toString()
            , "limit": "7"
            , "market": "JP"
          }
        }).then(response=>{
          this.array_response_data = response.data.tracks
          this.isKeyword_Select = false
          //デバッグ
          // console.log('テストNext');
          // console.log(this.array_music_select_data);
          
          this.type_wait_message = ''
        }).catch(error =>{
          this.type_wait_message = ''
          this.err_message = 'API通信中にエラーが発生しました。¥nうまく動作しない場合は再度認証してください。'
          console.log(error)
        })
      },
      CreateList(){
        alert('現在開発中です。Version1.2以降で追加予定です。')
      },
      ChangeSearchKeyword(){
        this.isKeyword_Select = true
        this.search_action_flg = false
        this.search_keyword = ""
        this.type_wait_message = "検索してください。"

        this.array_response_data = []
        this.array_response_audio_features_data = []
        scrollTo(0,0)
      }
    }
  }
</script>
