const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', 'css', 'scss' ],
    alias: {
      root: __dirname,
      lib: path.resolve(__dirname, 'lib'),
    },
  },
  devtool: 'inline-source-map',
  entry: './test/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'test'),
    compress: true,
    port: 9000
  }
};