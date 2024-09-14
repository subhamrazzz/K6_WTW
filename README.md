# K6 Performance Testing Setup

## Introduction

This repository provides setup guidelines for performance testing using the K6 framework. The setup includes managing dependencies with npm, bundling K6 scripts using Webpack, and automating tests with GitHub Actions.

**Contents**
The repository contains the following key components:

**src/test.js**
Entry Script: Contains K6 options, scenarios, and test logic. This script sets up multiple scenarios to simulate different user behaviors and includes custom metrics and thresholds.You can customize the script as per your requirement.

**webpack.config.js**
Webpack Configuration: To Bundles the K6 scripts. It specifies the entry and output files, and targets the Node.js environment.

**dist/ Folder**
Contains the output of the Webpack bundling process. The bundled K6 script is placed here, and it is what you will run with K6.
Contents:
test.bundle.js: The bundled JavaScript file that K6 will execute.

**package.json**
Defines the project metadata, dependencies, and scripts. It includes configurations for the project, such as the project name, version, and scripts for building and testing.

**.github/workflows/k6-test.yml**
GitHub Actions Workflow: Automates the testing process. Includes steps for installing dependencies, setting up K6, and executing test, whenever a new change is pushed in the repo or a new PR is merged.

## Running Locally ( Prerequisite: Should have a stable version of node.js pre-installed)

1. **Clone the Repository**

   git clone https://github.com/subhamrazzz/K6_WTW.git

2. **Navigate to the Directory**

   cd K6_WTW

3. **Install Dependencies**

   npm install

4. **Build the K6 Test Script**

   npm run build

5. **Run the Tests**

   npm test

## Troubleshooting

**Webpack Issues:**
**Module not found: Error: Can't resolve 'k6'**

If you encounter issues with module resolution while trying to bundle your K6 script with Webpack, try following:
Add following code in your "webpack.config.js"

externals: {
'k6/http': 'commonjs k6/http',
'k6': 'commonjs k6',
'k6/metrics': 'commonjs k6/metrics',
},

This configuration tells Webpack not to bundle K6 modules but to treat them as external dependencies that K6 will provide at runtime.

**K6 Not Found:**
Ensure K6 is properly installed in the GitHub Actions environment.
I tried putting it in package.json dependencies but it doesn't seems to get installed in the Github Actions runner through "npm install".
To solve this issue I have added an extra step in ".github/workflows/k6-test.yml" to additionally install K6 after npm install is finished.
Make sure to modify the K6 installation commands according to the runner type you are using (e.g., Windows, macOS, etc.).
