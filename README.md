# music-app

## 概要
DTMでの作曲、DJプレイの支援をユーザーに提供するアプリ<br/>
音楽ストリーミングサービスを提供するSpotifyのAPIを用いて、<br/>
同サービス内で提供されている楽曲の詳細パラメータを可視化することよって、<br/>
DTM初学者の作曲練習(大抵、既存曲をコピーすることから始める)や<br/>
DJ Mixの支援をする。

## 機能一覧

例）〇〇画面：〇〇すると、〇〇してくれる

## アプリケーション内で使用している技術一覧
### フロントエンド
- HTML
- CSS
  - TailwindCSS
- JavaScript
  - Vue.js
    - VueRouter(ルーティング・SPAの実現)
    - Vue CLI
### API
- 楽曲検索系：Spotify API
### バックエンド
- 現状のバージョンではなし。

### インフラ
- AWS
  - S3：クラウドストレージ
  - CloudFront：CDNサービス
  - Route53：DNSサービス
  - ACM：SSL証明書発行サービス

## バージョン情報

- 1.00
  - 楽曲情報検索App
    - SearchPlayingMusic画面：Spotifyで再生中の楽曲情報を取得できる
    - SearchKeywordMusic画面：キーワード入力で楽曲情報を取得できる
    - SearchDJNextTune画面：DJのMixリストを作成できる。選曲した楽曲情報をもとに次の曲を自動で提案してくれる機能
  - コード検索App
    - コード検索画面