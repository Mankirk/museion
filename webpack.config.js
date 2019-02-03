const dev = process.env.NODE_ENV !== "production";
const webpack = require( "webpack" );
const path = require( "path" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new ExtractTextPlugin( {
        filename: "css/[name].bundle.css",
    } ),
];

if ( !dev ) {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new BundleAnalyzerPlugin( {
            analyzerMode: "static",
            reportFilename: "webpack-report.html",
            openAnalyzer: false,
        } )
    );
}

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join( __dirname, "src" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "app.js",
        lib: [ "react", "react-dom" ],
    },
    resolve: {
        modules: [ path.resolve( "./src" ), "node_modules" ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract( {
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                                autoprefixer: false,
                                minimize: true,
                                // sourceMap: true
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                // sourceMap: true
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // sourceMap: true,
                                includePaths: [ "styles" ],
                            },
                        },
                    ],
                    fallback: "style-loader",
                } ),
            },
        ],
    },
    output: {
        path: path.resolve( __dirname, "public" ),
        filename: "js/[name].bundle.js",
        // publicPath: path.resolve( __dirname, "public" ),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: Infinity,
                    name: "lib",
                    enforce: true,
                },
            },
        },
    },
    plugins,
    devServer: {
        historyApiFallback: true,
    },
};
