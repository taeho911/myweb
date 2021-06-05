#!/bin/bash

CMD=$1
SUBCMD=$2
[ -z ${SUBCMD} ] && SUBCMD="null"
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
        && cp ${GOPATH}\\bin\\${APP}.exe ${HOME}\\bin\\${APP}.exe \
        || errorlog "${APP} is failed to build ..."
}

buildfront() {
    cd ${GOPATH}\\src\\${APP}\\front \
        && npm run build \
        || ./node_modules/.bin/webpack \
        || errorlog "${APP}/front is failed to build ..."
}

cleanStatic() {
    rm -fr ${HOME}\\www\\${APP}\\static
}

distribute() {
    [ -d ${HOME}\\www\\${APP}\\static ] || mkdir -p ${HOME}\\www\\${APP}\\static
    cp -r ${GOPATH}\\src\\${APP}\\front\\dist\\. ${HOME}\\www\\${APP}\\static
}

run() {
    myweb || errorlog "${APP} is failed to run ..."
}

if [ -z ${CMD} ]; then
    buildback
    buildfront
    cleanStatic
    distribute
    run
else
    # Build Command
    if [ ${CMD} == ${CMDS[0]} ]; then
        if [ ${SUBCMD} == "back" ]; then
            buildback
        elif [ ${SUBCMD} == "front" ]; then
            buildfront
            cleanStatic
            distribute
        else
            buildback
            buildfront
            cleanStatic
            distribute
        fi
    # Run Command
    elif [ ${CMD} == ${CMDS[1]} ]; then
        run
    else
        errorlog "Usable commands: ${CMDS[*]}"
    fi
fi

