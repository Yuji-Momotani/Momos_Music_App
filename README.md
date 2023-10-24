# music-app

## 概要

DTM での作曲、DJ プレイの支援をユーザーに提供するアプリ<br/>
音楽ストリーミングサービスを提供する Spotify の API を用いて、<br/>
同サービス内で提供されている楽曲の詳細パラメータを可視化することよって、<br/>
DTM 初学者の作曲練習(大抵、既存曲をコピーすることから始める)や<br/>
DJ Mix の支援をする。

## ローカル起動

```
rm -rf node_modules && npm install
npm run serve -- --mode=local
```

## アプリケーション内で使用している技術一覧

### フロントエンド

- HTML
- CSS
  - TailwindCSS
- JavaScript
  - Vue.js
    - VueRouter(ルーティング・SPA の実現)
    - Vue CLI

### API

- 楽曲検索系：Spotify API

### バックエンド

- 現状のバージョンではなし。

### インフラ

- AWS
  - S3：クラウドストレージ
  - CloudFront：CDN サービス
  - Route53：DNS サービス(2023/10 時点、廃止)
  - ACM：SSL 証明書発行サービス

## バージョン情報

- 1.00
  - 楽曲情報検索 App
    - SearchPlayingMusic 画面：Spotify で再生中の楽曲情報を取得できる
    - SearchKeywordMusic 画面：キーワード入力で楽曲情報を取得できる
    - SearchDJNextTune 画面：DJ の Mix リストを作成できる。選曲した楽曲情報をもとに次の曲を自動で提案してくれる機能
  - コード検索 App
    - コード検索画面
