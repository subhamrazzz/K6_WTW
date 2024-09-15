import http from "k6/http";
import { check, group, sleep } from "k6";
import { Trend, Counter, Gauge } from "k6/metrics";

//Custom metric
const myTrend = new Trend("GetApi_ResponsTime"); // custom metric to track response time
const successCounter = new Counter("GetApi_successes");
const GaugeResponseSize = new Gauge("ResponseSize");

// Base URL for the API
const baseUrl = "http://jsonplaceholder.typicode.com";

// Defining scenarios
const scenarios = {
  stress_load: {
    executor: "constant-vus",
    vus: 4,
    duration: "20s",
  },
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
};

const scenarioName = __ENV.SCENARIO || "simple_load"; // Default to 'simple_load' if not specified in command line argument

export let options = {
  scenarios: {
    [scenarioName]: scenarios[scenarioName],
  },
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 500ms
    ResponseSize: ["value<4000"], // Response content size less that bytes
  },
};

export function setup() {
  console.log(`Running scenario: ${scenarioName}`);
}

export default function () {
  group("Get Call", function () {
    const res = http.get(`${baseUrl}/posts`);

    // Checks on the response
    check(res, {
      "is status 200": (r) => r.status === 200,
      "is not status 404": (r) => r.status !== 404,
      "verify page text": (r) => r.body.includes("userId"),
    });

    const data = res.json();

    // Filter the data where userId is 1 and extract the titles ( Correlation example)
    const titles = data
      .filter((item) => item.userId === 1)
      .map((item) => item.title);

    //console.log("Titles:", titles);
    //const FirstTitle = titles[0];
    //console.log("FirstTitle:", FirstTitle);

    myTrend.add(res.timings.duration); // custom trend metric
    successCounter.add(res.status === 200); //custom counter metric
    GaugeResponseSize.add(res.body.length); // custom guage metric
  });
}

export function teardown(data) {
  console.log("Tearing down after the test.");
}
