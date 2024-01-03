# tidelevel

- [気象庁 潮位データ 2024-01-01/02 （日本海側5府県）](https://code4fukui.github.io/tidelevel/)

## auto update

```sh
mkdir .github; mkdir .github/workflows
```

edit scheduled-update.yml
```sh
  cat > .github/workflows/scheduled-update.yml
```

```
name: Scheduled update

on:
  workflow_dispatch:
  schedule:
    # 10分間隔で実行
    - cron: '*/10 * * * *'

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - name: make
        run: |
          deno run -A download.js
      - name: commit and push
        run: |
          git config --global user.email "workflow@example.com"
          git config --global user.name "workflow user"
          git add .
          git commit -m 'update data' && git push ${REPO} HEAD:${{github.event.pull_request.head.ref}} || true
          git push
```
