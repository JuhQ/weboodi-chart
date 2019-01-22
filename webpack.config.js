const path = require("path");

module.exports = {
  entry: "./src/weboodi.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "weboodi.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
