"use strict";
requirejs.config({
    paths: {
        /* RequireJS plugins (starting from small letter) */
        json: "//cdn.jsdelivr.net/npm/requirejs-json@0.0.3/json.min",
        text: "//cdn.jsdelivr.net/npm/requirejs-text@2.0.15/text.min",
        vue: "//cdn.jsdelivr.net/npm/requirejs-vue@1.1.5/requirejs-vue.min",
        /* Vue related libs (starting from capital letter) */
        // VueMinDisabledInChromeDevTools: "//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min",
        Vue: "/pub/wrap_vue",
        VueRouter: "//cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min"
    }
});

requirejs([
    "Vue",
    "VueRouter",
    "json!/core/app/config/get",
    "/pub/teqfw-core-app/js/logger.js",
    "/pub/teqfw-core-app/js/Logger/Trans/Console.js",
    "vue!./app"
], function (Vue, VueRouter, cfg, logger, trans_console, app) {
    // configure logger
    let logger_cfg = {};
    if (cfg.app && cfg.app.logger && cfg.app.logger.cfg) {
        logger_cfg = cfg.app.logger.cfg;
    }
    logger.config(logger_cfg);
    logger.addTransport(trans_console);
    logger.info("Boot is complete.", cfg);
    Vue.use(VueRouter);
    // init router
    const routes = [];
    const routes_items = cfg.routes;
    /** @type {TeqFw_Core_App_Registry_Front_Route.Entry} one */
    for (const one of routes_items) {
        const path = one.path;
        const label = one.label;
        const comp_name = one.component_name;
        const comp_obj = Vue.component(comp_name);
        routes.push({path: path, name: label, component: comp_obj});
    }

    const router = new VueRouter({
        mode: 'history',
        routes: routes
    });

    new Vue({
        router,
        el: "#teqfw-app"
    });
});