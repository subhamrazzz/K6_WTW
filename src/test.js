import http from "k6/http";
import { check, group, sleep } from "k6";
import { Trend, Counter, Gauge } from "k6/metrics";
import { scenarios } from "./scenarios.js"; // Importing scenarios from the scenarios.js file

//Custom metric
const myTrend = new Trend("GetApi_ResponsTime"); // custom metric to track response time
const successCounter = new Counter("GetApi_successes");
const gaugeResponseSize = new Gauge("ResponseSize");

// Base URL
const baseUrl = "http://jsonplaceholder.typicode.com";

//Loading opted test scenario
const scenarioName = __ENV.SCENARIO || "simple_load"; // Default to 'simple_load' if not specified in command line argument

export let options = {
  scenarios: {
    [scenarioName]: scenarios[scenarioName],
  },
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<400"], // 95% of requests should be below 400ms
    ResponseSize: ["value<28000"], // Response content size less that bytes
  },
  //minIterationDuration: '10s',
};

//Setup function
export function setup() {
  console.log(`Running scenario: ${scenarioName}`);
}

export default function () {
  group("Get Call", function () {
    const res = http.get(`${baseUrl}/posts`);

    // Checks on the response
    check(res, {
      "is status 200": (r) => r.status === 200,
      "is status not 404": (r) => r.status !== 404,
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
    gaugeResponseSize.add(res.body.length); // custom guage metric
  });
}

//Teardown function
export function teardown(data) {
  console.log("Tearing down after the test.");
}
