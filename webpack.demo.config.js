const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    cache: true,
    entry: {
        polyfills: "./demo/src/polyfills.ts",
        main: "./demo/src/main.ts"
    },
    output: {
        path: __dirname + '/demo/dist',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    devtool: 'eval',
    devServer: {
        port: 9000,
        host: "0.0.0.0",
        disableHostCheck: true,
        historyApiFallback: true
    },
    stats: {
        warningsFilter: [/System.import/, /Critical dependency/]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ["ts-loader", "angular-router-loader"]
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
            },
            {
                test: /\.less$/,
                use: ["to-string-loader", "css-loader", "less-loader"]
            }, {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './demo/src/index.html'
        })
    ]
};
