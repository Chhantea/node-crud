module.exports = options => {
    return {
        mode: "none",
        entry: './frontSide/react/demo.js',
        output: {
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
     }

};