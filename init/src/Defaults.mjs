/**
 * Application level constants (hardcoded configuration).
 */
class Vendor_Project_Defaults {
    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')

    // DI container labels for objects used by this plugin
    DI_OBJ = 'pluginObject';

    // DEF-objects of the dependencies.
    /** @type {TeqFw_Core_App_Defaults} */
    MOD_CORE;
    /** @type {TeqFw_Ui_Quasar_Defaults} */
    MOD_QUASAR;
    /** @type {Fl32_Ap_User_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Vue_Defaults} */
    MOD_VUE;

    // FRONTEND REALMS & ROUTES
    REALM_ADM = 'admin';
    REALM_ADM_ROUTE_home = '/';
    REALM_ADM_ROUTE_signIn_codeCheck = 'SET IN CONSTRUCTOR';
    REALM_ADM_ROUTE_signIn_emailGet = '/signIn/emailGet';
    REALM_PUB = 'pub';
    REALM_PUB_ROUTE_home = '/';
    REALM_PUB_ROUTE_signIn_codeCheck = 'SET IN CONSTRUCTOR';
    REALM_PUB_ROUTE_signIn_emailGet = '/signIn/emailGet';

    // SERVICES ROUTES
    SERV_GROUP_LIST = '/group/list'; // service at '/api/app/group/list' route

    constructor(spec) {
        this.MOD_CORE = spec['TeqFw_Core_App_Defaults$']; // instance singleton
        this.MOD_QUASAR = spec['TeqFw_Ui_Quasar_Defaults$']; // instance singleton
        this.MOD_USER = spec['Fl32_Ap_User_Defaults$']; // instance singleton
        this.MOD_VUE = spec['TeqFw_Vue_Defaults$']; // instance singleton

        // INIT PROPS, DEFINE WORKING VARS
        this.REALM_ADM_ROUTE_signIn_codeCheck = this.MOD_USER.REALM_DEF_ROUTE_signIn_codeCheck;
        this.REALM_PUB_ROUTE_signIn_codeCheck = this.MOD_USER.REALM_DEF_ROUTE_signIn_codeCheck;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}

// MODULE'S EXPORT
export default Vendor_Project_Defaults;
