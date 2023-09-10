var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "../../node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// ../../node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// ../../node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "../../node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// ../../node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "../../node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// ../../node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "../../node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// ../../node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "../../node_modules/axios/lib/core/enhanceError.js"(exports, module) {
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  }
});

// ../../node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "../../node_modules/axios/lib/core/createError.js"(exports, module) {
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError2(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// ../../node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "../../node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var createError2 = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError2(
          "Request failed with status code " + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
  }
});

// ../../node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "../../node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// ../../node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "../../node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// ../../node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "../../node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// ../../node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "../../node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath2(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// ../../node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "../../node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// ../../node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "../../node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// ../../node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "../../node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath2 = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError2 = require_createError();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath2(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError2("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError2("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError2(
            timeoutErrorMessage,
            config,
            config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// ../../node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "../../node_modules/axios/lib/defaults.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// ../../node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "../../node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// ../../node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "../../node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// ../../node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "../../node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// ../../node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "../../node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  }
});

// ../../node_modules/axios/package.json
var require_package = __commonJS({
  "../../node_modules/axios/package.json"(exports, module) {
    module.exports = {
      name: "axios",
      version: "0.21.4",
      description: "Promise based HTTP client for the browser and node.js",
      main: "index.js",
      scripts: {
        test: "grunt test",
        start: "node ./sandbox/server.js",
        build: "NODE_ENV=production grunt build",
        preversion: "npm test",
        version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
        postversion: "git push && git push --tags",
        examples: "node ./examples/server.js",
        coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        fix: "eslint --fix lib/**/*.js"
      },
      repository: {
        type: "git",
        url: "https://github.com/axios/axios.git"
      },
      keywords: [
        "xhr",
        "http",
        "ajax",
        "promise",
        "node"
      ],
      author: "Matt Zabriskie",
      license: "MIT",
      bugs: {
        url: "https://github.com/axios/axios/issues"
      },
      homepage: "https://axios-http.com",
      devDependencies: {
        coveralls: "^3.0.0",
        "es6-promise": "^4.2.4",
        grunt: "^1.3.0",
        "grunt-banner": "^0.6.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-clean": "^1.1.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-eslint": "^23.0.0",
        "grunt-karma": "^4.0.0",
        "grunt-mocha-test": "^0.13.3",
        "grunt-ts": "^6.0.0-beta.19",
        "grunt-webpack": "^4.0.2",
        "istanbul-instrumenter-loader": "^1.0.0",
        "jasmine-core": "^2.4.1",
        karma: "^6.3.2",
        "karma-chrome-launcher": "^3.1.0",
        "karma-firefox-launcher": "^2.1.0",
        "karma-jasmine": "^1.1.1",
        "karma-jasmine-ajax": "^0.1.13",
        "karma-safari-launcher": "^1.0.0",
        "karma-sauce-launcher": "^4.3.6",
        "karma-sinon": "^1.0.5",
        "karma-sourcemap-loader": "^0.3.8",
        "karma-webpack": "^4.0.2",
        "load-grunt-tasks": "^3.5.2",
        minimist: "^1.2.0",
        mocha: "^8.2.1",
        sinon: "^4.5.0",
        "terser-webpack-plugin": "^4.2.3",
        typescript: "^4.0.5",
        "url-search-params": "^0.10.0",
        webpack: "^4.44.2",
        "webpack-dev-server": "^3.11.0"
      },
      browser: {
        "./lib/adapters/http.js": "./lib/adapters/xhr.js"
      },
      jsdelivr: "dist/axios.min.js",
      unpkg: "dist/axios.min.js",
      typings: "./index.d.ts",
      dependencies: {
        "follow-redirects": "^1.14.0"
      },
      bundlesize: [
        {
          path: "./dist/axios.min.js",
          threshold: "5kB"
        }
      ]
    };
  }
});

// ../../node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "../../node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    var pkg = require_package();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    var currentVerArr = pkg.version.split(".");
    function isOlderVersion(version, thanVersion) {
      var pkgVersionArr = thanVersion ? thanVersion.split(".") : currentVerArr;
      var destVer = version.split(".");
      for (var i = 0; i < 3; i++) {
        if (pkgVersionArr[i] > destVer[i]) {
          return true;
        } else if (pkgVersionArr[i] < destVer[i]) {
          return false;
        }
      }
      return false;
    }
    validators.transitional = function transitional(validator, version, message) {
      var isDeprecated = version && isOlderVersion(version);
      function formatMessage(opt, desc) {
        return "[Axios v" + pkg.version + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed in " + version));
        }
        if (isDeprecated && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module.exports = {
      isOlderVersion,
      assertOptions,
      validators
    };
  }
});

// ../../node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "../../node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
          forcedJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
          clarifyTimeoutError: validators.transitional(validators.boolean, "1.0.0")
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  }
});

// ../../node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "../../node_modules/axios/lib/cancel/Cancel.js"(exports, module) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  }
});

// ../../node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "../../node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// ../../node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "../../node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// ../../node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "../../node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    module.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// ../../node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "../../node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios.defaults, instanceConfig));
    };
    axios.Cancel = require_Cancel();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module.exports = axios;
    module.exports.default = axios;
  }
});

// ../../node_modules/axios/index.js
var require_axios2 = __commonJS({
  "../../node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// ../../node_modules/@ory/client/dist/base.js
var require_base = __commonJS({
  "../../node_modules/@ory/client/dist/base.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
    var axios_1 = require_axios2();
    exports.BASE_PATH = "https://playground.projects.oryapis.com".replace(/\/+$/, "");
    exports.COLLECTION_FORMATS = {
      csv: ",",
      ssv: " ",
      tsv: "	",
      pipes: "|"
    };
    var BaseAPI = class {
      constructor(configuration, basePath = exports.BASE_PATH, axios = axios_1.default) {
        this.basePath = basePath;
        this.axios = axios;
        if (configuration) {
          this.configuration = configuration;
          this.basePath = configuration.basePath || this.basePath;
        }
      }
    };
    exports.BaseAPI = BaseAPI;
    var RequiredError = class extends Error {
      constructor(field, msg) {
        super(msg);
        this.field = field;
        this.name = "RequiredError";
      }
    };
    exports.RequiredError = RequiredError;
  }
});

// ../../node_modules/@ory/client/dist/common.js
var require_common = __commonJS({
  "../../node_modules/@ory/client/dist/common.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createRequestFunction = exports.toPathString = exports.serializeDataIfNeeded = exports.setSearchParams = exports.setOAuthToObject = exports.setBearerAuthToObject = exports.setBasicAuthToObject = exports.setApiKeyToObject = exports.assertParamExists = exports.DUMMY_BASE_URL = void 0;
    var base_1 = require_base();
    exports.DUMMY_BASE_URL = "https://example.com";
    exports.assertParamExists = function(functionName, paramName, paramValue) {
      if (paramValue === null || paramValue === void 0) {
        throw new base_1.RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
      }
    };
    exports.setApiKeyToObject = function(object, keyParamName, configuration) {
      return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.apiKey) {
          const localVarApiKeyValue = typeof configuration.apiKey === "function" ? yield configuration.apiKey(keyParamName) : yield configuration.apiKey;
          object[keyParamName] = localVarApiKeyValue;
        }
      });
    };
    exports.setBasicAuthToObject = function(object, configuration) {
      if (configuration && (configuration.username || configuration.password)) {
        object["auth"] = { username: configuration.username, password: configuration.password };
      }
    };
    exports.setBearerAuthToObject = function(object, configuration) {
      return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
          const accessToken = typeof configuration.accessToken === "function" ? yield configuration.accessToken() : yield configuration.accessToken;
          object["Authorization"] = "Bearer " + accessToken;
        }
      });
    };
    exports.setOAuthToObject = function(object, name, scopes, configuration) {
      return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
          const localVarAccessTokenValue = typeof configuration.accessToken === "function" ? yield configuration.accessToken(name, scopes) : yield configuration.accessToken;
          object["Authorization"] = "Bearer " + localVarAccessTokenValue;
        }
      });
    };
    exports.setSearchParams = function(url, ...objects) {
      const searchParams = new URLSearchParams(url.search);
      for (const object of objects) {
        for (const key in object) {
          if (Array.isArray(object[key])) {
            searchParams.delete(key);
            for (const item of object[key]) {
              searchParams.append(key, item);
            }
          } else {
            searchParams.set(key, object[key]);
          }
        }
      }
      url.search = searchParams.toString();
    };
    exports.serializeDataIfNeeded = function(value, requestOptions, configuration) {
      const nonString = typeof value !== "string";
      const needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
      return needsSerialization ? JSON.stringify(value !== void 0 ? value : {}) : value || "";
    };
    exports.toPathString = function(url) {
      return url.pathname + url.search + url.hash;
    };
    exports.createRequestFunction = function(axiosArgs, globalAxios, BASE_PATH, configuration) {
      return (axios = globalAxios, basePath = BASE_PATH) => {
        const axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), { url: ((configuration === null || configuration === void 0 ? void 0 : configuration.basePath) || basePath) + axiosArgs.url });
        return axios.request(axiosRequestArgs);
      };
    };
  }
});

// ../../node_modules/@ory/client/dist/api.js
var require_api = __commonJS({
  "../../node_modules/@ory/client/dist/api.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WellknownApi = exports.WellknownApiFactory = exports.WellknownApiFp = exports.WellknownApiAxiosParamCreator = exports.RelationshipApi = exports.RelationshipApiFactory = exports.RelationshipApiFp = exports.RelationshipApiAxiosParamCreator = exports.ProjectApi = exports.ProjectApiFactory = exports.ProjectApiFp = exports.ProjectApiAxiosParamCreator = exports.PermissionApi = exports.PermissionApiFactory = exports.PermissionApiFp = exports.PermissionApiAxiosParamCreator = exports.OidcApi = exports.OidcApiFactory = exports.OidcApiFp = exports.OidcApiAxiosParamCreator = exports.OAuth2Api = exports.OAuth2ApiFactory = exports.OAuth2ApiFp = exports.OAuth2ApiAxiosParamCreator = exports.MetadataApi = exports.MetadataApiFactory = exports.MetadataApiFp = exports.MetadataApiAxiosParamCreator = exports.JwkApi = exports.JwkApiFactory = exports.JwkApiFp = exports.JwkApiAxiosParamCreator = exports.IdentityApi = exports.IdentityApiFactory = exports.IdentityApiFp = exports.IdentityApiAxiosParamCreator = exports.FrontendApi = exports.FrontendApiFactory = exports.FrontendApiFp = exports.FrontendApiAxiosParamCreator = exports.CourierApi = exports.CourierApiFactory = exports.CourierApiFp = exports.CourierApiAxiosParamCreator = exports.VerificationFlowState = exports.UpdateVerificationFlowWithLinkMethodMethodEnum = exports.UpdateVerificationFlowWithCodeMethodMethodEnum = exports.UpdateSubscriptionBodyIntervalEnum = exports.UpdateRecoveryFlowWithLinkMethodMethodEnum = exports.UpdateRecoveryFlowWithCodeMethodMethodEnum = exports.UiTextTypeEnum = exports.UiNodeInputAttributesTypeEnum = exports.UiNodeInputAttributesAutocompleteEnum = exports.UiNodeTypeEnum = exports.UiNodeGroupEnum = exports.SubscriptionCurrentIntervalEnum = exports.SubscriptionCurrencyEnum = exports.SettingsFlowState = exports.SessionAuthenticationMethodMethodEnum = exports.RelationshipPatchActionEnum = exports.RecoveryFlowState = exports.QuotaUsageFeatureEnum = exports.ProjectMetadataStateEnum = exports.ProjectStateEnum = exports.NormalizedProjectRevisionThirdPartyProviderStateEnum = exports.NormalizedProjectRevisionKratosSelfserviceFlowsVerificationUseEnum = exports.NormalizedProjectRevisionKratosSelfserviceFlowsRecoveryUseEnum = exports.NormalizedProjectRevisionHydraStrategiesScopeEnum = exports.NormalizedProjectRevisionHydraStrategiesAccessTokenEnum = exports.NormalizedProjectStateEnum = exports.MessageDispatchStatusEnum = exports.MessageTemplateTypeEnum = exports.MemberInviteStatusEnum = exports.JsonPatchOpEnum = exports.InternalProvisionMockSubscriptionIntervalEnum = exports.InternalProvisionMockSubscriptionCurrencyEnum = exports.InternalIsOwnerForProjectBySlugBodyNamespaceEnum = exports.IdentityState = exports.IdentityPatchResponseActionEnum = exports.IdentityCredentialsType = exports.ExpandedPermissionTreeTypeEnum = exports.CustomDomainSslStatusEnum = exports.CreateSubscriptionBodyIntervalEnum = exports.CreateSubscriptionBodyCurrencyEnum = exports.CourierMessageType = exports.CourierMessageStatus = exports.ContinueWithVerificationUiActionEnum = exports.ContinueWithSetOrySessionTokenActionEnum = exports.AuthenticatorAssuranceLevel = void 0;
    var axios_1 = require_axios2();
    var common_1 = require_common();
    var base_1 = require_base();
    exports.AuthenticatorAssuranceLevel = {
      Aal0: "aal0",
      Aal1: "aal1",
      Aal2: "aal2",
      Aal3: "aal3"
    };
    exports.ContinueWithSetOrySessionTokenActionEnum = {
      SetOrySessionToken: "set_ory_session_token",
      ShowVerificationUi: "show_verification_ui"
    };
    exports.ContinueWithVerificationUiActionEnum = {
      SetOrySessionToken: "set_ory_session_token",
      ShowVerificationUi: "show_verification_ui"
    };
    exports.CourierMessageStatus = {
      Queued: "queued",
      Sent: "sent",
      Processing: "processing",
      Abandoned: "abandoned"
    };
    exports.CourierMessageType = {
      Email: "email",
      Phone: "phone"
    };
    exports.CreateSubscriptionBodyCurrencyEnum = {
      Usd: "usd",
      Eur: "eur"
    };
    exports.CreateSubscriptionBodyIntervalEnum = {
      Monthly: "monthly",
      Yearly: "yearly"
    };
    exports.CustomDomainSslStatusEnum = {
      Initializing: "initializing",
      PendingValidation: "pending_validation",
      Deleted: "deleted",
      PendingIssuance: "pending_issuance",
      PendingDeployment: "pending_deployment",
      PendingDeletion: "pending_deletion",
      PendingExpiration: "pending_expiration",
      Expired: "expired",
      Active: "active",
      InitializingTimedOut: "initializing_timed_out",
      ValidationTimedOut: "validation_timed_out",
      IssuanceTimedOut: "issuance_timed_out",
      DeploymentTimedOut: "deployment_timed_out",
      DeletionTimedOut: "deletion_timed_out",
      PendingCleanup: "pending_cleanup",
      StagingDeployment: "staging_deployment",
      StagingActive: "staging_active",
      Deactivating: "deactivating",
      Inactive: "inactive",
      BackupIssued: "backup_issued",
      HoldingDeployment: "holding_deployment",
      Empty: ""
    };
    exports.ExpandedPermissionTreeTypeEnum = {
      Union: "union",
      Exclusion: "exclusion",
      Intersection: "intersection",
      Leaf: "leaf",
      TupleToSubjectSet: "tuple_to_subject_set",
      ComputedSubjectSet: "computed_subject_set",
      Not: "not",
      Unspecified: "unspecified"
    };
    exports.IdentityCredentialsType = {
      Password: "password",
      Totp: "totp",
      Oidc: "oidc",
      Webauthn: "webauthn",
      LookupSecret: "lookup_secret"
    };
    exports.IdentityPatchResponseActionEnum = {
      Create: "create"
    };
    exports.IdentityState = {
      Active: "active",
      Inactive: "inactive"
    };
    exports.InternalIsOwnerForProjectBySlugBodyNamespaceEnum = {
      User: "User",
      ApiKey: " ApiKey"
    };
    exports.InternalProvisionMockSubscriptionCurrencyEnum = {
      Usd: "usd",
      Eur: "eur"
    };
    exports.InternalProvisionMockSubscriptionIntervalEnum = {
      Monthly: "monthly",
      Yearly: "yearly"
    };
    exports.JsonPatchOpEnum = {
      Add: "add",
      Remove: "remove",
      Replace: "replace",
      Move: "move",
      Copy: "copy",
      Test: "test"
    };
    exports.MemberInviteStatusEnum = {
      Pending: "pending",
      Accepted: "accepted",
      Declined: "declined",
      Expired: "expired",
      Cancelled: "cancelled",
      Removed: "removed"
    };
    exports.MessageTemplateTypeEnum = {
      RecoveryInvalid: "recovery_invalid",
      RecoveryValid: "recovery_valid",
      RecoveryCodeInvalid: "recovery_code_invalid",
      RecoveryCodeValid: "recovery_code_valid",
      VerificationInvalid: "verification_invalid",
      VerificationValid: "verification_valid",
      VerificationCodeInvalid: "verification_code_invalid",
      VerificationCodeValid: "verification_code_valid",
      Otp: "otp",
      Stub: "stub"
    };
    exports.MessageDispatchStatusEnum = {
      Failed: "failed",
      Success: "success"
    };
    exports.NormalizedProjectStateEnum = {
      Running: "running",
      Halted: "halted",
      Deleted: "deleted"
    };
    exports.NormalizedProjectRevisionHydraStrategiesAccessTokenEnum = {
      Opaque: "opaque",
      Jwt: "jwt"
    };
    exports.NormalizedProjectRevisionHydraStrategiesScopeEnum = {
      Exact: "exact",
      Wildcard: "wildcard"
    };
    exports.NormalizedProjectRevisionKratosSelfserviceFlowsRecoveryUseEnum = {
      Link: "link",
      Code: "code"
    };
    exports.NormalizedProjectRevisionKratosSelfserviceFlowsVerificationUseEnum = {
      Link: "link",
      Code: "code"
    };
    exports.NormalizedProjectRevisionThirdPartyProviderStateEnum = {
      Enabled: "enabled",
      Disabled: "disabled"
    };
    exports.ProjectStateEnum = {
      Running: "running",
      Halted: "halted",
      Deleted: "deleted"
    };
    exports.ProjectMetadataStateEnum = {
      Running: "running",
      Halted: "halted",
      Deleted: "deleted"
    };
    exports.QuotaUsageFeatureEnum = {
      RegionEu: "region_eu",
      RegionUs: "region_us",
      RegionApac: "region_apac",
      RegionGlobal: "region_global",
      ProductionProjects: "production_projects",
      DailyActiveUsers: "daily_active_users",
      CustomDomains: "custom_domains",
      Sla: "sla",
      CollaboratorSeats: "collaborator_seats",
      EdgeCache: "edge_cache",
      BrandingThemes: "branding_themes",
      ZendeskSupport: "zendesk_support",
      ProjectMetrics: "project_metrics",
      RateLimitTier: "rate_limit_tier",
      SessionRateLimitTier: "session_rate_limit_tier",
      IdentitiesListRateLimitTier: "identities_list_rate_limit_tier"
    };
    exports.RecoveryFlowState = {
      ChooseMethod: "choose_method",
      SentEmail: "sent_email",
      PassedChallenge: "passed_challenge"
    };
    exports.RelationshipPatchActionEnum = {
      Insert: "insert",
      Delete: "delete"
    };
    exports.SessionAuthenticationMethodMethodEnum = {
      LinkRecovery: "link_recovery",
      CodeRecovery: "code_recovery",
      Password: "password",
      Totp: "totp",
      Oidc: "oidc",
      Webauthn: "webauthn",
      LookupSecret: "lookup_secret",
      V06LegacySession: "v0.6_legacy_session"
    };
    exports.SettingsFlowState = {
      ShowForm: "show_form",
      Success: "success"
    };
    exports.SubscriptionCurrencyEnum = {
      Usd: "usd",
      Eur: "eur"
    };
    exports.SubscriptionCurrentIntervalEnum = {
      Monthly: "monthly",
      Yearly: "yearly"
    };
    exports.UiNodeGroupEnum = {
      Default: "default",
      Password: "password",
      Oidc: "oidc",
      Profile: "profile",
      Link: "link",
      Code: "code",
      Totp: "totp",
      LookupSecret: "lookup_secret",
      Webauthn: "webauthn"
    };
    exports.UiNodeTypeEnum = {
      Text: "text",
      Input: "input",
      Img: "img",
      A: "a",
      Script: "script"
    };
    exports.UiNodeInputAttributesAutocompleteEnum = {
      Email: "email",
      Tel: "tel",
      Url: "url",
      CurrentPassword: "current-password",
      NewPassword: "new-password",
      OneTimeCode: "one-time-code"
    };
    exports.UiNodeInputAttributesTypeEnum = {
      Text: "text",
      Password: "password",
      Number: "number",
      Checkbox: "checkbox",
      Hidden: "hidden",
      Email: "email",
      Tel: "tel",
      Submit: "submit",
      Button: "button",
      DatetimeLocal: "datetime-local",
      Date: "date",
      Url: "url"
    };
    exports.UiTextTypeEnum = {
      Info: "info",
      Error: "error",
      Success: "success"
    };
    exports.UpdateRecoveryFlowWithCodeMethodMethodEnum = {
      Link: "link",
      Code: "code"
    };
    exports.UpdateRecoveryFlowWithLinkMethodMethodEnum = {
      Link: "link",
      Code: "code"
    };
    exports.UpdateSubscriptionBodyIntervalEnum = {
      Monthly: "monthly",
      Yearly: "yearly"
    };
    exports.UpdateVerificationFlowWithCodeMethodMethodEnum = {
      Link: "link",
      Code: "code"
    };
    exports.UpdateVerificationFlowWithLinkMethodMethodEnum = {
      Link: "link",
      Code: "code"
    };
    exports.VerificationFlowState = {
      ChooseMethod: "choose_method",
      SentEmail: "sent_email",
      PassedChallenge: "passed_challenge"
    };
    exports.CourierApiAxiosParamCreator = function(configuration) {
      return {
        getCourierMessage: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getCourierMessage", "id", id);
          const localVarPath = `/admin/courier/messages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listCourierMessages: (pageSize, pageToken, status, recipient, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/courier/messages`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (pageSize !== void 0) {
            localVarQueryParameter["page_size"] = pageSize;
          }
          if (pageToken !== void 0) {
            localVarQueryParameter["page_token"] = pageToken;
          }
          if (status !== void 0) {
            localVarQueryParameter["status"] = status;
          }
          if (recipient !== void 0) {
            localVarQueryParameter["recipient"] = recipient;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.CourierApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.CourierApiAxiosParamCreator(configuration);
      return {
        getCourierMessage(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getCourierMessage(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listCourierMessages(pageSize, pageToken, status, recipient, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listCourierMessages(pageSize, pageToken, status, recipient, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.CourierApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.CourierApiFp(configuration);
      return {
        getCourierMessage(id, options) {
          return localVarFp.getCourierMessage(id, options).then((request) => request(axios, basePath));
        },
        listCourierMessages(pageSize, pageToken, status, recipient, options) {
          return localVarFp.listCourierMessages(pageSize, pageToken, status, recipient, options).then((request) => request(axios, basePath));
        }
      };
    };
    var CourierApi = class extends base_1.BaseAPI {
      getCourierMessage(requestParameters, options) {
        return exports.CourierApiFp(this.configuration).getCourierMessage(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      listCourierMessages(requestParameters = {}, options) {
        return exports.CourierApiFp(this.configuration).listCourierMessages(requestParameters.pageSize, requestParameters.pageToken, requestParameters.status, requestParameters.recipient, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.CourierApi = CourierApi;
    exports.FrontendApiAxiosParamCreator = function(configuration) {
      return {
        createBrowserLoginFlow: (refresh, aal, returnTo, cookie, loginChallenge, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/login/browser`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (refresh !== void 0) {
            localVarQueryParameter["refresh"] = refresh;
          }
          if (aal !== void 0) {
            localVarQueryParameter["aal"] = aal;
          }
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          if (loginChallenge !== void 0) {
            localVarQueryParameter["login_challenge"] = loginChallenge;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createBrowserLogoutFlow: (cookie, returnTo, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/logout/browser`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createBrowserRecoveryFlow: (returnTo, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/recovery/browser`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createBrowserRegistrationFlow: (returnTo, loginChallenge, afterVerificationReturnTo, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/registration/browser`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          if (loginChallenge !== void 0) {
            localVarQueryParameter["login_challenge"] = loginChallenge;
          }
          if (afterVerificationReturnTo !== void 0) {
            localVarQueryParameter["after_verification_return_to"] = afterVerificationReturnTo;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createBrowserSettingsFlow: (returnTo, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/settings/browser`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createBrowserVerificationFlow: (returnTo, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/verification/browser`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createNativeLoginFlow: (refresh, aal, xSessionToken, returnSessionTokenExchangeCode, returnTo, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/login/api`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (refresh !== void 0) {
            localVarQueryParameter["refresh"] = refresh;
          }
          if (aal !== void 0) {
            localVarQueryParameter["aal"] = aal;
          }
          if (returnSessionTokenExchangeCode !== void 0) {
            localVarQueryParameter["return_session_token_exchange_code"] = returnSessionTokenExchangeCode;
          }
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createNativeRecoveryFlow: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/recovery/api`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createNativeRegistrationFlow: (returnSessionTokenExchangeCode, returnTo, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/registration/api`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (returnSessionTokenExchangeCode !== void 0) {
            localVarQueryParameter["return_session_token_exchange_code"] = returnSessionTokenExchangeCode;
          }
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createNativeSettingsFlow: (xSessionToken, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/settings/api`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createNativeVerificationFlow: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/verification/api`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        disableMyOtherSessions: (xSessionToken, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/sessions`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        disableMySession: (id, xSessionToken, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("disableMySession", "id", id);
          const localVarPath = `/sessions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        exchangeSessionToken: (initCode, returnToCode, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("exchangeSessionToken", "initCode", initCode);
          common_1.assertParamExists("exchangeSessionToken", "returnToCode", returnToCode);
          const localVarPath = `/sessions/token-exchange`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (initCode !== void 0) {
            localVarQueryParameter["init_code"] = initCode;
          }
          if (returnToCode !== void 0) {
            localVarQueryParameter["return_to_code"] = returnToCode;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getFlowError: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getFlowError", "id", id);
          const localVarPath = `/self-service/errors`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (id !== void 0) {
            localVarQueryParameter["id"] = id;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getLoginFlow: (id, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getLoginFlow", "id", id);
          const localVarPath = `/self-service/login/flows`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (id !== void 0) {
            localVarQueryParameter["id"] = id;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getRecoveryFlow: (id, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getRecoveryFlow", "id", id);
          const localVarPath = `/self-service/recovery/flows`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (id !== void 0) {
            localVarQueryParameter["id"] = id;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getRegistrationFlow: (id, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getRegistrationFlow", "id", id);
          const localVarPath = `/self-service/registration/flows`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (id !== void 0) {
            localVarQueryParameter["id"] = id;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getSettingsFlow: (id, xSessionToken, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getSettingsFlow", "id", id);
          const localVarPath = `/self-service/settings/flows`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (id !== void 0) {
            localVarQueryParameter["id"] = id;
          }
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getVerificationFlow: (id, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getVerificationFlow", "id", id);
          const localVarPath = `/self-service/verification/flows`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (id !== void 0) {
            localVarQueryParameter["id"] = id;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getWebAuthnJavaScript: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/.well-known/ory/webauthn.js`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listMySessions: (perPage, page, xSessionToken, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/sessions`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (perPage !== void 0) {
            localVarQueryParameter["per_page"] = perPage;
          }
          if (page !== void 0) {
            localVarQueryParameter["page"] = page;
          }
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        performNativeLogout: (performNativeLogoutBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("performNativeLogout", "performNativeLogoutBody", performNativeLogoutBody);
          const localVarPath = `/self-service/logout/api`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(performNativeLogoutBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        toSession: (xSessionToken, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/sessions/whoami`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        updateLoginFlow: (flow, updateLoginFlowBody, xSessionToken, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("updateLoginFlow", "flow", flow);
          common_1.assertParamExists("updateLoginFlow", "updateLoginFlowBody", updateLoginFlowBody);
          const localVarPath = `/self-service/login`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (flow !== void 0) {
            localVarQueryParameter["flow"] = flow;
          }
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(updateLoginFlowBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        updateLogoutFlow: (token, returnTo, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/self-service/logout`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (token !== void 0) {
            localVarQueryParameter["token"] = token;
          }
          if (returnTo !== void 0) {
            localVarQueryParameter["return_to"] = returnTo;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        updateRecoveryFlow: (flow, updateRecoveryFlowBody, token, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("updateRecoveryFlow", "flow", flow);
          common_1.assertParamExists("updateRecoveryFlow", "updateRecoveryFlowBody", updateRecoveryFlowBody);
          const localVarPath = `/self-service/recovery`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (flow !== void 0) {
            localVarQueryParameter["flow"] = flow;
          }
          if (token !== void 0) {
            localVarQueryParameter["token"] = token;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(updateRecoveryFlowBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        updateRegistrationFlow: (flow, updateRegistrationFlowBody, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("updateRegistrationFlow", "flow", flow);
          common_1.assertParamExists("updateRegistrationFlow", "updateRegistrationFlowBody", updateRegistrationFlowBody);
          const localVarPath = `/self-service/registration`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (flow !== void 0) {
            localVarQueryParameter["flow"] = flow;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(updateRegistrationFlowBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        updateSettingsFlow: (flow, updateSettingsFlowBody, xSessionToken, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("updateSettingsFlow", "flow", flow);
          common_1.assertParamExists("updateSettingsFlow", "updateSettingsFlowBody", updateSettingsFlowBody);
          const localVarPath = `/self-service/settings`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (flow !== void 0) {
            localVarQueryParameter["flow"] = flow;
          }
          if (xSessionToken !== void 0 && xSessionToken !== null) {
            localVarHeaderParameter["X-Session-Token"] = String(xSessionToken);
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(updateSettingsFlowBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        updateVerificationFlow: (flow, updateVerificationFlowBody, token, cookie, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("updateVerificationFlow", "flow", flow);
          common_1.assertParamExists("updateVerificationFlow", "updateVerificationFlowBody", updateVerificationFlowBody);
          const localVarPath = `/self-service/verification`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (flow !== void 0) {
            localVarQueryParameter["flow"] = flow;
          }
          if (token !== void 0) {
            localVarQueryParameter["token"] = token;
          }
          if (cookie !== void 0 && cookie !== null) {
            localVarHeaderParameter["Cookie"] = String(cookie);
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(updateVerificationFlowBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.FrontendApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.FrontendApiAxiosParamCreator(configuration);
      return {
        createBrowserLoginFlow(refresh, aal, returnTo, cookie, loginChallenge, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createBrowserLoginFlow(refresh, aal, returnTo, cookie, loginChallenge, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createBrowserLogoutFlow(cookie, returnTo, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createBrowserLogoutFlow(cookie, returnTo, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createBrowserRecoveryFlow(returnTo, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createBrowserRecoveryFlow(returnTo, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createBrowserRegistrationFlow(returnTo, loginChallenge, afterVerificationReturnTo, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createBrowserRegistrationFlow(returnTo, loginChallenge, afterVerificationReturnTo, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createBrowserSettingsFlow(returnTo, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createBrowserSettingsFlow(returnTo, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createBrowserVerificationFlow(returnTo, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createBrowserVerificationFlow(returnTo, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createNativeLoginFlow(refresh, aal, xSessionToken, returnSessionTokenExchangeCode, returnTo, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createNativeLoginFlow(refresh, aal, xSessionToken, returnSessionTokenExchangeCode, returnTo, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createNativeRecoveryFlow(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createNativeRecoveryFlow(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createNativeRegistrationFlow(returnSessionTokenExchangeCode, returnTo, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createNativeRegistrationFlow(returnSessionTokenExchangeCode, returnTo, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createNativeSettingsFlow(xSessionToken, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createNativeSettingsFlow(xSessionToken, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createNativeVerificationFlow(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createNativeVerificationFlow(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        disableMyOtherSessions(xSessionToken, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.disableMyOtherSessions(xSessionToken, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        disableMySession(id, xSessionToken, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.disableMySession(id, xSessionToken, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        exchangeSessionToken(initCode, returnToCode, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.exchangeSessionToken(initCode, returnToCode, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getFlowError(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getFlowError(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getLoginFlow(id, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getLoginFlow(id, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getRecoveryFlow(id, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getRecoveryFlow(id, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getRegistrationFlow(id, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getRegistrationFlow(id, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getSettingsFlow(id, xSessionToken, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getSettingsFlow(id, xSessionToken, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getVerificationFlow(id, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getVerificationFlow(id, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getWebAuthnJavaScript(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getWebAuthnJavaScript(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listMySessions(perPage, page, xSessionToken, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listMySessions(perPage, page, xSessionToken, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        performNativeLogout(performNativeLogoutBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.performNativeLogout(performNativeLogoutBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        toSession(xSessionToken, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.toSession(xSessionToken, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        updateLoginFlow(flow, updateLoginFlowBody, xSessionToken, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.updateLoginFlow(flow, updateLoginFlowBody, xSessionToken, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        updateLogoutFlow(token, returnTo, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.updateLogoutFlow(token, returnTo, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        updateRecoveryFlow(flow, updateRecoveryFlowBody, token, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.updateRecoveryFlow(flow, updateRecoveryFlowBody, token, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        updateRegistrationFlow(flow, updateRegistrationFlowBody, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.updateRegistrationFlow(flow, updateRegistrationFlowBody, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        updateSettingsFlow(flow, updateSettingsFlowBody, xSessionToken, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.updateSettingsFlow(flow, updateSettingsFlowBody, xSessionToken, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        updateVerificationFlow(flow, updateVerificationFlowBody, token, cookie, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.updateVerificationFlow(flow, updateVerificationFlowBody, token, cookie, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.FrontendApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.FrontendApiFp(configuration);
      return {
        createBrowserLoginFlow(refresh, aal, returnTo, cookie, loginChallenge, options) {
          return localVarFp.createBrowserLoginFlow(refresh, aal, returnTo, cookie, loginChallenge, options).then((request) => request(axios, basePath));
        },
        createBrowserLogoutFlow(cookie, returnTo, options) {
          return localVarFp.createBrowserLogoutFlow(cookie, returnTo, options).then((request) => request(axios, basePath));
        },
        createBrowserRecoveryFlow(returnTo, options) {
          return localVarFp.createBrowserRecoveryFlow(returnTo, options).then((request) => request(axios, basePath));
        },
        createBrowserRegistrationFlow(returnTo, loginChallenge, afterVerificationReturnTo, options) {
          return localVarFp.createBrowserRegistrationFlow(returnTo, loginChallenge, afterVerificationReturnTo, options).then((request) => request(axios, basePath));
        },
        createBrowserSettingsFlow(returnTo, cookie, options) {
          return localVarFp.createBrowserSettingsFlow(returnTo, cookie, options).then((request) => request(axios, basePath));
        },
        createBrowserVerificationFlow(returnTo, options) {
          return localVarFp.createBrowserVerificationFlow(returnTo, options).then((request) => request(axios, basePath));
        },
        createNativeLoginFlow(refresh, aal, xSessionToken, returnSessionTokenExchangeCode, returnTo, options) {
          return localVarFp.createNativeLoginFlow(refresh, aal, xSessionToken, returnSessionTokenExchangeCode, returnTo, options).then((request) => request(axios, basePath));
        },
        createNativeRecoveryFlow(options) {
          return localVarFp.createNativeRecoveryFlow(options).then((request) => request(axios, basePath));
        },
        createNativeRegistrationFlow(returnSessionTokenExchangeCode, returnTo, options) {
          return localVarFp.createNativeRegistrationFlow(returnSessionTokenExchangeCode, returnTo, options).then((request) => request(axios, basePath));
        },
        createNativeSettingsFlow(xSessionToken, options) {
          return localVarFp.createNativeSettingsFlow(xSessionToken, options).then((request) => request(axios, basePath));
        },
        createNativeVerificationFlow(options) {
          return localVarFp.createNativeVerificationFlow(options).then((request) => request(axios, basePath));
        },
        disableMyOtherSessions(xSessionToken, cookie, options) {
          return localVarFp.disableMyOtherSessions(xSessionToken, cookie, options).then((request) => request(axios, basePath));
        },
        disableMySession(id, xSessionToken, cookie, options) {
          return localVarFp.disableMySession(id, xSessionToken, cookie, options).then((request) => request(axios, basePath));
        },
        exchangeSessionToken(initCode, returnToCode, options) {
          return localVarFp.exchangeSessionToken(initCode, returnToCode, options).then((request) => request(axios, basePath));
        },
        getFlowError(id, options) {
          return localVarFp.getFlowError(id, options).then((request) => request(axios, basePath));
        },
        getLoginFlow(id, cookie, options) {
          return localVarFp.getLoginFlow(id, cookie, options).then((request) => request(axios, basePath));
        },
        getRecoveryFlow(id, cookie, options) {
          return localVarFp.getRecoveryFlow(id, cookie, options).then((request) => request(axios, basePath));
        },
        getRegistrationFlow(id, cookie, options) {
          return localVarFp.getRegistrationFlow(id, cookie, options).then((request) => request(axios, basePath));
        },
        getSettingsFlow(id, xSessionToken, cookie, options) {
          return localVarFp.getSettingsFlow(id, xSessionToken, cookie, options).then((request) => request(axios, basePath));
        },
        getVerificationFlow(id, cookie, options) {
          return localVarFp.getVerificationFlow(id, cookie, options).then((request) => request(axios, basePath));
        },
        getWebAuthnJavaScript(options) {
          return localVarFp.getWebAuthnJavaScript(options).then((request) => request(axios, basePath));
        },
        listMySessions(perPage, page, xSessionToken, cookie, options) {
          return localVarFp.listMySessions(perPage, page, xSessionToken, cookie, options).then((request) => request(axios, basePath));
        },
        performNativeLogout(performNativeLogoutBody, options) {
          return localVarFp.performNativeLogout(performNativeLogoutBody, options).then((request) => request(axios, basePath));
        },
        toSession(xSessionToken, cookie, options) {
          return localVarFp.toSession(xSessionToken, cookie, options).then((request) => request(axios, basePath));
        },
        updateLoginFlow(flow, updateLoginFlowBody, xSessionToken, cookie, options) {
          return localVarFp.updateLoginFlow(flow, updateLoginFlowBody, xSessionToken, cookie, options).then((request) => request(axios, basePath));
        },
        updateLogoutFlow(token, returnTo, cookie, options) {
          return localVarFp.updateLogoutFlow(token, returnTo, cookie, options).then((request) => request(axios, basePath));
        },
        updateRecoveryFlow(flow, updateRecoveryFlowBody, token, cookie, options) {
          return localVarFp.updateRecoveryFlow(flow, updateRecoveryFlowBody, token, cookie, options).then((request) => request(axios, basePath));
        },
        updateRegistrationFlow(flow, updateRegistrationFlowBody, cookie, options) {
          return localVarFp.updateRegistrationFlow(flow, updateRegistrationFlowBody, cookie, options).then((request) => request(axios, basePath));
        },
        updateSettingsFlow(flow, updateSettingsFlowBody, xSessionToken, cookie, options) {
          return localVarFp.updateSettingsFlow(flow, updateSettingsFlowBody, xSessionToken, cookie, options).then((request) => request(axios, basePath));
        },
        updateVerificationFlow(flow, updateVerificationFlowBody, token, cookie, options) {
          return localVarFp.updateVerificationFlow(flow, updateVerificationFlowBody, token, cookie, options).then((request) => request(axios, basePath));
        }
      };
    };
    var FrontendApi2 = class extends base_1.BaseAPI {
      createBrowserLoginFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createBrowserLoginFlow(requestParameters.refresh, requestParameters.aal, requestParameters.returnTo, requestParameters.cookie, requestParameters.loginChallenge, options).then((request) => request(this.axios, this.basePath));
      }
      createBrowserLogoutFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createBrowserLogoutFlow(requestParameters.cookie, requestParameters.returnTo, options).then((request) => request(this.axios, this.basePath));
      }
      createBrowserRecoveryFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createBrowserRecoveryFlow(requestParameters.returnTo, options).then((request) => request(this.axios, this.basePath));
      }
      createBrowserRegistrationFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createBrowserRegistrationFlow(requestParameters.returnTo, requestParameters.loginChallenge, requestParameters.afterVerificationReturnTo, options).then((request) => request(this.axios, this.basePath));
      }
      createBrowserSettingsFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createBrowserSettingsFlow(requestParameters.returnTo, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      createBrowserVerificationFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createBrowserVerificationFlow(requestParameters.returnTo, options).then((request) => request(this.axios, this.basePath));
      }
      createNativeLoginFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createNativeLoginFlow(requestParameters.refresh, requestParameters.aal, requestParameters.xSessionToken, requestParameters.returnSessionTokenExchangeCode, requestParameters.returnTo, options).then((request) => request(this.axios, this.basePath));
      }
      createNativeRecoveryFlow(options) {
        return exports.FrontendApiFp(this.configuration).createNativeRecoveryFlow(options).then((request) => request(this.axios, this.basePath));
      }
      createNativeRegistrationFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createNativeRegistrationFlow(requestParameters.returnSessionTokenExchangeCode, requestParameters.returnTo, options).then((request) => request(this.axios, this.basePath));
      }
      createNativeSettingsFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).createNativeSettingsFlow(requestParameters.xSessionToken, options).then((request) => request(this.axios, this.basePath));
      }
      createNativeVerificationFlow(options) {
        return exports.FrontendApiFp(this.configuration).createNativeVerificationFlow(options).then((request) => request(this.axios, this.basePath));
      }
      disableMyOtherSessions(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).disableMyOtherSessions(requestParameters.xSessionToken, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      disableMySession(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).disableMySession(requestParameters.id, requestParameters.xSessionToken, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      exchangeSessionToken(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).exchangeSessionToken(requestParameters.initCode, requestParameters.returnToCode, options).then((request) => request(this.axios, this.basePath));
      }
      getFlowError(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).getFlowError(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      getLoginFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).getLoginFlow(requestParameters.id, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      getRecoveryFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).getRecoveryFlow(requestParameters.id, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      getRegistrationFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).getRegistrationFlow(requestParameters.id, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      getSettingsFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).getSettingsFlow(requestParameters.id, requestParameters.xSessionToken, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      getVerificationFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).getVerificationFlow(requestParameters.id, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      getWebAuthnJavaScript(options) {
        return exports.FrontendApiFp(this.configuration).getWebAuthnJavaScript(options).then((request) => request(this.axios, this.basePath));
      }
      listMySessions(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).listMySessions(requestParameters.perPage, requestParameters.page, requestParameters.xSessionToken, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      performNativeLogout(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).performNativeLogout(requestParameters.performNativeLogoutBody, options).then((request) => request(this.axios, this.basePath));
      }
      toSession(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).toSession(requestParameters.xSessionToken, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      updateLoginFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).updateLoginFlow(requestParameters.flow, requestParameters.updateLoginFlowBody, requestParameters.xSessionToken, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      updateLogoutFlow(requestParameters = {}, options) {
        return exports.FrontendApiFp(this.configuration).updateLogoutFlow(requestParameters.token, requestParameters.returnTo, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      updateRecoveryFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).updateRecoveryFlow(requestParameters.flow, requestParameters.updateRecoveryFlowBody, requestParameters.token, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      updateRegistrationFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).updateRegistrationFlow(requestParameters.flow, requestParameters.updateRegistrationFlowBody, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      updateSettingsFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).updateSettingsFlow(requestParameters.flow, requestParameters.updateSettingsFlowBody, requestParameters.xSessionToken, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
      updateVerificationFlow(requestParameters, options) {
        return exports.FrontendApiFp(this.configuration).updateVerificationFlow(requestParameters.flow, requestParameters.updateVerificationFlowBody, requestParameters.token, requestParameters.cookie, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.FrontendApi = FrontendApi2;
    exports.IdentityApiAxiosParamCreator = function(configuration) {
      return {
        batchPatchIdentities: (patchIdentitiesBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/identities`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PATCH" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(patchIdentitiesBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createIdentity: (createIdentityBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/identities`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createIdentityBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createRecoveryCodeForIdentity: (createRecoveryCodeForIdentityBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/recovery/code`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createRecoveryCodeForIdentityBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createRecoveryLinkForIdentity: (createRecoveryLinkForIdentityBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/recovery/link`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createRecoveryLinkForIdentityBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteIdentity: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteIdentity", "id", id);
          const localVarPath = `/admin/identities/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteIdentityCredentials: (id, type, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteIdentityCredentials", "id", id);
          common_1.assertParamExists("deleteIdentityCredentials", "type", type);
          const localVarPath = `/admin/identities/{id}/credentials/{type}`.replace(`{${"id"}}`, encodeURIComponent(String(id))).replace(`{${"type"}}`, encodeURIComponent(String(type)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteIdentitySessions: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteIdentitySessions", "id", id);
          const localVarPath = `/admin/identities/{id}/sessions`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        disableSession: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("disableSession", "id", id);
          const localVarPath = `/admin/sessions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        extendSession: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("extendSession", "id", id);
          const localVarPath = `/admin/sessions/{id}/extend`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PATCH" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getIdentity: (id, includeCredential, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getIdentity", "id", id);
          const localVarPath = `/admin/identities/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (includeCredential) {
            localVarQueryParameter["include_credential"] = includeCredential;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getIdentitySchema: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getIdentitySchema", "id", id);
          const localVarPath = `/schemas/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getSession: (id, expand, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getSession", "id", id);
          const localVarPath = `/admin/sessions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (expand) {
            localVarQueryParameter["expand"] = expand;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listIdentities: (perPage, page, credentialsIdentifier, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/identities`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (perPage !== void 0) {
            localVarQueryParameter["per_page"] = perPage;
          }
          if (page !== void 0) {
            localVarQueryParameter["page"] = page;
          }
          if (credentialsIdentifier !== void 0) {
            localVarQueryParameter["credentials_identifier"] = credentialsIdentifier;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listIdentitySchemas: (perPage, page, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/schemas`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (perPage !== void 0) {
            localVarQueryParameter["per_page"] = perPage;
          }
          if (page !== void 0) {
            localVarQueryParameter["page"] = page;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listIdentitySessions: (id, perPage, page, active, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("listIdentitySessions", "id", id);
          const localVarPath = `/admin/identities/{id}/sessions`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (perPage !== void 0) {
            localVarQueryParameter["per_page"] = perPage;
          }
          if (page !== void 0) {
            localVarQueryParameter["page"] = page;
          }
          if (active !== void 0) {
            localVarQueryParameter["active"] = active;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listSessions: (pageSize, pageToken, active, expand, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/sessions`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (pageSize !== void 0) {
            localVarQueryParameter["page_size"] = pageSize;
          }
          if (pageToken !== void 0) {
            localVarQueryParameter["page_token"] = pageToken;
          }
          if (active !== void 0) {
            localVarQueryParameter["active"] = active;
          }
          if (expand) {
            localVarQueryParameter["expand"] = expand;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        patchIdentity: (id, jsonPatch, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("patchIdentity", "id", id);
          const localVarPath = `/admin/identities/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PATCH" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(jsonPatch, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        updateIdentity: (id, updateIdentityBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("updateIdentity", "id", id);
          const localVarPath = `/admin/identities/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(updateIdentityBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.IdentityApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.IdentityApiAxiosParamCreator(configuration);
      return {
        batchPatchIdentities(patchIdentitiesBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.batchPatchIdentities(patchIdentitiesBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createIdentity(createIdentityBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createIdentity(createIdentityBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createRecoveryCodeForIdentity(createRecoveryCodeForIdentityBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createRecoveryCodeForIdentity(createRecoveryCodeForIdentityBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createRecoveryLinkForIdentity(createRecoveryLinkForIdentityBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createRecoveryLinkForIdentity(createRecoveryLinkForIdentityBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteIdentity(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteIdentity(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteIdentityCredentials(id, type, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteIdentityCredentials(id, type, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteIdentitySessions(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteIdentitySessions(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        disableSession(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.disableSession(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        extendSession(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.extendSession(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getIdentity(id, includeCredential, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getIdentity(id, includeCredential, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getIdentitySchema(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getIdentitySchema(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getSession(id, expand, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getSession(id, expand, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listIdentities(perPage, page, credentialsIdentifier, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listIdentities(perPage, page, credentialsIdentifier, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listIdentitySchemas(perPage, page, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listIdentitySchemas(perPage, page, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listIdentitySessions(id, perPage, page, active, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listIdentitySessions(id, perPage, page, active, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listSessions(pageSize, pageToken, active, expand, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listSessions(pageSize, pageToken, active, expand, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        patchIdentity(id, jsonPatch, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.patchIdentity(id, jsonPatch, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        updateIdentity(id, updateIdentityBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.updateIdentity(id, updateIdentityBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.IdentityApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.IdentityApiFp(configuration);
      return {
        batchPatchIdentities(patchIdentitiesBody, options) {
          return localVarFp.batchPatchIdentities(patchIdentitiesBody, options).then((request) => request(axios, basePath));
        },
        createIdentity(createIdentityBody, options) {
          return localVarFp.createIdentity(createIdentityBody, options).then((request) => request(axios, basePath));
        },
        createRecoveryCodeForIdentity(createRecoveryCodeForIdentityBody, options) {
          return localVarFp.createRecoveryCodeForIdentity(createRecoveryCodeForIdentityBody, options).then((request) => request(axios, basePath));
        },
        createRecoveryLinkForIdentity(createRecoveryLinkForIdentityBody, options) {
          return localVarFp.createRecoveryLinkForIdentity(createRecoveryLinkForIdentityBody, options).then((request) => request(axios, basePath));
        },
        deleteIdentity(id, options) {
          return localVarFp.deleteIdentity(id, options).then((request) => request(axios, basePath));
        },
        deleteIdentityCredentials(id, type, options) {
          return localVarFp.deleteIdentityCredentials(id, type, options).then((request) => request(axios, basePath));
        },
        deleteIdentitySessions(id, options) {
          return localVarFp.deleteIdentitySessions(id, options).then((request) => request(axios, basePath));
        },
        disableSession(id, options) {
          return localVarFp.disableSession(id, options).then((request) => request(axios, basePath));
        },
        extendSession(id, options) {
          return localVarFp.extendSession(id, options).then((request) => request(axios, basePath));
        },
        getIdentity(id, includeCredential, options) {
          return localVarFp.getIdentity(id, includeCredential, options).then((request) => request(axios, basePath));
        },
        getIdentitySchema(id, options) {
          return localVarFp.getIdentitySchema(id, options).then((request) => request(axios, basePath));
        },
        getSession(id, expand, options) {
          return localVarFp.getSession(id, expand, options).then((request) => request(axios, basePath));
        },
        listIdentities(perPage, page, credentialsIdentifier, options) {
          return localVarFp.listIdentities(perPage, page, credentialsIdentifier, options).then((request) => request(axios, basePath));
        },
        listIdentitySchemas(perPage, page, options) {
          return localVarFp.listIdentitySchemas(perPage, page, options).then((request) => request(axios, basePath));
        },
        listIdentitySessions(id, perPage, page, active, options) {
          return localVarFp.listIdentitySessions(id, perPage, page, active, options).then((request) => request(axios, basePath));
        },
        listSessions(pageSize, pageToken, active, expand, options) {
          return localVarFp.listSessions(pageSize, pageToken, active, expand, options).then((request) => request(axios, basePath));
        },
        patchIdentity(id, jsonPatch, options) {
          return localVarFp.patchIdentity(id, jsonPatch, options).then((request) => request(axios, basePath));
        },
        updateIdentity(id, updateIdentityBody, options) {
          return localVarFp.updateIdentity(id, updateIdentityBody, options).then((request) => request(axios, basePath));
        }
      };
    };
    var IdentityApi = class extends base_1.BaseAPI {
      batchPatchIdentities(requestParameters = {}, options) {
        return exports.IdentityApiFp(this.configuration).batchPatchIdentities(requestParameters.patchIdentitiesBody, options).then((request) => request(this.axios, this.basePath));
      }
      createIdentity(requestParameters = {}, options) {
        return exports.IdentityApiFp(this.configuration).createIdentity(requestParameters.createIdentityBody, options).then((request) => request(this.axios, this.basePath));
      }
      createRecoveryCodeForIdentity(requestParameters = {}, options) {
        return exports.IdentityApiFp(this.configuration).createRecoveryCodeForIdentity(requestParameters.createRecoveryCodeForIdentityBody, options).then((request) => request(this.axios, this.basePath));
      }
      createRecoveryLinkForIdentity(requestParameters = {}, options) {
        return exports.IdentityApiFp(this.configuration).createRecoveryLinkForIdentity(requestParameters.createRecoveryLinkForIdentityBody, options).then((request) => request(this.axios, this.basePath));
      }
      deleteIdentity(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).deleteIdentity(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      deleteIdentityCredentials(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).deleteIdentityCredentials(requestParameters.id, requestParameters.type, options).then((request) => request(this.axios, this.basePath));
      }
      deleteIdentitySessions(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).deleteIdentitySessions(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      disableSession(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).disableSession(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      extendSession(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).extendSession(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      getIdentity(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).getIdentity(requestParameters.id, requestParameters.includeCredential, options).then((request) => request(this.axios, this.basePath));
      }
      getIdentitySchema(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).getIdentitySchema(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      getSession(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).getSession(requestParameters.id, requestParameters.expand, options).then((request) => request(this.axios, this.basePath));
      }
      listIdentities(requestParameters = {}, options) {
        return exports.IdentityApiFp(this.configuration).listIdentities(requestParameters.perPage, requestParameters.page, requestParameters.credentialsIdentifier, options).then((request) => request(this.axios, this.basePath));
      }
      listIdentitySchemas(requestParameters = {}, options) {
        return exports.IdentityApiFp(this.configuration).listIdentitySchemas(requestParameters.perPage, requestParameters.page, options).then((request) => request(this.axios, this.basePath));
      }
      listIdentitySessions(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).listIdentitySessions(requestParameters.id, requestParameters.perPage, requestParameters.page, requestParameters.active, options).then((request) => request(this.axios, this.basePath));
      }
      listSessions(requestParameters = {}, options) {
        return exports.IdentityApiFp(this.configuration).listSessions(requestParameters.pageSize, requestParameters.pageToken, requestParameters.active, requestParameters.expand, options).then((request) => request(this.axios, this.basePath));
      }
      patchIdentity(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).patchIdentity(requestParameters.id, requestParameters.jsonPatch, options).then((request) => request(this.axios, this.basePath));
      }
      updateIdentity(requestParameters, options) {
        return exports.IdentityApiFp(this.configuration).updateIdentity(requestParameters.id, requestParameters.updateIdentityBody, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.IdentityApi = IdentityApi;
    exports.JwkApiAxiosParamCreator = function(configuration) {
      return {
        createJsonWebKeySet: (set, createJsonWebKeySet, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createJsonWebKeySet", "set", set);
          common_1.assertParamExists("createJsonWebKeySet", "createJsonWebKeySet", createJsonWebKeySet);
          const localVarPath = `/admin/keys/{set}`.replace(`{${"set"}}`, encodeURIComponent(String(set)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createJsonWebKeySet, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteJsonWebKey: (set, kid, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteJsonWebKey", "set", set);
          common_1.assertParamExists("deleteJsonWebKey", "kid", kid);
          const localVarPath = `/admin/keys/{set}/{kid}`.replace(`{${"set"}}`, encodeURIComponent(String(set))).replace(`{${"kid"}}`, encodeURIComponent(String(kid)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteJsonWebKeySet: (set, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteJsonWebKeySet", "set", set);
          const localVarPath = `/admin/keys/{set}`.replace(`{${"set"}}`, encodeURIComponent(String(set)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getJsonWebKey: (set, kid, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getJsonWebKey", "set", set);
          common_1.assertParamExists("getJsonWebKey", "kid", kid);
          const localVarPath = `/admin/keys/{set}/{kid}`.replace(`{${"set"}}`, encodeURIComponent(String(set))).replace(`{${"kid"}}`, encodeURIComponent(String(kid)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getJsonWebKeySet: (set, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getJsonWebKeySet", "set", set);
          const localVarPath = `/admin/keys/{set}`.replace(`{${"set"}}`, encodeURIComponent(String(set)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        setJsonWebKey: (set, kid, jsonWebKey, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("setJsonWebKey", "set", set);
          common_1.assertParamExists("setJsonWebKey", "kid", kid);
          const localVarPath = `/admin/keys/{set}/{kid}`.replace(`{${"set"}}`, encodeURIComponent(String(set))).replace(`{${"kid"}}`, encodeURIComponent(String(kid)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(jsonWebKey, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        setJsonWebKeySet: (set, jsonWebKeySet, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("setJsonWebKeySet", "set", set);
          const localVarPath = `/admin/keys/{set}`.replace(`{${"set"}}`, encodeURIComponent(String(set)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(jsonWebKeySet, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.JwkApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.JwkApiAxiosParamCreator(configuration);
      return {
        createJsonWebKeySet(set, createJsonWebKeySet, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createJsonWebKeySet(set, createJsonWebKeySet, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteJsonWebKey(set, kid, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteJsonWebKey(set, kid, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteJsonWebKeySet(set, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteJsonWebKeySet(set, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getJsonWebKey(set, kid, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getJsonWebKey(set, kid, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getJsonWebKeySet(set, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getJsonWebKeySet(set, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        setJsonWebKey(set, kid, jsonWebKey, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.setJsonWebKey(set, kid, jsonWebKey, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        setJsonWebKeySet(set, jsonWebKeySet, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.setJsonWebKeySet(set, jsonWebKeySet, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.JwkApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.JwkApiFp(configuration);
      return {
        createJsonWebKeySet(set, createJsonWebKeySet, options) {
          return localVarFp.createJsonWebKeySet(set, createJsonWebKeySet, options).then((request) => request(axios, basePath));
        },
        deleteJsonWebKey(set, kid, options) {
          return localVarFp.deleteJsonWebKey(set, kid, options).then((request) => request(axios, basePath));
        },
        deleteJsonWebKeySet(set, options) {
          return localVarFp.deleteJsonWebKeySet(set, options).then((request) => request(axios, basePath));
        },
        getJsonWebKey(set, kid, options) {
          return localVarFp.getJsonWebKey(set, kid, options).then((request) => request(axios, basePath));
        },
        getJsonWebKeySet(set, options) {
          return localVarFp.getJsonWebKeySet(set, options).then((request) => request(axios, basePath));
        },
        setJsonWebKey(set, kid, jsonWebKey, options) {
          return localVarFp.setJsonWebKey(set, kid, jsonWebKey, options).then((request) => request(axios, basePath));
        },
        setJsonWebKeySet(set, jsonWebKeySet, options) {
          return localVarFp.setJsonWebKeySet(set, jsonWebKeySet, options).then((request) => request(axios, basePath));
        }
      };
    };
    var JwkApi = class extends base_1.BaseAPI {
      createJsonWebKeySet(requestParameters, options) {
        return exports.JwkApiFp(this.configuration).createJsonWebKeySet(requestParameters.set, requestParameters.createJsonWebKeySet, options).then((request) => request(this.axios, this.basePath));
      }
      deleteJsonWebKey(requestParameters, options) {
        return exports.JwkApiFp(this.configuration).deleteJsonWebKey(requestParameters.set, requestParameters.kid, options).then((request) => request(this.axios, this.basePath));
      }
      deleteJsonWebKeySet(requestParameters, options) {
        return exports.JwkApiFp(this.configuration).deleteJsonWebKeySet(requestParameters.set, options).then((request) => request(this.axios, this.basePath));
      }
      getJsonWebKey(requestParameters, options) {
        return exports.JwkApiFp(this.configuration).getJsonWebKey(requestParameters.set, requestParameters.kid, options).then((request) => request(this.axios, this.basePath));
      }
      getJsonWebKeySet(requestParameters, options) {
        return exports.JwkApiFp(this.configuration).getJsonWebKeySet(requestParameters.set, options).then((request) => request(this.axios, this.basePath));
      }
      setJsonWebKey(requestParameters, options) {
        return exports.JwkApiFp(this.configuration).setJsonWebKey(requestParameters.set, requestParameters.kid, requestParameters.jsonWebKey, options).then((request) => request(this.axios, this.basePath));
      }
      setJsonWebKeySet(requestParameters, options) {
        return exports.JwkApiFp(this.configuration).setJsonWebKeySet(requestParameters.set, requestParameters.jsonWebKeySet, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.JwkApi = JwkApi;
    exports.MetadataApiAxiosParamCreator = function(configuration) {
      return {
        getVersion: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/version`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        isAlive: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/health/alive`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        isReady: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/health/ready`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.MetadataApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.MetadataApiAxiosParamCreator(configuration);
      return {
        getVersion(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getVersion(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        isAlive(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.isAlive(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        isReady(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.isReady(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.MetadataApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.MetadataApiFp(configuration);
      return {
        getVersion(options) {
          return localVarFp.getVersion(options).then((request) => request(axios, basePath));
        },
        isAlive(options) {
          return localVarFp.isAlive(options).then((request) => request(axios, basePath));
        },
        isReady(options) {
          return localVarFp.isReady(options).then((request) => request(axios, basePath));
        }
      };
    };
    var MetadataApi = class extends base_1.BaseAPI {
      getVersion(options) {
        return exports.MetadataApiFp(this.configuration).getVersion(options).then((request) => request(this.axios, this.basePath));
      }
      isAlive(options) {
        return exports.MetadataApiFp(this.configuration).isAlive(options).then((request) => request(this.axios, this.basePath));
      }
      isReady(options) {
        return exports.MetadataApiFp(this.configuration).isReady(options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.MetadataApi = MetadataApi;
    exports.OAuth2ApiAxiosParamCreator = function(configuration) {
      return {
        acceptOAuth2ConsentRequest: (consentChallenge, acceptOAuth2ConsentRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("acceptOAuth2ConsentRequest", "consentChallenge", consentChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/consent/accept`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (consentChallenge !== void 0) {
            localVarQueryParameter["consent_challenge"] = consentChallenge;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(acceptOAuth2ConsentRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        acceptOAuth2LoginRequest: (loginChallenge, acceptOAuth2LoginRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("acceptOAuth2LoginRequest", "loginChallenge", loginChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/login/accept`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (loginChallenge !== void 0) {
            localVarQueryParameter["login_challenge"] = loginChallenge;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(acceptOAuth2LoginRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        acceptOAuth2LogoutRequest: (logoutChallenge, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("acceptOAuth2LogoutRequest", "logoutChallenge", logoutChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/logout/accept`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (logoutChallenge !== void 0) {
            localVarQueryParameter["logout_challenge"] = logoutChallenge;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createOAuth2Client: (oAuth2Client, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createOAuth2Client", "oAuth2Client", oAuth2Client);
          const localVarPath = `/admin/clients`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(oAuth2Client, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteOAuth2Client: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteOAuth2Client", "id", id);
          const localVarPath = `/admin/clients/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteOAuth2Token: (clientId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteOAuth2Token", "clientId", clientId);
          const localVarPath = `/admin/oauth2/tokens`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (clientId !== void 0) {
            localVarQueryParameter["client_id"] = clientId;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteTrustedOAuth2JwtGrantIssuer: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteTrustedOAuth2JwtGrantIssuer", "id", id);
          const localVarPath = `/admin/trust/grants/jwt-bearer/issuers/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getOAuth2Client: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getOAuth2Client", "id", id);
          const localVarPath = `/admin/clients/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getOAuth2ConsentRequest: (consentChallenge, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getOAuth2ConsentRequest", "consentChallenge", consentChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/consent`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (consentChallenge !== void 0) {
            localVarQueryParameter["consent_challenge"] = consentChallenge;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getOAuth2LoginRequest: (loginChallenge, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getOAuth2LoginRequest", "loginChallenge", loginChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/login`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (loginChallenge !== void 0) {
            localVarQueryParameter["login_challenge"] = loginChallenge;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getOAuth2LogoutRequest: (logoutChallenge, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getOAuth2LogoutRequest", "logoutChallenge", logoutChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/logout`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (logoutChallenge !== void 0) {
            localVarQueryParameter["logout_challenge"] = logoutChallenge;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getTrustedOAuth2JwtGrantIssuer: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getTrustedOAuth2JwtGrantIssuer", "id", id);
          const localVarPath = `/admin/trust/grants/jwt-bearer/issuers/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        introspectOAuth2Token: (token, scope, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("introspectOAuth2Token", "token", token);
          const localVarPath = `/admin/oauth2/introspect`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new URLSearchParams();
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (scope !== void 0) {
            localVarFormParams.set("scope", scope);
          }
          if (token !== void 0) {
            localVarFormParams.set("token", token);
          }
          localVarHeaderParameter["Content-Type"] = "application/x-www-form-urlencoded";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams.toString();
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listOAuth2Clients: (pageSize, pageToken, clientName, owner, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/clients`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (pageSize !== void 0) {
            localVarQueryParameter["page_size"] = pageSize;
          }
          if (pageToken !== void 0) {
            localVarQueryParameter["page_token"] = pageToken;
          }
          if (clientName !== void 0) {
            localVarQueryParameter["client_name"] = clientName;
          }
          if (owner !== void 0) {
            localVarQueryParameter["owner"] = owner;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listOAuth2ConsentSessions: (subject, pageSize, pageToken, loginSessionId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("listOAuth2ConsentSessions", "subject", subject);
          const localVarPath = `/admin/oauth2/auth/sessions/consent`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (pageSize !== void 0) {
            localVarQueryParameter["page_size"] = pageSize;
          }
          if (pageToken !== void 0) {
            localVarQueryParameter["page_token"] = pageToken;
          }
          if (subject !== void 0) {
            localVarQueryParameter["subject"] = subject;
          }
          if (loginSessionId !== void 0) {
            localVarQueryParameter["login_session_id"] = loginSessionId;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listTrustedOAuth2JwtGrantIssuers: (maxItems, defaultItems, issuer, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/trust/grants/jwt-bearer/issuers`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (maxItems !== void 0) {
            localVarQueryParameter["MaxItems"] = maxItems;
          }
          if (defaultItems !== void 0) {
            localVarQueryParameter["DefaultItems"] = defaultItems;
          }
          if (issuer !== void 0) {
            localVarQueryParameter["issuer"] = issuer;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        oAuth2Authorize: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/oauth2/auth`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        oauth2TokenExchange: (grantType, clientId, code, redirectUri, refreshToken, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("oauth2TokenExchange", "grantType", grantType);
          const localVarPath = `/oauth2/token`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new URLSearchParams();
          common_1.setBasicAuthToObject(localVarRequestOptions, configuration);
          yield common_1.setOAuthToObject(localVarHeaderParameter, "oauth2", [], configuration);
          if (clientId !== void 0) {
            localVarFormParams.set("client_id", clientId);
          }
          if (code !== void 0) {
            localVarFormParams.set("code", code);
          }
          if (grantType !== void 0) {
            localVarFormParams.set("grant_type", grantType);
          }
          if (redirectUri !== void 0) {
            localVarFormParams.set("redirect_uri", redirectUri);
          }
          if (refreshToken !== void 0) {
            localVarFormParams.set("refresh_token", refreshToken);
          }
          localVarHeaderParameter["Content-Type"] = "application/x-www-form-urlencoded";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams.toString();
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        patchOAuth2Client: (id, jsonPatch, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("patchOAuth2Client", "id", id);
          common_1.assertParamExists("patchOAuth2Client", "jsonPatch", jsonPatch);
          const localVarPath = `/admin/clients/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PATCH" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(jsonPatch, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        rejectOAuth2ConsentRequest: (consentChallenge, rejectOAuth2Request, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("rejectOAuth2ConsentRequest", "consentChallenge", consentChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/consent/reject`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (consentChallenge !== void 0) {
            localVarQueryParameter["consent_challenge"] = consentChallenge;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(rejectOAuth2Request, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        rejectOAuth2LoginRequest: (loginChallenge, rejectOAuth2Request, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("rejectOAuth2LoginRequest", "loginChallenge", loginChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/login/reject`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (loginChallenge !== void 0) {
            localVarQueryParameter["login_challenge"] = loginChallenge;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(rejectOAuth2Request, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        rejectOAuth2LogoutRequest: (logoutChallenge, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("rejectOAuth2LogoutRequest", "logoutChallenge", logoutChallenge);
          const localVarPath = `/admin/oauth2/auth/requests/logout/reject`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (logoutChallenge !== void 0) {
            localVarQueryParameter["logout_challenge"] = logoutChallenge;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        revokeOAuth2ConsentSessions: (subject, client, all, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("revokeOAuth2ConsentSessions", "subject", subject);
          const localVarPath = `/admin/oauth2/auth/sessions/consent`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (subject !== void 0) {
            localVarQueryParameter["subject"] = subject;
          }
          if (client !== void 0) {
            localVarQueryParameter["client"] = client;
          }
          if (all !== void 0) {
            localVarQueryParameter["all"] = all;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        revokeOAuth2LoginSessions: (subject, sid, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/oauth2/auth/sessions/login`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (subject !== void 0) {
            localVarQueryParameter["subject"] = subject;
          }
          if (sid !== void 0) {
            localVarQueryParameter["sid"] = sid;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        revokeOAuth2Token: (token, clientId, clientSecret, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("revokeOAuth2Token", "token", token);
          const localVarPath = `/oauth2/revoke`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new URLSearchParams();
          common_1.setBasicAuthToObject(localVarRequestOptions, configuration);
          yield common_1.setOAuthToObject(localVarHeaderParameter, "oauth2", [], configuration);
          if (clientId !== void 0) {
            localVarFormParams.set("client_id", clientId);
          }
          if (clientSecret !== void 0) {
            localVarFormParams.set("client_secret", clientSecret);
          }
          if (token !== void 0) {
            localVarFormParams.set("token", token);
          }
          localVarHeaderParameter["Content-Type"] = "application/x-www-form-urlencoded";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams.toString();
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        setOAuth2Client: (id, oAuth2Client, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("setOAuth2Client", "id", id);
          common_1.assertParamExists("setOAuth2Client", "oAuth2Client", oAuth2Client);
          const localVarPath = `/admin/clients/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(oAuth2Client, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        setOAuth2ClientLifespans: (id, oAuth2ClientTokenLifespans, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("setOAuth2ClientLifespans", "id", id);
          const localVarPath = `/admin/clients/{id}/lifespans`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(oAuth2ClientTokenLifespans, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        trustOAuth2JwtGrantIssuer: (trustOAuth2JwtGrantIssuer, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/trust/grants/jwt-bearer/issuers`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(trustOAuth2JwtGrantIssuer, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.OAuth2ApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.OAuth2ApiAxiosParamCreator(configuration);
      return {
        acceptOAuth2ConsentRequest(consentChallenge, acceptOAuth2ConsentRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.acceptOAuth2ConsentRequest(consentChallenge, acceptOAuth2ConsentRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        acceptOAuth2LoginRequest(loginChallenge, acceptOAuth2LoginRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.acceptOAuth2LoginRequest(loginChallenge, acceptOAuth2LoginRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        acceptOAuth2LogoutRequest(logoutChallenge, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.acceptOAuth2LogoutRequest(logoutChallenge, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createOAuth2Client(oAuth2Client, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createOAuth2Client(oAuth2Client, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteOAuth2Client(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteOAuth2Client(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteOAuth2Token(clientId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteOAuth2Token(clientId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteTrustedOAuth2JwtGrantIssuer(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteTrustedOAuth2JwtGrantIssuer(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getOAuth2Client(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getOAuth2Client(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getOAuth2ConsentRequest(consentChallenge, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getOAuth2ConsentRequest(consentChallenge, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getOAuth2LoginRequest(loginChallenge, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getOAuth2LoginRequest(loginChallenge, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getOAuth2LogoutRequest(logoutChallenge, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getOAuth2LogoutRequest(logoutChallenge, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getTrustedOAuth2JwtGrantIssuer(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getTrustedOAuth2JwtGrantIssuer(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        introspectOAuth2Token(token, scope, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.introspectOAuth2Token(token, scope, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listOAuth2Clients(pageSize, pageToken, clientName, owner, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listOAuth2Clients(pageSize, pageToken, clientName, owner, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listOAuth2ConsentSessions(subject, pageSize, pageToken, loginSessionId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listOAuth2ConsentSessions(subject, pageSize, pageToken, loginSessionId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listTrustedOAuth2JwtGrantIssuers(maxItems, defaultItems, issuer, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listTrustedOAuth2JwtGrantIssuers(maxItems, defaultItems, issuer, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        oAuth2Authorize(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.oAuth2Authorize(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        oauth2TokenExchange(grantType, clientId, code, redirectUri, refreshToken, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.oauth2TokenExchange(grantType, clientId, code, redirectUri, refreshToken, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        patchOAuth2Client(id, jsonPatch, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.patchOAuth2Client(id, jsonPatch, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        rejectOAuth2ConsentRequest(consentChallenge, rejectOAuth2Request, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.rejectOAuth2ConsentRequest(consentChallenge, rejectOAuth2Request, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        rejectOAuth2LoginRequest(loginChallenge, rejectOAuth2Request, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.rejectOAuth2LoginRequest(loginChallenge, rejectOAuth2Request, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        rejectOAuth2LogoutRequest(logoutChallenge, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.rejectOAuth2LogoutRequest(logoutChallenge, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        revokeOAuth2ConsentSessions(subject, client, all, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.revokeOAuth2ConsentSessions(subject, client, all, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        revokeOAuth2LoginSessions(subject, sid, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.revokeOAuth2LoginSessions(subject, sid, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        revokeOAuth2Token(token, clientId, clientSecret, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.revokeOAuth2Token(token, clientId, clientSecret, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        setOAuth2Client(id, oAuth2Client, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.setOAuth2Client(id, oAuth2Client, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        setOAuth2ClientLifespans(id, oAuth2ClientTokenLifespans, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.setOAuth2ClientLifespans(id, oAuth2ClientTokenLifespans, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        trustOAuth2JwtGrantIssuer(trustOAuth2JwtGrantIssuer, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.trustOAuth2JwtGrantIssuer(trustOAuth2JwtGrantIssuer, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.OAuth2ApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.OAuth2ApiFp(configuration);
      return {
        acceptOAuth2ConsentRequest(consentChallenge, acceptOAuth2ConsentRequest, options) {
          return localVarFp.acceptOAuth2ConsentRequest(consentChallenge, acceptOAuth2ConsentRequest, options).then((request) => request(axios, basePath));
        },
        acceptOAuth2LoginRequest(loginChallenge, acceptOAuth2LoginRequest, options) {
          return localVarFp.acceptOAuth2LoginRequest(loginChallenge, acceptOAuth2LoginRequest, options).then((request) => request(axios, basePath));
        },
        acceptOAuth2LogoutRequest(logoutChallenge, options) {
          return localVarFp.acceptOAuth2LogoutRequest(logoutChallenge, options).then((request) => request(axios, basePath));
        },
        createOAuth2Client(oAuth2Client, options) {
          return localVarFp.createOAuth2Client(oAuth2Client, options).then((request) => request(axios, basePath));
        },
        deleteOAuth2Client(id, options) {
          return localVarFp.deleteOAuth2Client(id, options).then((request) => request(axios, basePath));
        },
        deleteOAuth2Token(clientId, options) {
          return localVarFp.deleteOAuth2Token(clientId, options).then((request) => request(axios, basePath));
        },
        deleteTrustedOAuth2JwtGrantIssuer(id, options) {
          return localVarFp.deleteTrustedOAuth2JwtGrantIssuer(id, options).then((request) => request(axios, basePath));
        },
        getOAuth2Client(id, options) {
          return localVarFp.getOAuth2Client(id, options).then((request) => request(axios, basePath));
        },
        getOAuth2ConsentRequest(consentChallenge, options) {
          return localVarFp.getOAuth2ConsentRequest(consentChallenge, options).then((request) => request(axios, basePath));
        },
        getOAuth2LoginRequest(loginChallenge, options) {
          return localVarFp.getOAuth2LoginRequest(loginChallenge, options).then((request) => request(axios, basePath));
        },
        getOAuth2LogoutRequest(logoutChallenge, options) {
          return localVarFp.getOAuth2LogoutRequest(logoutChallenge, options).then((request) => request(axios, basePath));
        },
        getTrustedOAuth2JwtGrantIssuer(id, options) {
          return localVarFp.getTrustedOAuth2JwtGrantIssuer(id, options).then((request) => request(axios, basePath));
        },
        introspectOAuth2Token(token, scope, options) {
          return localVarFp.introspectOAuth2Token(token, scope, options).then((request) => request(axios, basePath));
        },
        listOAuth2Clients(pageSize, pageToken, clientName, owner, options) {
          return localVarFp.listOAuth2Clients(pageSize, pageToken, clientName, owner, options).then((request) => request(axios, basePath));
        },
        listOAuth2ConsentSessions(subject, pageSize, pageToken, loginSessionId, options) {
          return localVarFp.listOAuth2ConsentSessions(subject, pageSize, pageToken, loginSessionId, options).then((request) => request(axios, basePath));
        },
        listTrustedOAuth2JwtGrantIssuers(maxItems, defaultItems, issuer, options) {
          return localVarFp.listTrustedOAuth2JwtGrantIssuers(maxItems, defaultItems, issuer, options).then((request) => request(axios, basePath));
        },
        oAuth2Authorize(options) {
          return localVarFp.oAuth2Authorize(options).then((request) => request(axios, basePath));
        },
        oauth2TokenExchange(grantType, clientId, code, redirectUri, refreshToken, options) {
          return localVarFp.oauth2TokenExchange(grantType, clientId, code, redirectUri, refreshToken, options).then((request) => request(axios, basePath));
        },
        patchOAuth2Client(id, jsonPatch, options) {
          return localVarFp.patchOAuth2Client(id, jsonPatch, options).then((request) => request(axios, basePath));
        },
        rejectOAuth2ConsentRequest(consentChallenge, rejectOAuth2Request, options) {
          return localVarFp.rejectOAuth2ConsentRequest(consentChallenge, rejectOAuth2Request, options).then((request) => request(axios, basePath));
        },
        rejectOAuth2LoginRequest(loginChallenge, rejectOAuth2Request, options) {
          return localVarFp.rejectOAuth2LoginRequest(loginChallenge, rejectOAuth2Request, options).then((request) => request(axios, basePath));
        },
        rejectOAuth2LogoutRequest(logoutChallenge, options) {
          return localVarFp.rejectOAuth2LogoutRequest(logoutChallenge, options).then((request) => request(axios, basePath));
        },
        revokeOAuth2ConsentSessions(subject, client, all, options) {
          return localVarFp.revokeOAuth2ConsentSessions(subject, client, all, options).then((request) => request(axios, basePath));
        },
        revokeOAuth2LoginSessions(subject, sid, options) {
          return localVarFp.revokeOAuth2LoginSessions(subject, sid, options).then((request) => request(axios, basePath));
        },
        revokeOAuth2Token(token, clientId, clientSecret, options) {
          return localVarFp.revokeOAuth2Token(token, clientId, clientSecret, options).then((request) => request(axios, basePath));
        },
        setOAuth2Client(id, oAuth2Client, options) {
          return localVarFp.setOAuth2Client(id, oAuth2Client, options).then((request) => request(axios, basePath));
        },
        setOAuth2ClientLifespans(id, oAuth2ClientTokenLifespans, options) {
          return localVarFp.setOAuth2ClientLifespans(id, oAuth2ClientTokenLifespans, options).then((request) => request(axios, basePath));
        },
        trustOAuth2JwtGrantIssuer(trustOAuth2JwtGrantIssuer, options) {
          return localVarFp.trustOAuth2JwtGrantIssuer(trustOAuth2JwtGrantIssuer, options).then((request) => request(axios, basePath));
        }
      };
    };
    var OAuth2Api = class extends base_1.BaseAPI {
      acceptOAuth2ConsentRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).acceptOAuth2ConsentRequest(requestParameters.consentChallenge, requestParameters.acceptOAuth2ConsentRequest, options).then((request) => request(this.axios, this.basePath));
      }
      acceptOAuth2LoginRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).acceptOAuth2LoginRequest(requestParameters.loginChallenge, requestParameters.acceptOAuth2LoginRequest, options).then((request) => request(this.axios, this.basePath));
      }
      acceptOAuth2LogoutRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).acceptOAuth2LogoutRequest(requestParameters.logoutChallenge, options).then((request) => request(this.axios, this.basePath));
      }
      createOAuth2Client(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).createOAuth2Client(requestParameters.oAuth2Client, options).then((request) => request(this.axios, this.basePath));
      }
      deleteOAuth2Client(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).deleteOAuth2Client(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      deleteOAuth2Token(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).deleteOAuth2Token(requestParameters.clientId, options).then((request) => request(this.axios, this.basePath));
      }
      deleteTrustedOAuth2JwtGrantIssuer(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).deleteTrustedOAuth2JwtGrantIssuer(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      getOAuth2Client(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).getOAuth2Client(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      getOAuth2ConsentRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).getOAuth2ConsentRequest(requestParameters.consentChallenge, options).then((request) => request(this.axios, this.basePath));
      }
      getOAuth2LoginRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).getOAuth2LoginRequest(requestParameters.loginChallenge, options).then((request) => request(this.axios, this.basePath));
      }
      getOAuth2LogoutRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).getOAuth2LogoutRequest(requestParameters.logoutChallenge, options).then((request) => request(this.axios, this.basePath));
      }
      getTrustedOAuth2JwtGrantIssuer(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).getTrustedOAuth2JwtGrantIssuer(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      introspectOAuth2Token(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).introspectOAuth2Token(requestParameters.token, requestParameters.scope, options).then((request) => request(this.axios, this.basePath));
      }
      listOAuth2Clients(requestParameters = {}, options) {
        return exports.OAuth2ApiFp(this.configuration).listOAuth2Clients(requestParameters.pageSize, requestParameters.pageToken, requestParameters.clientName, requestParameters.owner, options).then((request) => request(this.axios, this.basePath));
      }
      listOAuth2ConsentSessions(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).listOAuth2ConsentSessions(requestParameters.subject, requestParameters.pageSize, requestParameters.pageToken, requestParameters.loginSessionId, options).then((request) => request(this.axios, this.basePath));
      }
      listTrustedOAuth2JwtGrantIssuers(requestParameters = {}, options) {
        return exports.OAuth2ApiFp(this.configuration).listTrustedOAuth2JwtGrantIssuers(requestParameters.maxItems, requestParameters.defaultItems, requestParameters.issuer, options).then((request) => request(this.axios, this.basePath));
      }
      oAuth2Authorize(options) {
        return exports.OAuth2ApiFp(this.configuration).oAuth2Authorize(options).then((request) => request(this.axios, this.basePath));
      }
      oauth2TokenExchange(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).oauth2TokenExchange(requestParameters.grantType, requestParameters.clientId, requestParameters.code, requestParameters.redirectUri, requestParameters.refreshToken, options).then((request) => request(this.axios, this.basePath));
      }
      patchOAuth2Client(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).patchOAuth2Client(requestParameters.id, requestParameters.jsonPatch, options).then((request) => request(this.axios, this.basePath));
      }
      rejectOAuth2ConsentRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).rejectOAuth2ConsentRequest(requestParameters.consentChallenge, requestParameters.rejectOAuth2Request, options).then((request) => request(this.axios, this.basePath));
      }
      rejectOAuth2LoginRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).rejectOAuth2LoginRequest(requestParameters.loginChallenge, requestParameters.rejectOAuth2Request, options).then((request) => request(this.axios, this.basePath));
      }
      rejectOAuth2LogoutRequest(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).rejectOAuth2LogoutRequest(requestParameters.logoutChallenge, options).then((request) => request(this.axios, this.basePath));
      }
      revokeOAuth2ConsentSessions(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).revokeOAuth2ConsentSessions(requestParameters.subject, requestParameters.client, requestParameters.all, options).then((request) => request(this.axios, this.basePath));
      }
      revokeOAuth2LoginSessions(requestParameters = {}, options) {
        return exports.OAuth2ApiFp(this.configuration).revokeOAuth2LoginSessions(requestParameters.subject, requestParameters.sid, options).then((request) => request(this.axios, this.basePath));
      }
      revokeOAuth2Token(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).revokeOAuth2Token(requestParameters.token, requestParameters.clientId, requestParameters.clientSecret, options).then((request) => request(this.axios, this.basePath));
      }
      setOAuth2Client(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).setOAuth2Client(requestParameters.id, requestParameters.oAuth2Client, options).then((request) => request(this.axios, this.basePath));
      }
      setOAuth2ClientLifespans(requestParameters, options) {
        return exports.OAuth2ApiFp(this.configuration).setOAuth2ClientLifespans(requestParameters.id, requestParameters.oAuth2ClientTokenLifespans, options).then((request) => request(this.axios, this.basePath));
      }
      trustOAuth2JwtGrantIssuer(requestParameters = {}, options) {
        return exports.OAuth2ApiFp(this.configuration).trustOAuth2JwtGrantIssuer(requestParameters.trustOAuth2JwtGrantIssuer, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.OAuth2Api = OAuth2Api;
    exports.OidcApiAxiosParamCreator = function(configuration) {
      return {
        createOidcDynamicClient: (oAuth2Client, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createOidcDynamicClient", "oAuth2Client", oAuth2Client);
          const localVarPath = `/oauth2/register`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(oAuth2Client, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createVerifiableCredential: (createVerifiableCredentialRequestBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/credentials`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createVerifiableCredentialRequestBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteOidcDynamicClient: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteOidcDynamicClient", "id", id);
          const localVarPath = `/oauth2/register/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        discoverOidcConfiguration: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/.well-known/openid-configuration`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getOidcDynamicClient: (id, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getOidcDynamicClient", "id", id);
          const localVarPath = `/oauth2/register/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getOidcUserInfo: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/userinfo`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setOAuthToObject(localVarHeaderParameter, "oauth2", [], configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        revokeOidcSession: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/oauth2/sessions/logout`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        setOidcDynamicClient: (id, oAuth2Client, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("setOidcDynamicClient", "id", id);
          common_1.assertParamExists("setOidcDynamicClient", "oAuth2Client", oAuth2Client);
          const localVarPath = `/oauth2/register/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(oAuth2Client, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.OidcApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.OidcApiAxiosParamCreator(configuration);
      return {
        createOidcDynamicClient(oAuth2Client, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createOidcDynamicClient(oAuth2Client, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createVerifiableCredential(createVerifiableCredentialRequestBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createVerifiableCredential(createVerifiableCredentialRequestBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteOidcDynamicClient(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteOidcDynamicClient(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        discoverOidcConfiguration(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.discoverOidcConfiguration(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getOidcDynamicClient(id, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getOidcDynamicClient(id, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getOidcUserInfo(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getOidcUserInfo(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        revokeOidcSession(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.revokeOidcSession(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        setOidcDynamicClient(id, oAuth2Client, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.setOidcDynamicClient(id, oAuth2Client, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.OidcApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.OidcApiFp(configuration);
      return {
        createOidcDynamicClient(oAuth2Client, options) {
          return localVarFp.createOidcDynamicClient(oAuth2Client, options).then((request) => request(axios, basePath));
        },
        createVerifiableCredential(createVerifiableCredentialRequestBody, options) {
          return localVarFp.createVerifiableCredential(createVerifiableCredentialRequestBody, options).then((request) => request(axios, basePath));
        },
        deleteOidcDynamicClient(id, options) {
          return localVarFp.deleteOidcDynamicClient(id, options).then((request) => request(axios, basePath));
        },
        discoverOidcConfiguration(options) {
          return localVarFp.discoverOidcConfiguration(options).then((request) => request(axios, basePath));
        },
        getOidcDynamicClient(id, options) {
          return localVarFp.getOidcDynamicClient(id, options).then((request) => request(axios, basePath));
        },
        getOidcUserInfo(options) {
          return localVarFp.getOidcUserInfo(options).then((request) => request(axios, basePath));
        },
        revokeOidcSession(options) {
          return localVarFp.revokeOidcSession(options).then((request) => request(axios, basePath));
        },
        setOidcDynamicClient(id, oAuth2Client, options) {
          return localVarFp.setOidcDynamicClient(id, oAuth2Client, options).then((request) => request(axios, basePath));
        }
      };
    };
    var OidcApi = class extends base_1.BaseAPI {
      createOidcDynamicClient(requestParameters, options) {
        return exports.OidcApiFp(this.configuration).createOidcDynamicClient(requestParameters.oAuth2Client, options).then((request) => request(this.axios, this.basePath));
      }
      createVerifiableCredential(requestParameters = {}, options) {
        return exports.OidcApiFp(this.configuration).createVerifiableCredential(requestParameters.createVerifiableCredentialRequestBody, options).then((request) => request(this.axios, this.basePath));
      }
      deleteOidcDynamicClient(requestParameters, options) {
        return exports.OidcApiFp(this.configuration).deleteOidcDynamicClient(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      discoverOidcConfiguration(options) {
        return exports.OidcApiFp(this.configuration).discoverOidcConfiguration(options).then((request) => request(this.axios, this.basePath));
      }
      getOidcDynamicClient(requestParameters, options) {
        return exports.OidcApiFp(this.configuration).getOidcDynamicClient(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
      }
      getOidcUserInfo(options) {
        return exports.OidcApiFp(this.configuration).getOidcUserInfo(options).then((request) => request(this.axios, this.basePath));
      }
      revokeOidcSession(options) {
        return exports.OidcApiFp(this.configuration).revokeOidcSession(options).then((request) => request(this.axios, this.basePath));
      }
      setOidcDynamicClient(requestParameters, options) {
        return exports.OidcApiFp(this.configuration).setOidcDynamicClient(requestParameters.id, requestParameters.oAuth2Client, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.OidcApi = OidcApi;
    exports.PermissionApiAxiosParamCreator = function(configuration) {
      return {
        checkPermission: (namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/relation-tuples/check/openapi`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (namespace !== void 0) {
            localVarQueryParameter["namespace"] = namespace;
          }
          if (object !== void 0) {
            localVarQueryParameter["object"] = object;
          }
          if (relation !== void 0) {
            localVarQueryParameter["relation"] = relation;
          }
          if (subjectId !== void 0) {
            localVarQueryParameter["subject_id"] = subjectId;
          }
          if (subjectSetNamespace !== void 0) {
            localVarQueryParameter["subject_set.namespace"] = subjectSetNamespace;
          }
          if (subjectSetObject !== void 0) {
            localVarQueryParameter["subject_set.object"] = subjectSetObject;
          }
          if (subjectSetRelation !== void 0) {
            localVarQueryParameter["subject_set.relation"] = subjectSetRelation;
          }
          if (maxDepth !== void 0) {
            localVarQueryParameter["max-depth"] = maxDepth;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        checkPermissionOrError: (namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/relation-tuples/check`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (namespace !== void 0) {
            localVarQueryParameter["namespace"] = namespace;
          }
          if (object !== void 0) {
            localVarQueryParameter["object"] = object;
          }
          if (relation !== void 0) {
            localVarQueryParameter["relation"] = relation;
          }
          if (subjectId !== void 0) {
            localVarQueryParameter["subject_id"] = subjectId;
          }
          if (subjectSetNamespace !== void 0) {
            localVarQueryParameter["subject_set.namespace"] = subjectSetNamespace;
          }
          if (subjectSetObject !== void 0) {
            localVarQueryParameter["subject_set.object"] = subjectSetObject;
          }
          if (subjectSetRelation !== void 0) {
            localVarQueryParameter["subject_set.relation"] = subjectSetRelation;
          }
          if (maxDepth !== void 0) {
            localVarQueryParameter["max-depth"] = maxDepth;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        expandPermissions: (namespace, object, relation, maxDepth, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("expandPermissions", "namespace", namespace);
          common_1.assertParamExists("expandPermissions", "object", object);
          common_1.assertParamExists("expandPermissions", "relation", relation);
          const localVarPath = `/relation-tuples/expand`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (namespace !== void 0) {
            localVarQueryParameter["namespace"] = namespace;
          }
          if (object !== void 0) {
            localVarQueryParameter["object"] = object;
          }
          if (relation !== void 0) {
            localVarQueryParameter["relation"] = relation;
          }
          if (maxDepth !== void 0) {
            localVarQueryParameter["max-depth"] = maxDepth;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        postCheckPermission: (maxDepth, postCheckPermissionBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/relation-tuples/check/openapi`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (maxDepth !== void 0) {
            localVarQueryParameter["max-depth"] = maxDepth;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(postCheckPermissionBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        postCheckPermissionOrError: (maxDepth, postCheckPermissionOrErrorBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/relation-tuples/check`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (maxDepth !== void 0) {
            localVarQueryParameter["max-depth"] = maxDepth;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(postCheckPermissionOrErrorBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.PermissionApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.PermissionApiAxiosParamCreator(configuration);
      return {
        checkPermission(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.checkPermission(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        checkPermissionOrError(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.checkPermissionOrError(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        expandPermissions(namespace, object, relation, maxDepth, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.expandPermissions(namespace, object, relation, maxDepth, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        postCheckPermission(maxDepth, postCheckPermissionBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.postCheckPermission(maxDepth, postCheckPermissionBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        postCheckPermissionOrError(maxDepth, postCheckPermissionOrErrorBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.postCheckPermissionOrError(maxDepth, postCheckPermissionOrErrorBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.PermissionApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.PermissionApiFp(configuration);
      return {
        checkPermission(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options) {
          return localVarFp.checkPermission(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options).then((request) => request(axios, basePath));
        },
        checkPermissionOrError(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options) {
          return localVarFp.checkPermissionOrError(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, maxDepth, options).then((request) => request(axios, basePath));
        },
        expandPermissions(namespace, object, relation, maxDepth, options) {
          return localVarFp.expandPermissions(namespace, object, relation, maxDepth, options).then((request) => request(axios, basePath));
        },
        postCheckPermission(maxDepth, postCheckPermissionBody, options) {
          return localVarFp.postCheckPermission(maxDepth, postCheckPermissionBody, options).then((request) => request(axios, basePath));
        },
        postCheckPermissionOrError(maxDepth, postCheckPermissionOrErrorBody, options) {
          return localVarFp.postCheckPermissionOrError(maxDepth, postCheckPermissionOrErrorBody, options).then((request) => request(axios, basePath));
        }
      };
    };
    var PermissionApi = class extends base_1.BaseAPI {
      checkPermission(requestParameters = {}, options) {
        return exports.PermissionApiFp(this.configuration).checkPermission(requestParameters.namespace, requestParameters.object, requestParameters.relation, requestParameters.subjectId, requestParameters.subjectSetNamespace, requestParameters.subjectSetObject, requestParameters.subjectSetRelation, requestParameters.maxDepth, options).then((request) => request(this.axios, this.basePath));
      }
      checkPermissionOrError(requestParameters = {}, options) {
        return exports.PermissionApiFp(this.configuration).checkPermissionOrError(requestParameters.namespace, requestParameters.object, requestParameters.relation, requestParameters.subjectId, requestParameters.subjectSetNamespace, requestParameters.subjectSetObject, requestParameters.subjectSetRelation, requestParameters.maxDepth, options).then((request) => request(this.axios, this.basePath));
      }
      expandPermissions(requestParameters, options) {
        return exports.PermissionApiFp(this.configuration).expandPermissions(requestParameters.namespace, requestParameters.object, requestParameters.relation, requestParameters.maxDepth, options).then((request) => request(this.axios, this.basePath));
      }
      postCheckPermission(requestParameters = {}, options) {
        return exports.PermissionApiFp(this.configuration).postCheckPermission(requestParameters.maxDepth, requestParameters.postCheckPermissionBody, options).then((request) => request(this.axios, this.basePath));
      }
      postCheckPermissionOrError(requestParameters = {}, options) {
        return exports.PermissionApiFp(this.configuration).postCheckPermissionOrError(requestParameters.maxDepth, requestParameters.postCheckPermissionOrErrorBody, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.PermissionApi = PermissionApi;
    exports.ProjectApiAxiosParamCreator = function(configuration) {
      return {
        createProject: (createProjectBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/projects`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createProjectBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createProjectApiKey: (project, inlineObject3, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createProjectApiKey", "project", project);
          const localVarPath = `/projects/{project}/tokens`.replace(`{${"project"}}`, encodeURIComponent(String(project)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(inlineObject3, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteProjectApiKey: (project, tokenId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteProjectApiKey", "project", project);
          common_1.assertParamExists("deleteProjectApiKey", "tokenId", tokenId);
          const localVarPath = `/projects/{project}/tokens/{token_id}`.replace(`{${"project"}}`, encodeURIComponent(String(project))).replace(`{${"token_id"}}`, encodeURIComponent(String(tokenId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getActiveProjectInConsole: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/console/active/project`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getProject: (projectId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getProject", "projectId", projectId);
          const localVarPath = `/projects/{project_id}`.replace(`{${"project_id"}}`, encodeURIComponent(String(projectId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getProjectMembers: (project, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getProjectMembers", "project", project);
          const localVarPath = `/projects/{project}/members`.replace(`{${"project"}}`, encodeURIComponent(String(project)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getProjectMetrics: (projectId, eventType, resolution, from, to, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("getProjectMetrics", "projectId", projectId);
          common_1.assertParamExists("getProjectMetrics", "eventType", eventType);
          common_1.assertParamExists("getProjectMetrics", "resolution", resolution);
          common_1.assertParamExists("getProjectMetrics", "from", from);
          common_1.assertParamExists("getProjectMetrics", "to", to);
          const localVarPath = `/projects/{project_id}/metrics`.replace(`{${"project_id"}}`, encodeURIComponent(String(projectId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (eventType !== void 0) {
            localVarQueryParameter["event_type"] = eventType;
          }
          if (resolution !== void 0) {
            localVarQueryParameter["resolution"] = resolution;
          }
          if (from !== void 0) {
            localVarQueryParameter["from"] = from instanceof Date ? from.toISOString() : from;
          }
          if (to !== void 0) {
            localVarQueryParameter["to"] = to instanceof Date ? to.toISOString() : to;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listProjectApiKeys: (project, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("listProjectApiKeys", "project", project);
          const localVarPath = `/projects/{project}/tokens`.replace(`{${"project"}}`, encodeURIComponent(String(project)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listProjects: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/projects`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        patchProject: (projectId, jsonPatch, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("patchProject", "projectId", projectId);
          const localVarPath = `/projects/{project_id}`.replace(`{${"project_id"}}`, encodeURIComponent(String(projectId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PATCH" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(jsonPatch, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        purgeProject: (projectId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("purgeProject", "projectId", projectId);
          const localVarPath = `/projects/{project_id}`.replace(`{${"project_id"}}`, encodeURIComponent(String(projectId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        removeProjectMember: (project, member, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("removeProjectMember", "project", project);
          common_1.assertParamExists("removeProjectMember", "member", member);
          const localVarPath = `/projects/{project}/members/{member}`.replace(`{${"project"}}`, encodeURIComponent(String(project))).replace(`{${"member"}}`, encodeURIComponent(String(member)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        setActiveProjectInConsole: (setActiveProjectInConsoleBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/console/active/project`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(setActiveProjectInConsoleBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        setProject: (projectId, setProject, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("setProject", "projectId", projectId);
          const localVarPath = `/projects/{project_id}`.replace(`{${"project_id"}}`, encodeURIComponent(String(projectId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(setProject, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.ProjectApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.ProjectApiAxiosParamCreator(configuration);
      return {
        createProject(createProjectBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createProject(createProjectBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createProjectApiKey(project, inlineObject3, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createProjectApiKey(project, inlineObject3, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteProjectApiKey(project, tokenId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteProjectApiKey(project, tokenId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getActiveProjectInConsole(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getActiveProjectInConsole(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getProject(projectId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getProject(projectId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getProjectMembers(project, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getProjectMembers(project, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getProjectMetrics(projectId, eventType, resolution, from, to, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getProjectMetrics(projectId, eventType, resolution, from, to, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listProjectApiKeys(project, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listProjectApiKeys(project, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listProjects(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listProjects(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        patchProject(projectId, jsonPatch, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.patchProject(projectId, jsonPatch, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        purgeProject(projectId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.purgeProject(projectId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        removeProjectMember(project, member, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.removeProjectMember(project, member, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        setActiveProjectInConsole(setActiveProjectInConsoleBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.setActiveProjectInConsole(setActiveProjectInConsoleBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        setProject(projectId, setProject, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.setProject(projectId, setProject, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.ProjectApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.ProjectApiFp(configuration);
      return {
        createProject(createProjectBody, options) {
          return localVarFp.createProject(createProjectBody, options).then((request) => request(axios, basePath));
        },
        createProjectApiKey(project, inlineObject3, options) {
          return localVarFp.createProjectApiKey(project, inlineObject3, options).then((request) => request(axios, basePath));
        },
        deleteProjectApiKey(project, tokenId, options) {
          return localVarFp.deleteProjectApiKey(project, tokenId, options).then((request) => request(axios, basePath));
        },
        getActiveProjectInConsole(options) {
          return localVarFp.getActiveProjectInConsole(options).then((request) => request(axios, basePath));
        },
        getProject(projectId, options) {
          return localVarFp.getProject(projectId, options).then((request) => request(axios, basePath));
        },
        getProjectMembers(project, options) {
          return localVarFp.getProjectMembers(project, options).then((request) => request(axios, basePath));
        },
        getProjectMetrics(projectId, eventType, resolution, from, to, options) {
          return localVarFp.getProjectMetrics(projectId, eventType, resolution, from, to, options).then((request) => request(axios, basePath));
        },
        listProjectApiKeys(project, options) {
          return localVarFp.listProjectApiKeys(project, options).then((request) => request(axios, basePath));
        },
        listProjects(options) {
          return localVarFp.listProjects(options).then((request) => request(axios, basePath));
        },
        patchProject(projectId, jsonPatch, options) {
          return localVarFp.patchProject(projectId, jsonPatch, options).then((request) => request(axios, basePath));
        },
        purgeProject(projectId, options) {
          return localVarFp.purgeProject(projectId, options).then((request) => request(axios, basePath));
        },
        removeProjectMember(project, member, options) {
          return localVarFp.removeProjectMember(project, member, options).then((request) => request(axios, basePath));
        },
        setActiveProjectInConsole(setActiveProjectInConsoleBody, options) {
          return localVarFp.setActiveProjectInConsole(setActiveProjectInConsoleBody, options).then((request) => request(axios, basePath));
        },
        setProject(projectId, setProject, options) {
          return localVarFp.setProject(projectId, setProject, options).then((request) => request(axios, basePath));
        }
      };
    };
    var ProjectApi = class extends base_1.BaseAPI {
      createProject(requestParameters = {}, options) {
        return exports.ProjectApiFp(this.configuration).createProject(requestParameters.createProjectBody, options).then((request) => request(this.axios, this.basePath));
      }
      createProjectApiKey(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).createProjectApiKey(requestParameters.project, requestParameters.inlineObject3, options).then((request) => request(this.axios, this.basePath));
      }
      deleteProjectApiKey(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).deleteProjectApiKey(requestParameters.project, requestParameters.tokenId, options).then((request) => request(this.axios, this.basePath));
      }
      getActiveProjectInConsole(options) {
        return exports.ProjectApiFp(this.configuration).getActiveProjectInConsole(options).then((request) => request(this.axios, this.basePath));
      }
      getProject(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).getProject(requestParameters.projectId, options).then((request) => request(this.axios, this.basePath));
      }
      getProjectMembers(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).getProjectMembers(requestParameters.project, options).then((request) => request(this.axios, this.basePath));
      }
      getProjectMetrics(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).getProjectMetrics(requestParameters.projectId, requestParameters.eventType, requestParameters.resolution, requestParameters.from, requestParameters.to, options).then((request) => request(this.axios, this.basePath));
      }
      listProjectApiKeys(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).listProjectApiKeys(requestParameters.project, options).then((request) => request(this.axios, this.basePath));
      }
      listProjects(options) {
        return exports.ProjectApiFp(this.configuration).listProjects(options).then((request) => request(this.axios, this.basePath));
      }
      patchProject(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).patchProject(requestParameters.projectId, requestParameters.jsonPatch, options).then((request) => request(this.axios, this.basePath));
      }
      purgeProject(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).purgeProject(requestParameters.projectId, options).then((request) => request(this.axios, this.basePath));
      }
      removeProjectMember(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).removeProjectMember(requestParameters.project, requestParameters.member, options).then((request) => request(this.axios, this.basePath));
      }
      setActiveProjectInConsole(requestParameters = {}, options) {
        return exports.ProjectApiFp(this.configuration).setActiveProjectInConsole(requestParameters.setActiveProjectInConsoleBody, options).then((request) => request(this.axios, this.basePath));
      }
      setProject(requestParameters, options) {
        return exports.ProjectApiFp(this.configuration).setProject(requestParameters.projectId, requestParameters.setProject, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.ProjectApi = ProjectApi;
    exports.RelationshipApiAxiosParamCreator = function(configuration) {
      return {
        checkOplSyntax: (body, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/opl/syntax/check`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "text/plain";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(body, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        createRelationship: (createRelationshipBody, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/relation-tuples`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PUT" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createRelationshipBody, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        deleteRelationships: (namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/relation-tuples`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (namespace !== void 0) {
            localVarQueryParameter["namespace"] = namespace;
          }
          if (object !== void 0) {
            localVarQueryParameter["object"] = object;
          }
          if (relation !== void 0) {
            localVarQueryParameter["relation"] = relation;
          }
          if (subjectId !== void 0) {
            localVarQueryParameter["subject_id"] = subjectId;
          }
          if (subjectSetNamespace !== void 0) {
            localVarQueryParameter["subject_set.namespace"] = subjectSetNamespace;
          }
          if (subjectSetObject !== void 0) {
            localVarQueryParameter["subject_set.object"] = subjectSetObject;
          }
          if (subjectSetRelation !== void 0) {
            localVarQueryParameter["subject_set.relation"] = subjectSetRelation;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        getRelationships: (pageToken, pageSize, namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/relation-tuples`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          if (pageToken !== void 0) {
            localVarQueryParameter["page_token"] = pageToken;
          }
          if (pageSize !== void 0) {
            localVarQueryParameter["page_size"] = pageSize;
          }
          if (namespace !== void 0) {
            localVarQueryParameter["namespace"] = namespace;
          }
          if (object !== void 0) {
            localVarQueryParameter["object"] = object;
          }
          if (relation !== void 0) {
            localVarQueryParameter["relation"] = relation;
          }
          if (subjectId !== void 0) {
            localVarQueryParameter["subject_id"] = subjectId;
          }
          if (subjectSetNamespace !== void 0) {
            localVarQueryParameter["subject_set.namespace"] = subjectSetNamespace;
          }
          if (subjectSetObject !== void 0) {
            localVarQueryParameter["subject_set.object"] = subjectSetObject;
          }
          if (subjectSetRelation !== void 0) {
            localVarQueryParameter["subject_set.relation"] = subjectSetRelation;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        listRelationshipNamespaces: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/namespaces`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        patchRelationships: (relationshipPatch, options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/admin/relation-tuples`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "PATCH" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          yield common_1.setBearerAuthToObject(localVarHeaderParameter, configuration);
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(relationshipPatch, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.RelationshipApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.RelationshipApiAxiosParamCreator(configuration);
      return {
        checkOplSyntax(body, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.checkOplSyntax(body, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        createRelationship(createRelationshipBody, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createRelationship(createRelationshipBody, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        deleteRelationships(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteRelationships(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        getRelationships(pageToken, pageSize, namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.getRelationships(pageToken, pageSize, namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        listRelationshipNamespaces(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listRelationshipNamespaces(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        patchRelationships(relationshipPatch, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.patchRelationships(relationshipPatch, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.RelationshipApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.RelationshipApiFp(configuration);
      return {
        checkOplSyntax(body, options) {
          return localVarFp.checkOplSyntax(body, options).then((request) => request(axios, basePath));
        },
        createRelationship(createRelationshipBody, options) {
          return localVarFp.createRelationship(createRelationshipBody, options).then((request) => request(axios, basePath));
        },
        deleteRelationships(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options) {
          return localVarFp.deleteRelationships(namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options).then((request) => request(axios, basePath));
        },
        getRelationships(pageToken, pageSize, namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options) {
          return localVarFp.getRelationships(pageToken, pageSize, namespace, object, relation, subjectId, subjectSetNamespace, subjectSetObject, subjectSetRelation, options).then((request) => request(axios, basePath));
        },
        listRelationshipNamespaces(options) {
          return localVarFp.listRelationshipNamespaces(options).then((request) => request(axios, basePath));
        },
        patchRelationships(relationshipPatch, options) {
          return localVarFp.patchRelationships(relationshipPatch, options).then((request) => request(axios, basePath));
        }
      };
    };
    var RelationshipApi = class extends base_1.BaseAPI {
      checkOplSyntax(requestParameters = {}, options) {
        return exports.RelationshipApiFp(this.configuration).checkOplSyntax(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
      }
      createRelationship(requestParameters = {}, options) {
        return exports.RelationshipApiFp(this.configuration).createRelationship(requestParameters.createRelationshipBody, options).then((request) => request(this.axios, this.basePath));
      }
      deleteRelationships(requestParameters = {}, options) {
        return exports.RelationshipApiFp(this.configuration).deleteRelationships(requestParameters.namespace, requestParameters.object, requestParameters.relation, requestParameters.subjectId, requestParameters.subjectSetNamespace, requestParameters.subjectSetObject, requestParameters.subjectSetRelation, options).then((request) => request(this.axios, this.basePath));
      }
      getRelationships(requestParameters = {}, options) {
        return exports.RelationshipApiFp(this.configuration).getRelationships(requestParameters.pageToken, requestParameters.pageSize, requestParameters.namespace, requestParameters.object, requestParameters.relation, requestParameters.subjectId, requestParameters.subjectSetNamespace, requestParameters.subjectSetObject, requestParameters.subjectSetRelation, options).then((request) => request(this.axios, this.basePath));
      }
      listRelationshipNamespaces(options) {
        return exports.RelationshipApiFp(this.configuration).listRelationshipNamespaces(options).then((request) => request(this.axios, this.basePath));
      }
      patchRelationships(requestParameters = {}, options) {
        return exports.RelationshipApiFp(this.configuration).patchRelationships(requestParameters.relationshipPatch, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.RelationshipApi = RelationshipApi;
    exports.WellknownApiAxiosParamCreator = function(configuration) {
      return {
        discoverJsonWebKeys: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/.well-known/jwks.json`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.WellknownApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.WellknownApiAxiosParamCreator(configuration);
      return {
        discoverJsonWebKeys(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.discoverJsonWebKeys(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.WellknownApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.WellknownApiFp(configuration);
      return {
        discoverJsonWebKeys(options) {
          return localVarFp.discoverJsonWebKeys(options).then((request) => request(axios, basePath));
        }
      };
    };
    var WellknownApi = class extends base_1.BaseAPI {
      discoverJsonWebKeys(options) {
        return exports.WellknownApiFp(this.configuration).discoverJsonWebKeys(options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.WellknownApi = WellknownApi;
  }
});

// ../../node_modules/@ory/client/dist/configuration.js
var require_configuration = __commonJS({
  "../../node_modules/@ory/client/dist/configuration.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Configuration = void 0;
    var Configuration2 = class {
      constructor(param = {}) {
        this.apiKey = param.apiKey;
        this.username = param.username;
        this.password = param.password;
        this.accessToken = param.accessToken;
        this.basePath = param.basePath;
        this.baseOptions = param.baseOptions;
        this.formDataCtor = param.formDataCtor;
      }
      isJsonMime(mime) {
        const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
      }
    };
    exports.Configuration = Configuration2;
  }
});

// ../../node_modules/@ory/client/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/@ory/client/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p2 in m)
        if (p2 !== "default" && !exports2.hasOwnProperty(p2))
          __createBinding(exports2, m, p2);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_api(), exports);
    __exportStar(require_configuration(), exports);
  }
});

// ../../node_modules/itty-cors/dist/itty-cors.mjs
var p = (a = {}) => {
  let { origins: i = ["*"], maxAge: c, methods: l = ["GET"], headers: h = {} } = a, n, t = { "content-type": "application/json", "Access-Control-Allow-Methods": l.join(", "), ...h };
  return c && (t["Access-Control-Max-Age"] = c), { corsify: (e) => {
    if (!e)
      throw new Error("No fetch handler responded and no upstream to proxy to specified.");
    let { headers: o, status: s, body: r } = e;
    if (s === 101)
      return e;
    let d = Object.fromEntries(o);
    return d["access-control-allow-origin"] || [301, 302, 308].includes(s) ? e : new Response(r, { status: s, headers: { ...d, ...t, ...n, "content-type": o.get("content-type") } });
  }, preflight: (e) => {
    let o = [.../* @__PURE__ */ new Set(["OPTIONS", ...l])], s = e.headers.get("origin");
    if (n = (i.includes(s) || i.includes("*")) && { "Access-Control-Allow-Origin": s }, e.method === "OPTIONS") {
      if (e.headers.get("Origin") !== null && e.headers.get("Access-Control-Request-Method") !== null && e.headers.get("Access-Control-Request-Headers") !== null) {
        let r = { ...t, "Access-Control-Allow-Methods": o.join(", "), "Access-Control-Allow-Headers": e.headers.get("Access-Control-Request-Headers"), ...n };
        return new Response(null, { headers: r });
      }
      return new Response(null, { headers: { Allow: o.join(", ") } });
    }
  } };
};

// src/auth.ts
var import_client = __toESM(require_dist());

// ../../node_modules/@haverstack/axios-fetch-adapter/lib/index.esm.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var require_bind2 = __commonJS2({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});
var require_utils2 = __commonJS2({
  "node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind2();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});
var require_buildURL2 = __commonJS2({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils2();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL2(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});
var require_combineURLs2 = __commonJS2({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs2(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});
var require_isAbsoluteURL2 = __commonJS2({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL2(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});
var import_buildURL = __toESM2(require_buildURL2());
var import_combineURLs = __toESM2(require_combineURLs2());
var import_isAbsoluteURL = __toESM2(require_isAbsoluteURL2());
function buildFullPath(requestedURL, baseURL) {
  if (requestedURL && baseURL && !(0, import_isAbsoluteURL.default)(requestedURL)) {
    return (0, import_combineURLs.default)(baseURL, requestedURL);
  }
  if (!requestedURL && baseURL) {
    return baseURL;
  }
  return requestedURL;
}
function createFetchAdapter(fetchConfig) {
  console.log("creating fetch adapter", fetchConfig);
  const adapterFetch = fetchConfig ? fetchConfig.fetch : void 0;
  function axiosAdapter(config) {
    return __async(this, null, function* () {
      console.log("creating fetch adapter ASYNC", config);
      console.log(config.headers);
      const adapterFetch2 = fetchConfig ? fetchConfig.fetch : void 0;
      const request = createRequest(config);
      const promiseChain = [getResponse(request, config, adapterFetch2)];
      let timer = null;
      if (config.timeout && config.timeout > 0) {
        promiseChain.push(
          new Promise((_, reject) => {
            timer = setTimeout(() => {
              const message = config.timeoutErrorMessage ? config.timeoutErrorMessage : "timeout of " + config.timeout + "ms exceeded";
              reject(createError(message, config, "ETIMEDOUT", request));
            }, config.timeout);
          })
        );
      }
      const response = yield Promise.race(promiseChain);
      if (timer !== null) {
        clearTimeout(timer);
      }
      return new Promise((resolve, reject) => {
        if (response instanceof Error) {
          reject(response);
        } else {
          const validateStatus = config.validateStatus;
          if (!response.status || !validateStatus || validateStatus(response.status)) {
            resolve(response);
          } else {
            reject(
              createError(
                "Request failed with status code " + response.status,
                config,
                getErrorCodeFromStatus(response.status),
                request,
                response
              )
            );
          }
        }
      });
    });
  }
  return axiosAdapter;
}
var fetchAdapter = createFetchAdapter();
var src_default = fetchAdapter;
function getResponse(_0, _1) {
  return __async(this, arguments, function* (request, config, adapterFetch = fetch) {
    let stageOne;
    try {
      stageOne = yield adapterFetch(request);
    } catch (e) {
      return createError("Network Error", config, "ERR_NETWORK", request);
    }
    const headers = Object.assign({}, stageOne.headers);
    const response = {
      status: stageOne.status,
      statusText: stageOne.statusText,
      headers,
      config,
      request,
      data: void 0
    };
    if (stageOne.status >= 200 && stageOne.status !== 204) {
      switch (config.responseType) {
        case "arraybuffer":
          response.data = yield stageOne.arrayBuffer();
          break;
        case "blob":
          response.data = yield stageOne.blob();
          break;
        case "json":
          response.data = yield stageOne.json();
          break;
        default:
          response.data = yield stageOne.text();
          break;
      }
    }
    return __spreadProps(__spreadValues({}, response), { ok: stageOne.ok });
  });
}
function createRequest(config) {
  const headers = new Headers(config.headers);
  console.log("incoming headers", headers);
  console.log("config.headers", config.headers);
  if (config.auth) {
    const username = config.auth.username || "";
    const password = config.auth.password ? decodeURI(encodeURIComponent(config.auth.password)) : "";
    headers.set(
      "Authorization",
      `Basic ${Buffer.from(username + ":" + password).toString("base64")}`
    );
  }
  if (config.method === void 0) {
    config.method = "get";
  }
  const method = config.method.toUpperCase();
  const options = { headers, method };
  if (method !== "GET" && method !== "HEAD") {
    options.body = config.data;
  }
  if (config.withCredentials !== void 0) {
    options.credentials = config.withCredentials ? "include" : "omit";
  }
  const fullPath = buildFullPath(config.url ? config.url : "", config.baseURL);
  const serializer = config.paramsSerializer ? config.paramsSerializer : void 0;
  const url = (0, import_buildURL.default)(fullPath, config.params, serializer);
  console.log("about to return", url, options);
  console.log("headers", url, options.headers);
  return new Request(url, options);
}
function createError(message, config, code, request, response) {
  console.log(response.config.request);
  const error = new Error(message);
  error.config = config;
  error.code = code;
  error.request = request;
  error.response = response;
  error.isAxiosError = true;
  error.toJSON = function toJSON() {
    return {
      message: this.message,
      name: this.name,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
}
function getErrorCodeFromStatus(status) {
  return ["ERR_BAD_REQUEST", "ERR_BAD_RESPONSE"][Math.floor(status / 100) - 4] || "ERR_BAD_OPTION";
}

// src/auth.ts
async function getUserSession(request, env) {
  const ory = new import_client.FrontendApi(
    new import_client.Configuration({
      basePath: env.ORY_SDK_URL,
      baseOptions: {
        adapter: src_default
      }
    })
  );
  let request_headers_obj = Object.fromEntries(request.headers.entries());
  console.log("request.headers", request_headers_obj);
  console.log("env.ORY_SDK_URL", env.ORY_SDK_URL);
  const cookies = request.headers.get("Cookie") || void 0;
  console.log("cookies", cookies);
  const resp = await ory.toSession({ cookie: cookies });
  if (!resp || resp.status === 401) {
    throw new Error("Unauthorized");
  }
  return resp.data;
}

// src/index.ts
var { preflight, corsify } = p({
  methods: ["GET", "POST", "DELETE", "PUT"],
  origins: ["*"],
  maxAge: 3600,
  headers: {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*"
  }
});
var src_default2 = {
  async fetch(request, env, ctx) {
    const host = request.headers.get("Origin") || "*";
    if (request.method === "OPTIONS") {
      return addCors(new Response("", { status: 200 }), host);
    }
    let session = await getUserSession(request.clone(), env);
    if (session?.id == null) {
      return new Response("Unauthorized", { status: 401 });
    }
    let body = await request.json();
    const newRequestBody = {
      subject: session.id,
      data: body
    };
    const newRequest = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(newRequestBody)
    });
    let res = await env.api.fetch(newRequest.clone());
    return addCors(res, host);
  }
};
var addCors = (response, host) => {
  console.log("adding cors");
  let headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", host);
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Allow-Credentials", "true");
  let res = new Response(response.body, { ...response, headers });
  return res;
};
export {
  src_default2 as default
};
//# sourceMappingURL=index.js.map
