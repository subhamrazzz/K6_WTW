const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/test.js",
  output: {
    filename: "test.bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2", // K6 expects a CommonJS module
  },
  target: "node", // Ensures the output is compatible with Node.js
  externals: {
    "k6/http": "commonjs k6/http",
    k6: "commonjs k6",
    "k6/metrics": "commonjs k6/metrics",
  },
};
