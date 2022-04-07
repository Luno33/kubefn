#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const boostrap = require('./bootstrap')
const compile = require('./compile')
const run = require('./run')
const build = require('./build')
const deploy = require('./deploy')
const destroy = require('./destroy')
const update = require('./update')

yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command('bootstrap <name>', 'create the function with name [name]', (yargs) => {
    return yargs
      .positional('name', {
        describe: 'name of your function',
        type: 'string'
      })
  }, (argv) => {
    boostrap(argv.name)
  })
  .command('compile', 'copy your ./src folder in the blueprint under ./.kubefn', (yargs) => {
    return yargs
  }, () => {
    compile()
  })
  .command('run', 'run locally your code in an expressjs server', (yargs) => {
    return yargs
  }, () => {
    compile()
    run()
  })
  .command('build [semver_increment]', 'build your code in a docker image on the image registry', (yargs) => {
    return yargs
      .positional('semver_increment', {
        describe: `version increase of your code. Choose between 'patch', 'minor', 'major'`,
        type: 'string',
        default: 'patch'
      })
  }, (argv) => {
    if (['patch', 'minor', 'major'].includes(argv.semver_increment)) {
      compile()
      return build(argv.semver_increment)
    }
    console.log(`Please choose between 'patch', 'minor', 'major' or leave the field empty`)
  })
  .command('deploy [semver_increment]', 'build and deploy your code on your kubernetes cluster. If you do not specify the semver_increment parameter, you will deploy the last built version', (yargs) => {
    return yargs
      .positional('semver_increment', {
        describe: `optional version increase of your code. Choose between 'patch', 'minor', 'major'. If none it will be deployed the last built version`,
        type: 'string',
        default: ''
      })
  }, (argv) => {
    if (argv.semver_increment === '') {
      return deploy()
    }
    if (['patch', 'minor', 'major'].includes(argv.semver_increment)) {
      compile()
      build(argv.semver_increment)
      return deploy()
    }
    console.log(`Please choose between 'patch', 'minor', 'major' or leave the field empty to deploy the last built version`)
  })
  .command('update [semver_increment]', 'build and update your code on your kubernetes cluster. If you do not specify the semver_increment parameter, you will deploy the last built version', (yargs) => {
    return yargs
      .positional('semver_increment', {
        describe: `optional version increase of your code. Choose between 'patch', 'minor', 'major'. If none it will be deployed the last built version`,
        type: 'string',
        default: ''
      })
  }, (argv) => {
    if (argv.semver_increment === '') {
      return update()
    }
    if (['patch', 'minor', 'major'].includes(argv.semver_increment)) {
      compile()
      build(argv.semver_increment)
      return update()
    }
    console.log(`Please choose between 'patch', 'minor', 'major' or leave the field empty to deploy the last built version`)
  })
  .command('destroy', 'delete your function from kubernetes', (yargs) => {
    return yargs
  }, () => {
    compile()
    destroy()
  })
  .command('rollback', '...', (yargs) => {
    return yargs
  }, () => {
    console.log('not implemented yet')
  })
  .demandCommand()
  .parse()
