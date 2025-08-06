#!/usr/bin/env bash
# this script is called by github workflow after repository cloned to .solidbase dir.
# pushd ./.solidbase
# bash ghworkflow.sh
# popd

# echo "Cleaning routes folder in examples in theme routes..."
rm -rf ./src/routes/*
cp ../_config.yml ./

# echo "Copying files from ../ to ./src/routes..."
inclusion_list=$(yq eval '.include[]' _config.yml)
exclusion_list=$(yq eval '.exclude[]' _config.yml)
echo "Inclusion list: $inclusion_list"
echo "Exclusion list: $exclusion_list"

mkdir -p ./src/routes
cp "../index.md" ./src/routes/index.md

for item in $inclusion_list; do
  cp -rf "../${item}" ./src/routes/${item}
done

for item in $exclusion_list; do
  rm -rf "./src/routes/${item}"
done

echo "Listing files in src/routes after include and exclude..."
ls -al ./src/routes/

echo "Installing npm dependencies..."
npm install

# echo "Building the project..."
npx vinxi build

# echo "Copying 404.html to the public directory..."
rm -rf ./.output/public/404.html*
cp _404.html ./.output/public/404.html

favicon_path=$(yq eval '.site_favicon' _config.yml)
if [ -n "$favicon_path" ]; then
  # echo "Copying favicon from $favicon_path to ./.output/public/favicon.ico"
  cp "${favicon_path}" ./.output/public/favicon.ico
fi

# copy resources to public
for item in $inclusion_list; do
  cp -r "../${item}" ./.output/public/
done

for item in $exclusion_list; do
  rm -rf "./.output/public/${item}"
done

ls -alth ./.output/public