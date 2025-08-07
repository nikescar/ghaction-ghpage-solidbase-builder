# GH ACTION for GH PAGES with Solidbase
build documentation webpage with gh action for gh pages.

## Prerequisites

* _config.xml
* docs directory with md or mdx

## Github Workflow

```


```

### Inputs

### Outputs

## Github Pages push from local



## Set Pages to Other Providers
using nitro : https://nitro.build/config

### deploy to deno
https://nitro.build/deploy/providers/deno-deploy

```bash
$ NITRO_PRESET=deno_deploy npm run build

# Make sure to run the deployctl command from the output directory
$ cd .output
$ deployctl deploy --project=my-project server/index.ts
```

### deploy to firebase
https://nitro.build/deploy/providers/firebase

```bash
$ npm install -g firebase-tools@latest
$ firebase login
$ firebase init hosting
# edit firebase.json

$ NITRO_PRESET=firebase npm run build
$ firebase emulators:start
$ NITRO_PRESET=firebase npm run build
$ firebase deploy
```

### deploy to digital ocean
https://nitro.build/deploy/providers/digitalocean

```bash
NITRO_PRESET=digital_ocean

# add engines to package.json
# add start cmd to package.json

# run start on digitalocean
```