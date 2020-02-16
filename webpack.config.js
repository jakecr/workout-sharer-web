const path = require('path')

module.exports = (env) => {
    const isProduction = env === 'production'

    return {
        entry: './src/app.js',
        mode: isProduction ? 'production' : 'development',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            publicPath: '/dist/'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                        bypassOnDebug: true,
                        disable: true,
                        },
                    },
                ],
            }]
        },
        performance: {
            hints: "warning",
            maxAssetSize: 15000000,
            maxEntrypointSize: 15000000
        },
        devtool: isProduction ? 'source-map' : 'eval-cheap-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        },
        node: {
            fs: 'empty'
        }
    }
}