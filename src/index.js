#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const boostrap = require('./bootstrap')
const compile = require('./compile')
const run = require('./run')
const build = require('./build')

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
      return build(argv.semver_increment)
    }
    console.log(`Please choose between 'patch', 'minor', 'major' or leave the field empty`)
  })
  .command('update', '...', (yargs) => {
    return yargs
  }, () => {
    console.log('not implemented yet')
  })
  .command('rollback', '...', (yargs) => {
    return yargs
  }, () => {
    console.log('not implemented yet')
  })
  .demandCommand()
  .parse()
