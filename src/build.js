const shell = require('shelljs');
const compile = require('./compile')

module.exports = (semverIncrement) => {
  compile()
  console.log(`Building the function...`)
  const currentDir = shell.pwd().stdout
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run publish-${semverIncrement}`)
}