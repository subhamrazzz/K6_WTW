import http from "k6/http";
import { check, group, sleep } from "k6";
import { Trend } from "k6/metrics";

const myTrend = new Trend("GetApi_ResponsTime");

// Define options
export let options = {
  // scenarios: {
  //   my_api_scenario: {
  //     executor: "ramping-vus",
  //     startVUs: 0,
  //     stages: [
  //       { duration: "10s", target: 5 },
  //       { duration: "40s", target: 5 },
  //     ],
  //     gracefulRampDown: "10s",
  //   },
  // },

  duration: "20s",
  vus: 4,

  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<50"], // 95% of requests should be below 200ms
  },
};

export function setup() {
  console.log("This is in setup function");
}

export default function () {
  group("Get Calls", function () {
    const res = http.get("https://jsonplaceholder.typicode.com/posts");

    // checks on the respose - Assertions
    check(res, {
      "is status 200": (r) => r.status === 200,
      "is not status 404": (r) => r.status !== 404,
      "verify page text": (r) => r.body.includes("userId"),
    });

    let token = res.json().Token; // simple correlation example

    myTrend.add(res.timings.duration); // adding custom metric
  });
}

export function teardown(data) {
  console.log("this is tear down function");
}
