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
            }]
        },
        performance: {
            hints: "warning",
            maxAssetSize: isProduction ? 350000 : 13500000,
            maxEntrypointSize: isProduction ? 350000 : 13500000
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