import webpack from "webpack";
import path from "path";

let glob = require('glob');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let manifestPlugin = require('webpack-manifest-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { url: false }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ["./src/sass", "./node_modules"]
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?name=/[hash].[ext]"
            },
            {test: /\.json$/, loader: "json-loader"},
            {
                loader: "babel-loader",
                test: /\.js?$/,
                exclude: /node_modules/,
                query: {cacheDirectory: true}
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            "fetch": "imports-loader?this=>global!exports?global.fetch!whatwg-fetch"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new CleanWebpackPlugin(["dist"], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ["img"]
        }),
        new manifestPlugin({
            fileName: "../site/data/manifest.json",
        }),
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, "site/layouts/**/*.html")),
            minimize: true,
            purifyOptions: {
                whitelist: ["*dots*"]
            }
        }),
    ],
    context: path.join(__dirname, "src"),
    entry: {
        app: ["./js/app", "./sass/style.scss"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].[chunkhash].js"
    },
    externals:  [/^vendor\/.+\.js$/]
};

module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
)
