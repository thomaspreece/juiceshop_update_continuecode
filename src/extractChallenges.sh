#!/bin/bash

currentDir=$(pwd)

rm $currentDir/challenges/*

if [ ! -d "$currentDir/juice-shop-src" ]; then
  git clone https://github.com/bkimminich/juice-shop.git juice-shop-src
  cd juice-shop-src
else
  cd juice-shop-src
  git fetch origin
fi

git tag | grep -e "^v" | while read line ; do
    git checkout tags/$line data/static/challenges.yml 2>/dev/null
    if [ $? -eq 0 ]; then
      cp data/static/challenges.yml $currentDir/challenges/challenges_${line}.yml
      date=$(git log -1 --format=%ai $line)
      echo "$line: $date"
    fi
done
