const shell = require('shelljs');
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  console.log(chalk.green('--- deploy ---'))
  console.log(`Deploying the function...`)
  const currentDir = shell.pwd().stdout
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run create-kubectl-config`)
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run deploy-kubectl-config`)

  console.log(`\nDeployed Kubernetes configuration: ${chalk.green(`${currentDir}/.kubefn/blueprint-fn-base/devops/kubectl-config.yaml`)}`)

  console.log(chalk.green('\n ---> Remember to expose your function through your kubernetes ingress <--- \n'))
}