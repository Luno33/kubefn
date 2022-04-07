const shell = require('shelljs');
const chalk = require('chalk')
const path = require('path');
const fs = require('fs')

const pathBlueprints = __dirname + '/../blueprints'

module.exports = (functionName) => {
  console.log(chalk.green('--- bootstrap ---'))
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
  const packageJsonBlueprint = require(`${pathBlueprints}/blueprint-fn-logic/package.json`)
  packageJsonBlueprint.name = functionName
  fs.writeFileSync(`${currentDir}/${functionName}/package.json`, JSON.stringify(packageJsonBlueprint, null, 2))
  shell.cp('-R', `${pathBlueprints}/blueprint-fn-logic/index.js`, `${currentDir}/${functionName}/src/index.js`)
}
