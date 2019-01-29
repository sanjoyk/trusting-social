import "whatwg-fetch";

import { NetworkError, NoAccessError, ServerError, APIError } from "./error.js";

const baseUrl = "https://api.nytimes.com/svc/search/v2";

// DEBUG: CONFIG
const traceFetch = false;

function objectStringify(obj) {
  if (!!(typeof obj === "function")) {
    return JSON.stringify(obj, null, " ")
  }
  return obj;

}

function fetchImpl(path, config, fetchCb) {
  if (traceFetch) {
    console.log(`FETCH: fetchImpl(${Object.keys(arguments).map(arg => objectStringify(arg)).join()})`)
  }

  return fetch(path, config)
    .then(response => {
      if (traceFetch) {
        console.log("FETCH: response");
        console.log(response);
      }
      const contentType = response.headers.get("Content-Type");
      if (contentType.indexOf("application/json") >= 0) {
        return response.json().then(data => {
          return { data: data, response: response };
        });
      } else {
        return response.text().then(data => {
          return { data: data, response: response };
        });
        // response.text().then(data => ({ data: data, response: response }));
        //add others type of content type
        console.log("Does not match content type");
      }
      // throw new NetworkError("Please connect to internet and try again.", path);
    }, error => {
      if (traceFetch) {
        console.log("FETCH: error:");
        console.log(error);
      }
      throw new NetworkError(`${error.message}, Please connect to internet and try again.`, path);

    })
    .then(({ data, response }) => {
      if (response.ok) {
        if (traceFetch) {
          console.log(`FETCH: OK response (${response.status}), data:`);
          console.log(data);
        }
        if (fetchCb) {
          return fetchCb(null, data);
        }
        return data;
      }
      let error;
      if (traceFetch) {
        console.log(`FETCH: BAD response (${response.status})`);
      }
      //clearly identify what is the exact error code
      //and put this error into application arror  with setting optional params critical
      if (response.status === 403 || response.status === 401 || response.status === 404) {
        //throw to .catch below
        error = new NoAccessError(data.message || "You don't have access to this item", response.status, path);
      } else if (typeof data === "string") {
        // throw to .catch below
        error = new ServerError(response.statusText, response.status, path);
      } else {
        debugger
        error = new APIError(data, response.status, path);
      }

      if (fetchCb) {
        //Build a response in the same format as API errors.
        return fetchCb(error, {
          // non_field_errors: [error.message.toString()]
        });
      }
      throw error;



    })
    .catch((error) => {
      //Handle all the errors thrown above as well as bugs in above
      console.log(`FETCH: ${error}`);
      if (traceFetch) {
        console.error(error);
      }
      if (fetchCb) {
        //Build a response in the same format as API errors.
        return fetchCb(error, {
          // non_field_errors: [error && error.message.toString()]
        });
      }
      throw error;
    });
}

class _TrustingSocialApi {
  constructor() {
    this.config = {
      method: "UNKNOWN",
    }
  }
  callRestApi(method, endPoint, paramsOrCb, cb) {
    const config = this.config;
    const params = (paramsOrCb && !(typeof paramsOrCb === "function"))
      ? paramsOrCb
      : null; //make call callback func later
    const callback = (paramsOrCb && (typeof paramsOrCb === "function"))
      ? paramsOrCb
      : cb;

    config.method = method;
    if (params) {
      if (params.isFormData) {
        config.body = params.data;
      } else {
        config.body = JSON.stringify(params);
        config.headers["Content-Type"] = "application/json; charset=UTF-8";
        //config.body = params;
      }

      // config.body = params;
    }
    return fetchImpl(baseUrl + endPoint, config, callback);
  }

  get(endPoint, paramsOrCb, cb) {
    return this.callRestApi("GET", endPoint, paramsOrCb, cb);

  }
}


export function TrustingSocialApi() {
  return new _TrustingSocialApi();
}