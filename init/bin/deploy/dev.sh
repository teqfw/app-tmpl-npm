#!/usr/bin/env bash
##
#   Rebuild JS project with modules being placed to inner folders.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}

echo "Remove installed dependencies and lock file."
rm -fr "${DIR_ROOT}/node_modules" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit 255
npm install

echo "Remove cloned dependencies (sources)."
#rm -fr "${DIR_ROOT}/own_modules/@teqfw"
#rm -fr "${DIR_ROOT}/own_modules/@flancer32"

echo "Clone dependencies from github to inner folders."
mkdir -p "${DIR_ROOT}/own_modules/@teqfw/"
mkdir -p "${DIR_ROOT}/own_modules/@flancer32/"
git clone https://github.com/teqfw/di.git "${DIR_ROOT}/own_modules/@teqfw/di"
git clone https://github.com/teqfw/core-app.git "${DIR_ROOT}/own_modules/@teqfw/core-app"
git clone git@github.com:flancer32/teq_acl.git "${DIR_ROOT}/own_modules/@flancer32/teq_acl"
git clone git@github.com:flancer32/teq_user.git "${DIR_ROOT}/own_modules/@flancer32/teq_user"
git clone https://github.com/flancer32/pwa_app.git "${DIR_ROOT}/own_modules/@flancer32/pwa_app"

echo "Link dependencies to '/usr/lib/node_modules/'."
cd "${DIR_ROOT}/own_modules/@teqfw/di" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@teqfw/core-app" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@flancer32/teq_user" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@flancer32/teq_acl" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@flancer32/pwa_app" || exit 255
sudo npm link

echo "Link dependencies to the project."
cd "${DIR_ROOT}" || exit 255
npm link "@teqfw/di"
npm link "@teqfw/core-app"
npm link "@flancer32/teq_user"
npm link "@flancer32/teq_acl"
npm link "@flancer32/pwa_app"

echo "Done."
