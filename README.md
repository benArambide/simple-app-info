# Simple App Info - Webpack PLugin
This is a simple webpack plugin to generate a json file with your app information in compilation time

## Installation

```
npm i simple-app-info-webpack-plugin
```


## Usage
This example is in vue project.
Import the plugin in your `vue.config.js` file.

```js
const SimpleAppInfoWebpackPlugin = require('simple-app-info-webpack-plugin')

module.exports = {
  ...,
  configureWebpack: {
    plugins: [
        new SimpleAppInfoWebpackPlugin({
          appInfoFileName: 'my.app.info.json'
        })
      ] 
  } 
}
```

And the plugin will generate a 'my.app.info.json' file with the metadata information

Example.
```json
{
    "appName": "my-package-json-project-name",
    "appVersion": "0.1.0",
    "appBuildTimestamp": "2020/02/02 00:00:00",
    "appBranchName": "[Current git branch name]",
    "appLastCommitHash": "[last git commit hash]"
}
```

We recommend include the metadata json in your .gitignore file 
