/**
 * Wrapper for global Vue.
 * We need to load Vue & ElementUI (or BootstrapVue??) from homepage and wrap Vue to use as AMD module.
 */
define(function () {
    return window.Vue;
});