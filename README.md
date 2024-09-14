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

## Github actions CI Pipeline

**Overview**

The CI pipeline is configured using GitHub Actions to automate the build and test processes for this project. It ensures that tests are executed automatically on code changes.

## COntent and usage

- **Trigger**: The workflow is triggered on `push` and `pull_request` events to the `master` branch. This means the CI pipeline runs whenever changes are pushed to the `master` branch or when a pull request targeting `master` is created or updated.

- **Jobs**: The `build` job runs on the latest Ubuntu environment.

- **Steps**:

1. **Checkout code**: Uses `actions/checkout` to pull the repository code into the workflow.
2. **Set up Node.js**: Uses `actions/setup-node` to install the specified version of Node.js.
3. **Install dependencies**: Runs `npm install` to install the project dependencies defined in `package.json`.
4. **Install k6**: Installs K6 using commands specific to the Ubuntu runner.
5. **Build K6 script**: Executes `npm run build` to bundle the K6 script using Webpack.
6. **Run tests**: Runs `npm test` to execute the bundled K6 script and perform the performance tests.

## Troubleshooting

### Webpack Issues

**Error: Module not found: Can't resolve 'k6'**

If you encounter issues with module resolution while trying to bundle your K6 script with Webpack, try adding the following code to your `webpack.config.js`:

```javascript
externals: {
'k6/http': 'commonjs k6/http',
'k6': 'commonjs k6',
'k6/metrics': 'commonjs k6/metrics',
},

This configuration tells Webpack not to bundle K6 modules but to treat them as external dependencies that K6 will provide at runtime.



### K6 installation issue in GitHub Actions environment


Ensure K6 is properly installed in the GitHub Actions environment.
I tried putting it in package.json dependencies but it doesn't seems to get installed in the Github Actions runner through "npm install".
To solve this issue I have added an extra step in ".github/workflows/k6-test.yml" to additionally install K6 after npm install is finished.
Make sure to modify the K6 installation commands according to the runner type you are using (e.g., Windows, macOS, etc.).


```
