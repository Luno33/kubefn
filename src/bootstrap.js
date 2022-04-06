const shell = require('shelljs');
const path = require('path');

const pathBlueprints = __dirname + '/../blueprints'

module.exports = (functionName) => {
  console.log('Bootstrapping the project...')
  const currentDir = shell.pwd().stdout
  console.log(`Creating folder '${functionName}'...`)
  shell.mkdir('-p', `${currentDir}/${functionName}`)
  shell.mkdir('-p', `${currentDir}/${functionName}/.kubefn`)
  shell.mkdir('-p', `${currentDir}/${functionName}/src`)
  console.log(`Copy Kubernetes blueprint into '${functionName}/.kubefn'...`)
  shell.cp('-R', `${pathBlueprints}/blueprint-fn-base`, `${currentDir}/${functionName}/.kubefn`)
  shell.cp('-R', `${pathBlueprints}/blueprint-fn-logic/kubefn.config.js`, `${currentDir}/${functionName}/kubefn.config.js`)
  shell.cp('-R', `${pathBlueprints}/blueprint-fn-logic/.gitignore`, `${currentDir}/${functionName}/.gitignore`)
  shell.cp('-R', `${pathBlueprints}/blueprint-fn-logic/package.json`, `${currentDir}/${functionName}/package.json`)
  shell.cp('-R', `${pathBlueprints}/blueprint-fn-logic/index.js`, `${currentDir}/${functionName}/src/index.js`)
}
