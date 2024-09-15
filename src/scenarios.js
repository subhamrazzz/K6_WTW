export const scenarios = {
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
