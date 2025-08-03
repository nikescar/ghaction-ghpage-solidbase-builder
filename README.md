
# build process

1. solidbase app build
2. jekyll theme build
3. jekyll site build

# solidbase app build

```bash
$ npm install
$ npx vinxi dev
$ npx vinxi build
```

# Jekyll-theme-solidbase Local Install and build

```bash
# first time
$ gem install jekyll -v 3.9.3
$ gem install bundler:2.5.23
$ bundle _2.5.23_ install
$ bundle _2.5.23_ exec jekyll serve
$ bundle _2.5.23_ add webrick
```

```bash
# new jekyll templates
$ jekyll _3.9.3_ new jekyllsample
# jekyll build
$ bundle _2.5.23_ exec jekyll _3.9.3_ build
```

