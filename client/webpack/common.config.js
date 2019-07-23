const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
 
  module: {
    
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory",
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: "file-loader",
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./client/src/favicon.ico",
      template: "./client/src/index.html",
    }),
  ],
}