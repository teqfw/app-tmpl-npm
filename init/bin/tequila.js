#!/usr/bin/env node
"use strict";
/** **************************************************************************
 * Main script for TeqFW based application to perform any available command.
 * ************************************************************************ */

/* Initialize global environment before import the application. */
const path = require("path");
const VERSION = "0.1.0"; // SET CURRENT VERSION FOR YOUR APP HERE
const path_root = path.join(__dirname, "..");

// Import application parts (compose application itself)
const app = new (require("teqfw-core-app"))();
// ... then run the application (scan teqfw-modules, initialize app, run given console command).
app.run({
    root: path_root,
    version: VERSION
});