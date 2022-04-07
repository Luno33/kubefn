const compile = require('./compile')
const shell = require('shelljs');
const chalk = require('chalk')
const fs = require('fs')

module.exports = (semverIncrement) => {
  console.log(chalk.green('--- build ---'))
  const currentDir = shell.pwd().stdout

  console.log('Incrementing the version')
  const version = shell.exec(`npm version ${semverIncrement}`).stdout.replace('v', '').replace('\n', '')
  // Here I'm using the output of npm version because by reading the package.json I get an outdated version

  const packageJsonBlueprint = require(`${currentDir}/.kubefn/blueprint-fn-base/package.json`)

  console.log(`Updating the new version (${version}) in the blueprint`)
  packageJsonBlueprint.version = version
  fs.writeFileSync(`${currentDir}/.kubefn/blueprint-fn-base/package.json`, JSON.stringify(packageJsonBlueprint, null, 2))

  console.log(`Building the function ${chalk.green(packageJsonBlueprint.name)}:${chalk.green(packageJsonBlueprint.version)}...`)
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run docker-all`)
}