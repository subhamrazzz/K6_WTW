(() => {
  "use strict";
  var e = {
      n: (t) => {
        var s = t && t.__esModule ? () => t.default : () => t;
        return e.d(s, { a: s }), s;
      },
      d: (t, s) => {
        for (var o in s)
          e.o(s, o) &&
            !e.o(t, o) &&
            Object.defineProperty(t, o, { enumerable: !0, get: s[o] });
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
      r: (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      },
    },
    t = {};
  e.r(t),
    e.d(t, {
      default: () => g,
      options: () => p,
      setup: () => c,
      teardown: () => f,
    });
  const s = require("k6/http");
  var o = e.n(s);
  const r = require("k6"),
    n = require("k6/metrics"),
    a = new n.Trend("GetApi_ResponsTime"),
    i = new n.Counter("GetApi_successes"),
    u = new n.Gauge("ResponseSize"),
    d = "http://jsonplaceholder.typicode.com",
    l = __ENV.SCENARIO || "simple_load";
  let p = {
    scenarios: {
      [l]: {
        stress_load: { executor: "constant-vus", vus: 4, duration: "20s" },
        ramping_load: {
          executor: "ramping-vus",
          startVUs: 1,
          stages: [
            { duration: "10s", target: 5 },
            { duration: "20s", target: 5 },
            { duration: "10s", target: 0 },
          ],
        },
        simple_load: {
          executor: "per-vu-iterations",
          vus: 1,
          iterations: 10,
          startTime: "2s",
        },
      }[l],
    },
    thresholds: {
      http_req_failed: ["rate<0.01"],
      http_req_duration: ["p(95)<400"],
      ResponseSize: ["value<28000"],
    },
  };
  function c() {
    console.log(`Running scenario: ${l}`);
  }
  function g() {
    (0, r.group)("Get Call", function () {
      const e = o().get(`${d}/posts`);
      (0, r.check)(e, {
        "is status 200": (e) => 200 === e.status,
        "is not status 404": (e) => 404 !== e.status,
        "verify page text": (e) => e.body.includes("userId"),
      }),
        e
          .json()
          .filter((e) => 1 === e.userId)
          .map((e) => e.title),
        a.add(e.timings.duration),
        i.add(200 === e.status),
        u.add(e.body.length);
    });
  }
  function f(e) {
    console.log("Tearing down after the test.");
  }
  module.exports = t;
})();
