'use strict';

const request = require("request");

class RequestManager {

    /**
     * send request to data layer
     * @param {Object} requestConfig - request module configurations
     */

    sendRequestToEndPoint(requestConfig) {
        return new Promise(function (resolve, reject) {
            request(requestConfig, function (err, response, body) {
                if (err) {
                    reject(err);
                }
                resolve(body);
            });
        })
    }

    getRequestObject() {
        return request;
    }
}

module.exports = RequestManager;
