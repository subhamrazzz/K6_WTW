export const scenarios = {
  simple_load: {
    executor: "per-vu-iterations", // each VUs with complete defined number of iterations.
    vus: 1,
    iterations: 10,
    startTime: "2s",
  },

  ramping_load: {
    executor: "ramping-vus", // users with ramp-up and ramp-down based on defined scenario
    startVUs: 1,
    stages: [
      { duration: "10s", target: 5 },
      { duration: "20s", target: 5 },
      { duration: "10s", target: 0 },
    ],
  },

  stress_load: {
    executor: "constant-vus", // contant number of VUs will keep running for defined duration
    vus: 4,
    duration: "20s",
  },

  control_load: {
    executor: "externally-controlled", // can pause, resume and scale load test during runtime.
    vus: 3,
    maxVUs: 50,
    duration: "10m",
  },
};
