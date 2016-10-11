export default {
  debug: true,
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
    ],
  },
  target: 'web',
  entry: './src/content_scripts.js',
  output: {
    path: './app/assets/',
    publicPath: '/assets/',
    filename: 'js/content_scripts.js',
  },
}
