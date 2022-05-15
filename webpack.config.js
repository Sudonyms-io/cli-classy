const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    devtool: 'source-map',
    externals: [nodeExternals()], // removes node_modules from your final bundle
    entry: {
        "index": "./build/index.js"
    }, // make sure this matches the main root of your code 
    output: {
        path: path.join(__dirname, 'lib'), // this can be any path and directory you want
        filename: '[name].js',
        library: {
            type: "commonjs"
        }
    },
    optimization: {
        minimize: true, // enabling this reduces file size and readability
    },
};