const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { resolve } = require("path");

const development = process.env.NODE_ENV === "development";

const options = {
  optimization: development
    ? undefined
    : {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
  devtool: development ? "inline-source-maps" : "source-map",
  entry: resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: development
          ? { transpileOnly: true, experimentalWatchApi: true }
          : {},
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          development ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: development ? "[name].css" : "[name].[hash].css",
      chunkFilename: development ? "[id].css" : "[id].[hash].css"
    }),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, "src/index.html")
    })
  ]
};

module.exports = options;
