var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

process.env.HMRPORT = 8080;
module.exports = {
  entry: [
    'babel-polyfill',
    // 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    'webpack-dev-server/client?http://127.0.0.1:' + ((parseInt(process.env.PORT) + 1 )|| 3001),
    'webpack/hot/only-dev-server',
    './src/client/index.tsx'
  ],
  output: {
    libraryTarget: "var",
    path: path.join(__dirname, '/js'),
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules', 'shared'],
    extensions: ['','.js','.tsx', '.ts','.json', '.scss','.es6', '.babel', '.node']
  },
  externals: [
    'resolve-from'
          // /^(?!\.|\/).+/i,
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    
  },
  module: {
    // noParse:[ /\/typedjson\/js/,],
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass"
        // loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass"
      },
      {
        exclude: /node_modules/,
        test: /\.nomodscss$/,
        loader: "style!css!postcss-loader!sass"
      },
      {
        test: /\.css$/,
        loader: "style!css!postcss-loader!sass"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel', 'ts-loader']
      },
      {
        test:/\.jpg$/,
        exclude:/node_modules/,
        loaders:['file-loader']
      },
      {
        test:/\.png$/,
        exclude:/node_modules/,
        loaders:['file-loader']
      },
      { test: /\.node$/, loader: 'node' },
      // { test: /tests/, loaders: ['ignore'] }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 5 versions']
    })
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env":{
        DEVELOPMENT:true,
        BROWSER: JSON.stringify(true)
      }
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    publicPath: '/js/',
    stats: 'errors-only',
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    host: '127.0.0.1'
  }
};
