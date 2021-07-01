#!/bin/bash
# build.sh
#

basename=$1;
runenv=$2;

echo "----------------------------------"

if [ ! -n "$basename" ]; then
  read -p "无basename传入，请输入basename : " basename
fi
if [ ! -n "$runenv" ]; then
  echo "请选择打包环境"
  select runenv in dev pro;
  do
    break
  done
fi

echo "打包环境为： $runenv  basename为： $basename  开始打包--------"

if [ "$runenv" = "dev" ];then
  cross-env REACT_APP_BASENAME="$basename" dotenv -e .env.development ./node_modules/.bin/zxb-script build
else
  cross-env REACT_APP_BASENAME="$basename" dotenv -e .env.production ./node_modules/.bin/zxb-script build
fi
