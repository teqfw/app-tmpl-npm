"use strict";
const $path = require("path");

/**
 * Initializer for the application.
 *
 * @param {TeqFw_Core_App_Configurator} TeqFw_Core_App_Configurator
 * @param {TeqFw_Core_App_Registry_Front_Route} TeqFw_Core_App_Registry_Front_Route
 * @param {TeqFw_Core_App_Registry_Server_Realm} TeqFw_Core_App_Registry_Server_Realm
 * @param {TeqFw_Core_App_Registry_Server_Route} TeqFw_Core_App_Registry_Server_Route
 * @return {Vendor_App_Name_Sys_App_Init}
 * @constructor
 */
function Vendor_App_Name_Sys_App_Init(
    TeqFw_Core_App_Configurator,
    TeqFw_Core_App_Registry_Front_Route,
    TeqFw_Core_App_Registry_Server_Realm,
    TeqFw_Core_App_Registry_Server_Route
) {
    /* Private properties of the TeqFW object have prefix "_". */

    /** @type {TeqFw_Core_App_Configurator} */
    const _config = TeqFw_Core_App_Configurator;
    /** @type {TeqFw_Core_App_Registry_Front_Route} */
    const _reg_front_routes = TeqFw_Core_App_Registry_Front_Route;
    /** @type {TeqFw_Core_App_Registry_Server_Realm} */
    const _reg_back_realms = TeqFw_Core_App_Registry_Server_Realm;
    /** @type {TeqFw_Core_App_Registry_Server_Route} */
    const _reg_back_routes = TeqFw_Core_App_Registry_Server_Route;


    /**
     * Execute module's initialization. This function is called by framework on application startup.
     *
     * @return {Promise<void>}
     */
    this.exec = async function () {

        function setup_languages() {
            _config.set("lang", {available: ["en", "es", "ru"], default: "en"});
        }

        function setup_realms() {
            const path_root = _config.get("path/root");

            /* Init web server realms: TODO add docs URL here */
            _reg_back_realms.add({
                name: "mobile",
                path_to_home_page: $path.join(path_root, "pub", "mobile.html")
            });
            _reg_back_realms.add({
                name: "desktop",
                path_to_home_page: $path.join(path_root, "pub", "desktop.html")
            });
            _reg_back_realms.add({
                name: "admin",
                path_to_home_page: $path.join(path_root, "pub", "admin.html")
            });
            _reg_back_realms.setDefaultRealm("mobile");
        }

        /**
         * Setup backend routes (server side API).
         */
        function setup_routes_back() {
            _reg_back_routes.add({});
        }

        /**
         * Setup frontend routes (Single Page Application).
         */
        function setup_routes_front() {
            /* init web server routes */
            _reg_front_routes.add({path: "/home", component_name: "app-home", label: "Home"});
        }

        /* This function actions. */
        setup_languages();
        setup_realms();
        setup_routes_back();
        setup_routes_front();

    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = Vendor_App_Name_Sys_App_Init;