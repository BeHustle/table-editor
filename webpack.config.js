const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  entry: `./src/js/index.js`,
  output: {
    filename: `js/bundle.js`,
    path: path.join(__dirname, `docs`),
  },
  devServer: {
    contentBase: path.join(__dirname, `src`),
    open: true,
    inline: true,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: `babel-loader`
      }
    }, {
      test: /\.(css|scss|sass)$/,
      use: [
        MiniCssExtractPlugin.loader,
        `css-loader`,
        `postcss-loader`,
        `sass-loader`
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `style/styles.min.css`
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: `./src/index.html`,
      filename: `index.html`
    })
  ],
  devtool: `source-map`,
};
