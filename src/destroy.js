const shell = require('shelljs');
const chalk = require('chalk')

module.exports = () => {
  console.log(chalk.green('--- destroy ---'))
  console.log(`Destroying the function...`)
  const currentDir = shell.pwd().stdout

  if (shell.test('-f', `${currentDir}/.kubefn/blueprint-fn-base/devops/kubectl-config.yaml`)) {
    console.log('Found already a kubectl-config.yaml. Using that for deletion...')
    shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run destroy-kubectl-config`)
    return
  }

  console.log('Not found already a kubectl-config.yaml, creating one...')
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run create-kubectl-config`)
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run destroy-kubectl-config`)
}
