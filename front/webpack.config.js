const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const dist = 'dist';
const distFile = '[name]-[hash].[ext]';
const publicPath = 'static';
const imgOutput = 'images';

// loader는 기본적으로 인풋된 js의 import나 require에서 설정된 test 정규표현식에 걸려졌을 경우 실행
// css-loader: css파일의 모듈화
// style-loader: css-loader에 의해 자바스크립트화된 css를 DOM에 추가
var cssRule = { test: /\.css$/, use: ['style-loader', 'css-loader'] };
var imgRule = { test: /\.(jpg|png)$/, loader: 'file-loader', options: { outputPath: imgOutput, publicPath: `${publicPath}/${imgOutput}`, name: distFile } };
var urlRule = { test: /\.(jpg|png)$/, use: { loader: 'url-loader',options: { outputPath: imgOutput, publicPath: `${publicPath}/${imgOutput}`, name: distFile, limit: 6000 } } };
var jsRule = { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader', options: { presets: ["@babel/preset-env", "@babel/preset-react"] } };
var htmlRule = { test: /\.html$/, loader: 'html-loader', options: { minimize: false } };

module.exports = {
    mode: 'development',
    entry: {
        index: './src/Index.js',
        acc: './src/AccList.js',
        memo: './src/MemoList.js'
    },
    output: {
        path: path.resolve(__dirname, dist),
        filename: '[name].js'
    },
    module: {
        // rules: [cssRule, imgRule, urlRule, jsRule]
        rules: [cssRule, imgRule, jsRule]
    },
    // plugins: [
    //     new CleanWebpackPlugin(),
    //     new HtmlWebpackPlugin({
    //         filename: '[name].html',
    //         template: './templates/index.html',
    //         publicPath: '/static/',
    //         inject: 'body'
    //     })
    // ]
}
