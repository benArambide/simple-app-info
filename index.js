const writeJsonFile = require('write-json-file')
const path = require('path')
const packageInfo = require(path.resolve('package.json'))
const git = require('git-last-commit')
const timestamp = require('time-stamp')
const validateOptions = require('schema-utils')

const NOT_FOUND = 'Not found'

const onGetCommit = fileName => (err, commit) => {

  const info = {
    appName: packageInfo.name,
    appVersion: packageInfo.version,
    appMainFile: packageInfo.main,
    appBuildTimestamp: timestamp('YYYY/MM/DD HH:mm:ss'),
    appBranchName: !err ? commit.branch : NOT_FOUND,
    appLastCommitHash: !err ? commit.hash : NOT_FOUND
  }
  writeJsonFile.sync(path.resolve(fileName), info, { indent: '  ' })
  console.log('[App Info File Generated!]')
}

const schema = {
  type: 'object',
  properties: {
    appInfoFileName: {
      type: 'string'
    }
  }
};

class SimpleAppInfoWebpackPlugin {
  constructor (options = {}) {
    validateOptions(schema, options, 'SimpleAppInfoWebpackPlugin')
    this.fileName = options.appInfoFileName || 'app.info.json'
  }

  apply (compiler) {
    compiler.hooks.entryOption.tap('AppInfoWebpackPlugin', () => {
      console.log('[Executing App Info]')
      git.getLastCommit(onGetCommit(this.fileName))
    })
  }
}

module.exports = SimpleAppInfoWebpackPlugin