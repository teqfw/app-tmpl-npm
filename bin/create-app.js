#!/usr/bin/env node
"use strict";
/** =============================================================================
 * Import.
 * =========================================================================== */
const fs = require("fs");
const path = require("path");
const process = require("process");


/** =============================================================================
 * Definitions.
 * =========================================================================== */
const DEF_APP_NAME = "teqfw-app";
const DIR_INIT = "init";


/**
 * Compose full path to the folder with default structure of the application files & folders.
 * @returns {string}
 */
function get_path_source() {
    const dir_root = path.join(__dirname, '..');
    const result = path.join(dir_root, DIR_INIT);
    return result;
}

/**
 * Compose full path to the root folder of the new app.
 *
 * @returns {string}
 */
function get_path_target() {
    const dir_work = process.cwd();
    // get the first CLI argument (0 - npm, 1 - create-app.js, 2 - the first argument if exists)
    const cli_arg = process.argv[2];
    const app_name = (cli_arg !== undefined) ? cli_arg : DEF_APP_NAME;
    const result = path.join(dir_work, app_name);
    return result;
}

/**
 * Create inner folders in new application.
 *
 * https://stackoverflow.com/a/26038979/4073821
 */
function copy_file_structure(source, target) {

    function copy_file(source, target) {

        let inner_target = target;

        //if target is a directory a new file with the same name will be created
        if (fs.existsSync(target)) {
            if (fs.lstatSync(target).isDirectory()) {
                inner_target = path.join(target, path.basename(source));
            }
        }

        fs.writeFileSync(inner_target, fs.readFileSync(source));
    }

    function copy_dir(source, target) {
        //check if folder needs to be created or integrated
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        //copy
        if (fs.lstatSync(source).isDirectory()) {
            const files = fs.readdirSync(source);
            files.forEach(function (file) {
                const inner_source = path.join(source, file);
                const inner_target = path.join(target, file);
                if (fs.lstatSync(inner_source).isDirectory()) {
                    copy_dir(inner_source, inner_target);
                } else {
                    copy_file(inner_source, inner_target);
                }
            });
        }
    }

    copy_dir(source, target);
}

/** =============================================================================
 * Configuration.
 * =========================================================================== */
process.on("exit", (code) => {
    console.log(`About to exit with code: ${code}`);
});


/** =============================================================================
 * Processing.
 * =========================================================================== */
const path_source = get_path_source();
const path_target = get_path_target();
copy_file_structure(path_source, path_target);