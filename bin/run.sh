#!/bin/sh

cd `dirname $0`

if [ -d "../bin" ]; then
    cd "../"
fi

#Stop the script if it's started as root
if [ "$(id -u)" -eq 0 ]; then
  echo "You shouldn't start Apuntalo as root!"
  exit 1
fi

SCRIPTPATH=`pwd -P`
exec node "$SCRIPTPATH/backend/server/server"
