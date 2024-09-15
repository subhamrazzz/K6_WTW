export const scenarios = {
  simple_load: {
    executor: "per-vu-iterations", // each VUs will complete defined number of iterations.
    vus: 1,
    iterations: 10,
    startTime: "2s",
  },

  ramping_load: {
    executor: "ramping-vus", // users will ramp-up and ramp-down based on defined scenario
    startVUs: 1,
    stages: [
      { duration: "10s", target: 5 },
      { duration: "20s", target: 5 },
      { duration: "10s", target: 0 },
    ],
  },

  spike_load: {
    executor: "ramping-vus",
    startVUs: 1, // Start with 1 virtual user
    stages: [
      { duration: "10s", target: 1 }, // Ramp up to 1 VU
      { duration: "5s", target: 10 }, // Spike up to 10 VUs suddenly
      { duration: "15s", target: 10 }, // stay at 10 VUs for 15 seconds
      { duration: "10s", target: 1 }, // Ramp down to 1 VU
      { duration: "10s", target: 0 }, // Ramp down to 0 VUs
    ],
  },

  control_load: {
    executor: "externally-controlled", // can pause, resume and scale load test during runtime.
    vus: 3,
    maxVUs: 50,
    duration: "10m",
  },
};
