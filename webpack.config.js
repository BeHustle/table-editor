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
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: [
        {
          loader: `file-loader`,
          options: {
            name: `img/[name].[ext]`,
          }
        },
        {
          loader: `image-webpack-loader`,
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: `70-90`,
              speed: 3
            },
            gifsicle: {
              interlaced: false,
            },
            svgo: {
              enabled: false,
            }
          }
        }
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
