#!/bin/sh

# Author: 史莱姆 <https://github.com/shi-lai-mu>
# CTime:  2021.05.01
# This script run by root /opt/webhook/ssh



# 部署位置
ROOT="/home/work"
# 项目/创建 名
GIT_NAME="slmblog_nestjs-backend"
# git ssh url
GIT="git@gitee.com:shi_lai_mu/${GIT_NAME}.git"
# 创建父级
CREATE_ROOT="${ROOT}/server"
# 绝对位置
PROJECT_ROOT="${CREATE_ROOT}/${GIT_NAME}"


log() {
  echo $(date) "> " $1
}



# 重装需要在一位加 --uninstall
if [ $1 == "--uninstall" ];then
  if [ ! -d ${PROJECT_ROOT} ];then 
    rm -rf ${PROJECT_ROOT}
    log "delete project ${PROJECT_ROOT} done!"
  fi
fi



# 开始部署
if [ ! -d ${CREATE_ROOT} ];then
  cd ${CREATE_ROOT}
  git pull ${GIT}
  log "--------------- git pull done ---------------"
else
  mkdir ${CREATE_ROOT}
  cd ${CREATE_ROOT}
  git clone ${GIT}
  log "--------------- git clone done ---------------"
fi


cd ${GIT_NAME}
cnpm i
log "--------------- npm i done ---------------"
npm run build
npm run start
log "--------------- start done ---------------"
