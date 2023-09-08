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

// ../../node_modules/itty-router-extras/middleware/withContent.js
var require_withContent = __commonJS({
  "../../node_modules/itty-router-extras/middleware/withContent.js"(exports, module) {
    var withContent = async (t) => {
      let n = t.headers.get("content-type");
      t.content = void 0;
      try {
        n && n.includes("application/json") && (t.content = await t.json());
      } catch (t2) {
      }
    };
    module.exports = { withContent };
  }
});

// ../../node_modules/itty-router-extras/middleware/withCookies.js
var require_withCookies = __commonJS({
  "../../node_modules/itty-router-extras/middleware/withCookies.js"(exports, module) {
    var withCookies = (o) => {
      o.cookies = {};
      try {
        o.cookies = (o.headers.get("Cookie") || "").split(/;\s*/).map((o2) => o2.split(/=(.+)/)).reduce((o2, [e2, i]) => (o2[e2] = i, o2), {});
      } catch (o2) {
      }
    };
    module.exports = { withCookies };
  }
});

// ../../node_modules/itty-router-extras/middleware/withParams.js
var require_withParams = __commonJS({
  "../../node_modules/itty-router-extras/middleware/withParams.js"(exports, module) {
    var withParams = (a) => {
      for (const s in a.params || {})
        a[s] = a.params[s];
    };
    module.exports = { withParams };
  }
});

// ../../node_modules/itty-router-extras/middleware/index.js
var require_middleware = __commonJS({
  "../../node_modules/itty-router-extras/middleware/index.js"(exports, module) {
    module.exports = { ...require_withContent(), ...require_withCookies(), ...require_withParams() };
  }
});

// ../../node_modules/itty-router-extras/response/createResponseType.js
var require_createResponseType = __commonJS({
  "../../node_modules/itty-router-extras/response/createResponseType.js"(exports, module) {
    var createResponseType = (e2 = "text/plain; charset=utf-8") => (s, t = {}) => {
      const { headers: n = {}, ...o } = t;
      return "object" == typeof s ? new Response(JSON.stringify(s), { headers: { "Content-Type": e2, ...n }, ...o }) : new Response(s, t);
    };
    module.exports = { createResponseType };
  }
});

// ../../node_modules/itty-router-extras/response/json.js
var require_json = __commonJS({
  "../../node_modules/itty-router-extras/response/json.js"(exports, module) {
    var { createResponseType } = require_createResponseType();
    var json2 = createResponseType("application/json; charset=utf-8");
    module.exports = { json: json2 };
  }
});

// ../../node_modules/itty-router-extras/response/error.js
var require_error = __commonJS({
  "../../node_modules/itty-router-extras/response/error.js"(exports, module) {
    var { json: json2 } = require_json();
    var error2 = (r = 500, o = "Internal Server Error.") => json2({ ..."object" == typeof o ? o : { status: r, error: o } }, { status: r });
    module.exports = { error: error2 };
  }
});

// ../../node_modules/itty-router-extras/response/missing.js
var require_missing = __commonJS({
  "../../node_modules/itty-router-extras/response/missing.js"(exports, module) {
    var { error: error2 } = require_error();
    var missing2 = (r = "Not found.") => error2(404, r);
    module.exports = { missing: missing2 };
  }
});

// ../../node_modules/itty-router-extras/response/status.js
var require_status = __commonJS({
  "../../node_modules/itty-router-extras/response/status.js"(exports, module) {
    var { json: json2 } = require_json();
    var status = (s, t) => t ? json2({ ..."object" == typeof t ? t : { status: s, message: t } }, { status: s }) : new Response(null, { status: s });
    module.exports = { status };
  }
});

// ../../node_modules/itty-router-extras/response/text.js
var require_text = __commonJS({
  "../../node_modules/itty-router-extras/response/text.js"(exports, module) {
    var text = (e2, t = {}) => new Response(e2, t);
    module.exports = { text };
  }
});

// ../../node_modules/itty-router-extras/response/index.js
var require_response = __commonJS({
  "../../node_modules/itty-router-extras/response/index.js"(exports, module) {
    module.exports = { ...require_error(), ...require_json(), ...require_missing(), ...require_status(), ...require_text() };
  }
});

// ../../node_modules/itty-router/dist/itty-router.js
var require_itty_router = __commonJS({
  "../../node_modules/itty-router/dist/itty-router.js"(exports) {
    "use strict";
    exports.Router = ({ base: e2 = "", routes: r = [] } = {}) => ({ __proto__: new Proxy({}, { get: (a, o, t) => (a2, ...p2) => r.push([o.toUpperCase(), RegExp(`^${(e2 + a2).replace(/(\/?)\*/g, "($1.*)?").replace(/(\/$)|((?<=\/)\/)/, "").replace(/(:(\w+)\+)/, "(?<$2>.*)").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), p2]) && t }), routes: r, async handle(e3, ...a) {
      let o, t, p2 = new URL(e3.url), l = e3.query = {};
      for (let [e4, r2] of p2.searchParams)
        l[e4] = void 0 === l[e4] ? r2 : [l[e4], r2].flat();
      for (let [l2, s, c] of r)
        if ((l2 === e3.method || "ALL" === l2) && (t = p2.pathname.match(s))) {
          e3.params = t.groups || {};
          for (let r2 of c)
            if (void 0 !== (o = await r2(e3.proxy || e3, ...a)))
              return o;
        }
    } });
  }
});

// ../../node_modules/itty-router-extras/router/ThrowableRouter.js
var require_ThrowableRouter = __commonJS({
  "../../node_modules/itty-router-extras/router/ThrowableRouter.js"(exports, module) {
    "use strict";
    var { Router } = require_itty_router();
    var { error: error2 } = require_response();
    var ThrowableRouter = (r = {}) => {
      const { stack: e2 = false } = r;
      return new Proxy(Router(r), { get: (r2, t) => (...o) => "handle" === t ? r2[t](...o).catch((r3) => error2(r3.status || 500, { status: r3.status || 500, error: r3.message, stack: e2 && r3.stack || void 0 })) : r2[t](...o) });
    };
    module.exports = { ThrowableRouter };
  }
});

// ../../node_modules/itty-router-extras/router/index.js
var require_router = __commonJS({
  "../../node_modules/itty-router-extras/router/index.js"(exports, module) {
    module.exports = { ...require_ThrowableRouter() };
  }
});

// ../../node_modules/itty-router-extras/classes/StatusError.js
var require_StatusError = __commonJS({
  "../../node_modules/itty-router-extras/classes/StatusError.js"(exports, module) {
    var StatusError = class extends Error {
      constructor(r = 500, t = "Internal Error.") {
        super(t), this.name = "StatusError", this.status = r;
      }
    };
    module.exports = { StatusError };
  }
});

// ../../node_modules/itty-router-extras/classes/index.js
var require_classes = __commonJS({
  "../../node_modules/itty-router-extras/classes/index.js"(exports, module) {
    module.exports = { ...require_StatusError() };
  }
});

// ../../node_modules/itty-router-extras/index.js
var require_itty_router_extras = __commonJS({
  "../../node_modules/itty-router-extras/index.js"(exports, module) {
    module.exports = { ...require_middleware(), ...require_response(), ...require_router(), ...require_classes() };
  }
});

// ../../node_modules/itty-router/dist/itty-router.mjs
var e = ({ base: e2 = "", routes: r = [] } = {}) => ({ __proto__: new Proxy({}, { get: (a, o, t) => (a2, ...p2) => r.push([o.toUpperCase(), RegExp(`^${(e2 + a2).replace(/(\/?)\*/g, "($1.*)?").replace(/(\/$)|((?<=\/)\/)/, "").replace(/(:(\w+)\+)/, "(?<$2>.*)").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), p2]) && t }), routes: r, async handle(e3, ...a) {
  let o, t, p2 = new URL(e3.url), l = e3.query = {};
  for (let [e4, r2] of p2.searchParams)
    l[e4] = void 0 === l[e4] ? r2 : [l[e4], r2].flat();
  for (let [l2, s, c] of r)
    if ((l2 === e3.method || "ALL" === l2) && (t = p2.pathname.match(s))) {
      e3.params = t.groups || {};
      for (let r2 of c)
        if (void 0 !== (o = await r2(e3.proxy || e3, ...a)))
          return o;
    }
} });

// src/index.ts
var import_itty_router_extras = __toESM(require_itty_router_extras());

// ../../node_modules/itty-cors/dist/itty-cors.mjs
var p = (a = {}) => {
  let { origins: i = ["*"], maxAge: c, methods: l = ["GET"], headers: h = {} } = a, n, t = { "content-type": "application/json", "Access-Control-Allow-Methods": l.join(", "), ...h };
  return c && (t["Access-Control-Max-Age"] = c), { corsify: (e2) => {
    if (!e2)
      throw new Error("No fetch handler responded and no upstream to proxy to specified.");
    let { headers: o, status: s, body: r } = e2;
    if (s === 101)
      return e2;
    let d = Object.fromEntries(o);
    return d["access-control-allow-origin"] || [301, 302, 308].includes(s) ? e2 : new Response(r, { status: s, headers: { ...d, ...t, ...n, "content-type": o.get("content-type") } });
  }, preflight: (e2) => {
    let o = [.../* @__PURE__ */ new Set(["OPTIONS", ...l])], s = e2.headers.get("origin");
    if (n = (i.includes(s) || i.includes("*")) && { "Access-Control-Allow-Origin": s }, e2.method === "OPTIONS") {
      if (e2.headers.get("Origin") !== null && e2.headers.get("Access-Control-Request-Method") !== null && e2.headers.get("Access-Control-Request-Headers") !== null) {
        let r = { ...t, "Access-Control-Allow-Methods": o.join(", "), "Access-Control-Allow-Headers": e2.headers.get("Access-Control-Request-Headers"), ...n };
        return new Response(null, { headers: r });
      }
      return new Response(null, { headers: { Allow: o.join(", ") } });
    }
  } };
};

// src/index.ts
var src_default = {
  async fetch(request, env, ctx) {
    console.log("000fetch", request.url);
    const url = new URL(request.url);
    const slug = url.pathname.split("/")[1];
    const path = url.pathname.split("/").slice(2).join("/");
    console.log("010fetch", slug, path);
    const { preflight, corsify } = p({
      methods: ["GET", "POST", "DELETE", "PUT"],
      origins: ["*"],
      maxAge: 3600,
      headers: {
        "my-custom-header": "geoff was here"
      }
    });
    const router = e();
    router.all("*", preflight).all("/api/*", async (request2) => {
      console.log("001fetch", request2.url);
      let innerResponse = await fetch(env.THRIVAPI_USER_BASE_URL + path, request2);
      console.log("002fetch", innerResponse);
      let res = new Response(innerResponse.body, innerResponse);
      console.log("003fetch", res);
      return res;
    }).all("/admin/*", async (request2) => {
      let innerResponse = await fetch(env.THRIVAPI_ADMIN_BASE_URL + path, request2);
      let res = new Response(innerResponse.body, innerResponse);
      return res;
    }).get("/", async () => {
      console.log("004fetch");
      return `Try making requests to:
				<ul>
				<li><code><a href="/redirect?redirectUrl=https://example.com/">/redirect?redirectUrl=https://example.com/</a></code>,</li>
				<li><code><a href="/proxy?modify&proxyUrl=https://example.com/">/proxy?modify&proxyUrl=https://example.com/</a></code>, or</li>
				<li><code><a href="/api/todos">/api/todos</a></code></li>`;
    }).all("*", () => {
      (0, import_itty_router_extras.missing)("Try making requests to <code>/api/</code>");
    });
    return router.handle(request).then(corsify);
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
