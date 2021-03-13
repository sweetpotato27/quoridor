const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        gameview: './src/game_view.js',
        game: './src/game.js',
        board: './src/board.js',
        square: './src/square.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Quoridor',
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    module:{
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader',],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};

//module chains are executed in reverse order