var webpack = require('webpack');
var path = require('path');

var libraryName = 'skPlayer';
var env = process.env.WEBPACK_ENV;
var DEV_PATH = path.resolve(__dirname,'src');
var BUILD_PATH = path.resolve(__dirname,'dist');

var plugins = [
    new webpack.BannerPlugin('SKPlayer')
];
if(env === 'build'){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap:true
        })
    );
}

module.exports = {
    entry: './src/' + libraryName + '.js',
    output: {
        filename: libraryName + '.min.js',
        path: BUILD_PATH,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: 'source-map',
    devServer: {
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: DEV_PATH,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                include: DEV_PATH,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: plugins
};