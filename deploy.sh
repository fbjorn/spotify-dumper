#!/bin/sh
set -euo pipefail

[ "$#" -ne 1 ] && echo "Please provide target directory to pages sources" && exit 1
PAGES_DIR=$1
[ ! -d ${PAGES_DIR} ] && echo "Path ${PAGES_DIR} does not exist" && exit 1
DIST_DIR=dist

echo "-- Cleaning up ${DIST_DIR}"
rm -rf ./${DIST_DIR}
mkdir ${DIST_DIR}

echo "-- Building"
yarn run build

echo "-- Copying files to ${PAGES_DIR}"
cp -r ${DIST_DIR}/* ${PAGES_DIR}/

echo "-- Pushing"
cd ${PAGES_DIR}
git status
echo
read -r -p "Are you sure you want to commit and push these changes? [y/N] " response
case "$response" in
    [yY][eE][sS]|[yY]) 
        git add .
        git commit -m "Update pages"
        [ "$!" -e 0 ] && git push
        ;;
    *)
        exit 1
        ;;
esac
cd -
