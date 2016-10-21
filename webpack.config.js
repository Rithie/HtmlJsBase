var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('debug', debug);

module.exports = {
    entry: {app: './js_source/app.js'},
    output: {
        path: './js_build/',
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ["es2015"]
            }
        }]
    },
    devtool: debug ? 'eval-source-map' : null,
    plugins: debug ? [] : [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};