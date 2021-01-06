# TeXをSVG化する

フォームに入力したTeX数式をSVG化して表示するWebサイト

```
$ export NODE_PATH = モジュールのインストールpath
$ node app.js
```

## 必要モジュール

`express`、`ejs`、`mathjax-node`が必要

## 解説

`views/index.ejs`を読み込み、`public`を静的ファイルとして提供する。


## トラブルシューティング

モジュールのPATHを確認する。もしインストール先のディレクトリがない場合は`export`で`NODE_PATH=インストール先ディレクトリ`として追加する。

```
$ node
> global.module.paths
[ '/opt/jarvis/repl/node_modules',
  '/opt/jarvis/node_modules',
  '/opt/node_modules',
  '/node_modules',
  '/root/.node_modules',
  '/root/.node_libraries',
  '/usr/lib/node' ]
> .exit # node を終了
```

