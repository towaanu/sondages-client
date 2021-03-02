#!/bin/sh

rm -rf ./build

docker run \
    -v `pwd`:/sondages \
    -w /sondages \
    node:alpine \
    npm install && npm run build:production

echo "Build created here : `pwd`/build"
