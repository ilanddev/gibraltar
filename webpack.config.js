var webpack = require('webpack'),
    path = require('path'),
    yargs = require('yargs');

var libraryName = 'gibraltar',
    outputFile;

var plugins = [];

if (yargs.argv.p) {
  plugins.push(new DtsBundlePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  outputFile = libraryName + ".min.js";
} else {
  outputFile = libraryName + ".js";
}

var config = {
  entry: './src/gibraltar.ts',
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'build'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    "iland-sdk": {
      commonjs: "iland-sdk",
      commonjs2: "iland-sdk",
      amd: "iland-sdk",
      root: "iland-sdk"
    },
    "paper": {
      commonjs: "paper",
      commonjs2: "paper",
      amd: "paper",
      root: "paper"
    }
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /.*?node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          outputPath: 'assets/'
        }
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          outputPath: 'assets/'
        }
      }
    ]
  },
  plugins: plugins
};

module.exports = config;

function DtsBundlePlugin() {
}

DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    var dts = require('dts-bundle');

    dts.bundle({
      name: libraryName,
      main: 'build/build/src/gibraltar.d.ts',
      out: '../../gibraltar.d.ts',
      removeSource: true,
      outputAsModuleFolder: true
    });
  });
};
