const shell = require('shelljs');
const chalk = require('chalk')

module.exports = () => {
  console.log(chalk.green('--- update ---'))
  const currentDir = shell.pwd().stdout

  const packageJsonBlueprint = require(`${currentDir}/.kubefn/blueprint-fn-base/package.json`)

  console.log(`Updating the function ${chalk.green(packageJsonBlueprint.name)}:${chalk.green(packageJsonBlueprint.version)}...`)
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run update`)
}