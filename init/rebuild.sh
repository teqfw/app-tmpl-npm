#!/usr/bin/env bash
##
#   Rebuild JS project with dev-modules being placed to inner folders.
##
# current directory where from script was launched (to return to in the end)
DIR_CUR="$PWD"
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:=$(cd "$( dirname "$0" )/" && pwd)}

## =========================================================================
#   Setup working environment (this script's context)
## =========================================================================
DIR_MODULES="own_modules"
MOD_TEQFW_CORE_APP="teqfw-core-app"
MOD_TEQFW_CORE_DI="teqfw-core-di"
PATH_MODULES="${DIR_ROOT}/${DIR_MODULES}"


## =========================================================================
#   Perform processing
## =========================================================================
##
#   Clone dev modules if not cloned yet.
##
if test ! -d "${PATH_MODULES}" ; then
    echo "Create folder for own modules development."
    mkdir -p "${PATH_MODULES}"
fi

if test ! -d "${PATH_MODULES}/${MOD_TEQFW_CORE_APP}" ; then
    git clone https://github.com/teqfw/core-app.git "${PATH_MODULES}/${MOD_TEQFW_CORE_APP}"
    cd "${PATH_MODULES}/${MOD_TEQFW_CORE_APP}" || exit
    sudo npm link
    sudo rm -fr ./node_modules ./package-lock.json
else
    cd "${PATH_MODULES}/${MOD_TEQFW_CORE_APP}" || exit
    git pull
fi

if test ! -d "${PATH_MODULES}/${MOD_TEQFW_CORE_DI}" ; then
    git clone https://github.com/teqfw/core-di.git "${PATH_MODULES}/${MOD_TEQFW_CORE_DI}"
    cd "${PATH_MODULES}/${MOD_TEQFW_CORE_DI}" || exit
    sudo npm link
    sudo rm -fr ./node_modules ./package-lock.json
else
    cd "${PATH_MODULES}/${MOD_TEQFW_CORE_DI}" || exit
    git pull;
fi



##
#   Reinstall nodejs application.
##
echo "Remove installed dependencies and lock file."
rm -fr "${DIR_ROOT}/node_modules" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit
npm install


##
#   Link this project dev dependencies to cloned instances.
##
echo "Link dev. dependencies to the project."
cd "${DIR_ROOT}" || exit
npm link "${MOD_TEQFW_CORE_APP}"
npm link "${MOD_TEQFW_CORE_DI}"


##
#   Finalize script.
##
cd "${DIR_CUR}" || exit
echo "Done."