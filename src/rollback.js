const shell = require('shelljs');
const chalk = require('chalk')

module.exports = (semver) => {
  console.log(chalk.green('--- rollback ---'))
  const currentDir = shell.pwd().stdout

  const packageJsonBlueprint = require(`${currentDir}/.kubefn/blueprint-fn-base/package.json`)

  console.log(`Rollback to ${chalk.green(packageJsonBlueprint.name)}:${chalk.green(semver)}...`)
  shell.exec(`KUBEFN_SEMVER_ROLLBACK=${semver} npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run rollback`)
}
