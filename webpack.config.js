const HTMLWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  entry: resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { transpileOnly: true },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: resolve(__dirname, "src/index.html")
    })
  ]
};
