#!/bin/sh


if [ $# -ne 1 ]; then
  echo "[ERROR] pass parameter"
  echo "usage> ./create.sh OUTPUT-DIR"
  exit 1
fi


node bin/convert.js > $1/index.html

