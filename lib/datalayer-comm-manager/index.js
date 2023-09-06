'use strict'

const RequestManager = require("./request-manager/index");

let _dataLayerCommConfig = undefined;

//its value must be same in access-control plugin config
const DATA_LAYER_IDENTIFIER = "data-layer"

class ServiceCommunicationManager {
    /**
     * DataLayerCommManager- responsible for communication with data layer
     * @param {Object} config - configuration to communicate with data layer
     * @param {string} config.subdomain- subdomain name
     * @param {string} config.port - this is optional by default will be 80
     */

    constructor(config) {
        //this config will consider only if _dataLayerCommConfig is undefined
        _configDataLayerComm(config);
    }

    getDataLayerCommConfig() {
        if (_dataLayerCommConfig === undefined) {
            throw new Error("DataLayer Access Manager is not configured");
        }
        return _dataLayerCommConfig;
    }

    /**
     * send request from service layer to data layer using provided config
     * @param {Object} requestConfig - refer node request module config property
     * @param {Object} callback - can be a function
     */
    sendRequestToDataLayer(requestConfig) {
        requestConfig.json = requestConfig.json || true;

        let requestManager = new RequestManager();
        return requestManager.sendRequestToEndPoint(requestConfig);
    }

    /**
     * to access node module request object
     */

    getRawRequestObject() {
        let requestManager = new RequestManager();
        return requestManager.getRequestObject();
    }

    getDataLayerIdentifier() {
        return DATA_LAYER_IDENTIFIER;
    }


    createConfig = (url, method, body, headers) => {
        if (!url || !method) {
            throw new Error("URL and method required")
        }

        if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && !body) {
            throw new Error("Body required");
        }

        let requestConfig = {
            method: method.toUpperCase(),
            uri: url,
            json: body,
            headers: {
                "content-type": "application/json",
                ...headers
            }
        };
        return requestConfig;
    }
}



function _configDataLayerComm(config) {
    if (_dataLayerCommConfig === undefined) {
        _dataLayerCommConfig = config;
    }
    return _dataLayerCommConfig;
}


module.exports = new ServiceCommunicationManager();

