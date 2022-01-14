# webpack使用

初始化一个npm 项目

安装    webpack webpack-cli两个包

配置   webpack.config.js

执行  npx webpack



## 资源管理

加载css样式

* npm i -D style-loader css-loader

* 在webpack.config.js配置module

  ```
  module:{
  	rules:{
  		test:/\.css$/,
  		use:['style-loader','css-loader']
  	}
  }
  ```

  此外还可以使用对应的loader处理样式文件 如 sass，less

加载图片

* ```bash
  npm install --save-dev file-loader
  ```

*  ```
   {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
   }
   ```

加载字体

```
{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
```

加载数据

```
npm install --save-dev csv-loader xml-loader

{
    test: /\.(csv|tsv)$/,
    use: [
        'csv-loader'
    ]
},
{
    test: /\.xml$/,
    use: [
        'xml-loader'
    ]
}
```

## 管理输出



设定html-webpack-plugin        每次构建自动生成index.html并且这个html会自动引入src中所需的文件

```
npm install --save-dev html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

配置
plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management'
     })
   ],
```

清理./dist     CleanWebpackPlugin插件每次会清理dist文件夹

```
npm install clean-webpack-plugin --save-dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

配置 new CleanWebpackPlugin(['dist']),
```

## 开发

source map     可以在浏览器中看到运行报错在源文件中的位置

```
配置
devtool: 'inline-source-map',
```

webpack-dev-server    实时重新加载，每次保存自动编译，只需刷新一下浏览器

```
npm install --save-dev webpack-dev-server

配置
devServer: {
     static: './dist'
   },
   
配置脚本
"start": "webpack-dev-server --open",

webpack-dev-server内部使用了webpack-dev-middleware
```

## 模块热替换

```
const webpack = require('webpack');

devServer: {
        static: path.join(__dirname, "dist"),
        hot: true,
    },
   
 plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    
开启热模块替换  每次修改代码会刷新浏览器
但是要获取新内容还需要在index.js绑定module.hot.accept

但是很多loader内置了这个module.hot.accept监听，如css-loader，不需要手动去写
```

## treeshaking

 ```
 不打包没有引用的内容
 ```

mode

```
mode: 'production'      压缩代码
mode: 'development'     开发环境，未压缩代码 
```

## 生产环境构建

```
npm install --save-dev webpack-merge


webpack.common.js   配置entry output等

 const path = require('path');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     entry: {
         app: './src/index.js'
     },
     plugins: [
         new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
             title: 'Production'
         })
     ],
     output: {
         filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'dist')
     }
 };


webpack.dev.js		配置source mapdeng

 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
     devtool: 'inline-source-map',
     devServer: {
         static: './dist'
     },
     mode: 'development',
 });


webpack.prod.js     配置代码压缩等

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
});


npm脚本配置
"start": "webpack serve --open --config webpack.dev.js",修改脚本
"build": "webpack --config webpack.prod.js"
```

## 代码分离

有三种常用的代码分离方法：

- 入口起点：使用 [`entry`](https://www.webpackjs.com/configuration/entry-context) 配置手动地分离代码。
- 防止重复：使用 [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

## 懒加载

