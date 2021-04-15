/**
 * Initialize development environment to run dev tests.
 */
import $path from 'path';
import Container from '@teqfw/di';

/* Create and setup DI container (DI own namespace) */
const url = new URL(import.meta.url);
const pathScript = $path.dirname(url.pathname);
const pathPrj = $path.join(pathScript, '../..');
const srcTeqFwDi = $path.join(pathPrj, 'node_modules/@teqfw/di/src');
/** @type {TeqFw_Di_Container} */
const container = new Container();
container.addSourceMapping('TeqFw_Di', srcTeqFwDi, true, 'mjs');

/**
 * Setup development environment (if not set before) and return DI container.
 *
 * @returns {Promise<TeqFw_Di_Container>}
 */
export default async function init() {
    // DEFINE INNER FUNCTIONS
    /**
     * Load local configuration (/cfg/local.json).
     *
     * @param {TeqFw_Di_Container} container
     * @param {String} path
     * @return {Promise<void>}
     */
    async function initConfig(container, path) {
        /** @type {TeqFw_Core_App_Config} */
        const config = await container.get('TeqFw_Core_App_Config$');
        config.load({rootPath: path});  // load local configuration
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = await container.get('TeqFw_Core_App_Defaults$');
        container.set(DEF.DI_CONFIG, config.get());
    }

    /**
     * Connect to database.
     *
     * @param {TeqFw_Di_Container} container
     * @return {Promise<void>}
     */
    async function initDb(container) {
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = await container.get('TeqFw_Core_App_Db_Connector$');  // singleton instance
        await rdb.init();
        // const finalizer = function (boo) {
        //     debugger
        // };
        // const registry = new FinalizationRegistry(finalizer);
        // registry.register(rdb, 'payload');
    }

    /**
     * Scan project for TeqFW plugins and add namespaces to DI container.
     *
     * @param {TeqFw_Di_Container} container
     * @param {String} path
     * @return {Promise<void>}
     */
    async function initDi(container, path) {
        /** @type {TeqFw_Di_Util_PluginScanner} */
        const scanner = await container.get('TeqFw_Di_Util_PluginScanner$');
        const spaces = await scanner.getNamespaces(path);
        for (const [ns, entry] of Object.entries(spaces)) {
            /** @type {TeqFw_Di_Api_ResolveDetails} (to use IDE autocomplete) */
            const data = entry;
            container.addSourceMapping(data.ns, data.path, data.isAbsolute, data.ext);
        }
    }

    /**
     * Setup logger to use console transport.
     *
     * @param {TeqFw_Di_Container} container
     * @return {Promise<void>}
     */
    async function initLogger(container) {
        /** @type {TeqFw_Core_App_Logger} */
        const logger = await container.get('TeqFw_Core_App_Logger$');
        /** @type {TeqFw_Core_App_Logger_Transport_Console} */
        const logTransport = await container.get('TeqFw_Core_App_Logger_Transport_Console$');
        logger.addTransport(logTransport);
    }

    // MAIN FUNCTIONALITY

    // init env if has not been initiated before (one namespace only can be resolved)
    const {logicalNs} = container.getNsResolver().list();
    if (Object.keys(logicalNs).length <= 1) {
        await initDi(container, pathPrj);
        await initConfig(container, pathPrj);
        await initLogger(container);
        await initDb(container);
    }

    return container;
}
