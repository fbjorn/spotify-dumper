const path = require ('path');
const webpack = require ('webpack');
const HWP = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join (__dirname, '../src/main.tsx'),
  output: {
    filename: 'app.js',
    path: path.join (__dirname, '../dist'),
  },
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    alias: {
      '../../theme.config$': path.join (
        __dirname,
        '../semantic-ui/theme.config'
      ),
      '../semantic-ui/site': path.join (__dirname, '../semantic-ui/site'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         hmr: process.env.NODE_ENV === 'development',
      //       },
      //     },
      //     'css-loader',
      //     // "postcss-loader",
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            // options: {
            //   insertInto: () => document.querySelector("body")
            // }
          },
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
        // loaders: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]',
      },

      // the following 3 rules handle font extraction
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf',
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/',
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //     // use: [
      //     //   {
      //     //     loader: "file-loader",
      //     //     options: {}
      //     //   }
      //   ],
      // },
    ],
    // loaders: [{ test: /\.css$/, loader: 'style-loader!css-loader' }],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  plugins: [
    new HWP ({template: path.join (__dirname, '../src/index.html')}),
    // new MiniCssExtractPlugin ({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: devMode ? '[name].css' : '[name].[hash].css',
    //   chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    // }),
    new MiniCssExtractPlugin (),
    new webpack.DefinePlugin ({PRODUCTION: JSON.stringify (!devMode)}),
  ],
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
};
