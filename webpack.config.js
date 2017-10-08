const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = require('./vendor_libs').vendor_libs;

const createConfig = (isDebug)=>{
    const devtool = isDebug ? 'eval-source-map' : 'source-map';//decide if sourcemaps should be used
    const plugins = [];

    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
        //filename: 'vendor.chuckjs'
    }));

    plugins.push(new HtmlWebpackPlugin({
        template: './src/html_template.html',
        filename: './index.html'
    }));

    const cssLoader = {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    };
    const sassLoader = {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    };

    const appEntry = ['./src/index.js'];

    if(!isDebug){
        plugins.push(new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}));
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        plugins.push(new ExtractTextPlugin('[name].css'));
        cssLoader.use = ExtractTextPlugin.extract({
            loader: 'css-loader'
        });

        sassLoader.use = ExtractTextPlugin.extract({
            loader: 'css-loader!sass-loader'
        });
    }

    return {
        devtool,
        entry:{
            bundle: appEntry,
            vendor: VENDOR_LIBS,
        },
        output: {
            path: path.join(__dirname, './public'),
            filename: isDebug ? '[name].js' : '[name].[chunkhash].js',
        },
        devServer: {
            historyApiFallback:{
                index:'./public/index.html'
            },
        },
        module: {
            rules: [
                {
                    use: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ttf|woff|eot|svg|woff2)/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {limit: 1024}
                        }
                    ]
                },
                cssLoader,
                sassLoader
            ]
        },
        resolve:{
            extensions: ['.js', '.jsx']
        },
        plugins
    };
};

module.exports = createConfig(true);
module.exports.amd = createConfig;