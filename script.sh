#!/bin/bash

CMD=$1
SUBCMD=$2
APP="myweb"
CMDS=(build run)

errorlog() {
    MSG=$1
    echo "[ERROR] ${MSG}"
    exit 1
}

buildback() {
    cd ${GOPATH} \
        && go install ${APP} \
        && cp ${GOPATH}\\bin\\${APP}.exe ~/bin/${APP}.exe \
        || errorlog "${APP} is failed to build ..."
}

buildfront() {
    cd ${GOPATH}\\src\\${APP}\\front \
        && npm run build \
        || ./node_modules/.bin/webpack \
        || errorlog "${APP}/front is failed to build ..."
}

run() {
    export PJTPATH="${GOPATH}\\src\\${APP}" \
        && myweb \
        || errorlog "${APP} is failed to run ..."
}

if [ -z ${CMD} ]; then
    buildback
    buildfront
    run
else
    # Build Command
    if [ ${CMD} == ${CMDS[0]} ]; then
        if [ ${SUBCMD} == "back" ]; then
            buildback
        elif [ ${SUBCMD} == "front" ]; then
            buildfront
        else
            buildback
            buildfront
        fi
    # Run Command
    elif [ ${CMD} == ${CMDS[1]} ]; then
        run
    else
        errorlog "Usable commands: ${CMDS[*]}"
    fi
fi

