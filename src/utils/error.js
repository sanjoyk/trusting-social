class BaseError {
  constructor(message, statusCode, url) {
    this.message = message;
    this.statusCode = statusCode;
    this.url = url;
  }
  toString() {
    return "Somthings went wrong! Please reaload";
  }

  isServerError() {
    return false;
  }
  isAPIError() {
    return false;
  }
  isNetworkError() {
    return false;
  }
  isTimeout() {
    return false;
  }
  isUnauthorized() {
    return false
  }

}
//Representation of server response that had an HTTP error status
export class ServerError extends BaseError {
  constructor(message, statusCode, url) {
    super(message, statusCode, url);
  }
  isServerError() {
    return true;
  }
  toString() {
    return `${this.message} (${this.statusCode}) at ${this.url}`;
  }
}

//Representation of a server that had an HTTP error status and included a  JSON reason.
export class APIError extends BaseError {
  constructor(reason, statusCode, url) {
    // super( reason.message?reason.message.join(", "):  "API error", statusCode, url );
    super(reason.message ? reason.message : "API error", statusCode, url);
    this.reason = reason;
  }
  isAPIError() {
    return true;
  }
  toString() {
    return `${this.message}`;
    // return `${this.message} (${this.statusCode}) at ${this.url}`;
  }
  getReason() {
    return this.reason;
  }
}


//Representation of a network error during a fetch
export class NetworkError extends BaseError {
  constructor(message, url) {
    super(message, null, url);
  }
  isNetworkError() {
    return true;
  }
  toString() {
    return `Network error: (${this.message}) at ${this.url}`;
  }
}

export class TimeoutError extends BaseError {
  constructor(message, url) {
    super(message, null, url);
  }

  isTimeout() {
    return true;
  }
  toString() {
    return `Timeout: ${this.message} at ${this.url}`
  }
}
