import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve } from "path";

const config: import("webpack").Configuration = {
  entry: resolve(__dirname, "src/index.tsx"),
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new HtmlWebpackPlugin()]
};

export default config;
