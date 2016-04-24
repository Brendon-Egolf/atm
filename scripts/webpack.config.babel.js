module.exports = {
     entry: "./main.js",
     output: {
          path: "./",
          filename: "bundle.js"
     },
     module: {
          loaders: [
               {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
          ]
     }
};