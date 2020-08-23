var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  collecting() {
    this.log('method 1 just ran');
  }


  creating() {
    
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: 'Templating with Yeoman' }
    );

    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-transform-react-jsx',
      'mocha',
      'nyc',
      '@istanbuljs/nyc-config-babel',
      'babel-plugin-istanbul'
    ], { 'save-dev': true })

    // this.fs.copyTpl(
    //   this.templatePath('index.html'),
    //   this.destinationPath('public/index.html'),
    //   { title: 'Templating with Yeoman' }
    // );
  }
};