import 'whatwg-fetch';

export default class Ajax {

    static get(url, extraHeaders) {
        return Ajax._fetch('GET', url, null, extraHeaders);
    }

    static post(url, data, extraHeaders) {
        return Ajax._fetch('POST', url, data, extraHeaders);
    }

    static _fetch(method, url, data, extraHeaders) {
        if (url.indexOf('http') == -1)
            url = Ajax.baseUrl + url;
        else if (Ajax.baseUrl==null) {
            console.warn("Fetch before setup. Ignored.", method + " > " + url);
            reject();
            return;
        }
        return new Promise(function (fulfill, reject) {

            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            if (extraHeaders != undefined)
                headers = Object.assign(headers, extraHeaders);

            fetch(url, {
                method: method,
                headers: headers,
                body: data != undefined ? JSON.stringify(data) : null
            }).then(Ajax._checkStatus).then(Ajax._parseJSON).then((resp)=> {
                // console.log('ajax success ' + method, resp);
                fulfill(resp);
        }).catch((err)=> {
                console.log('ajax error ' + method, err);
            // console.log('ajax error message', err.message);
            // console.log('ajax error status', err.status);
            reject(err);
        });
        });
    }


    static upload(url, data, extraHeaders) {
        url = Ajax.baseUrl + url;
        return new Promise(function (fulfill, reject) {
            let headers = {};
            if (extraHeaders != undefined)
                headers = Object.assign(headers, extraHeaders);

            fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
            }).then(Ajax._checkStatus).then(Ajax._parseJSON).then((resp)=> {
                console.log('ajax success', resp);
            fulfill(resp);
        }).catch((err)=> {
                console.log('ajax error', err);
            // console.log('ajax error message', err.message);
            // console.log('ajax error status', err.status);
            reject(err);
        });
        });
    }

    static _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            console.log('_checkStatus', response);
            var error = new Error(response.statusText);
            error.response = response;
            error.status = response.status;
            throw error;
        }
    }

    static _parseJSON(response) {
        return response.json()
    }


    static setup(baseUrl) {
        Ajax.baseUrl = baseUrl;
    }
}
Ajax.baseUrl = null;