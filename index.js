
if (process.env.DEVELOPMENT) {
  var webpack = require('webpack');
  var webpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.dev.config.js');
  require('ts-node').register();
  var app = require('./src/App.ts').default;
  new webpackDevServer(webpack(config), config.devServer).listen((parseInt(process.env.PORT) + 1 )|| 3001, function () {
    console.log('webpack server run at ' + ((parseInt(process.env.PORT) + 1 )|| 3001));
  });
  app.listen(process.env.PORT || 3000, function () {
    console.log('App is running');
  });
}
else {

}



