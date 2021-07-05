// 导入处理路径的模块
const path = require('path');
const webpack = require("webpack");
// 将打包的代码放在内存，可以快速热加载
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
    // 项目入口文件
    entry: path.resolve(__dirname, 'src/index.tsx'),
    // entry: path.resolve(__dirname, 'src/facade/index.ts'),
    // 项目输出文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    devServer: {    //这是dev-server命令的第二种方式
        contentBase: "src",
        open: true,
        port: 2000,
        hot: true,
        // todo: 怎么配置histroy模式呢
        historyApiFallback:{
            index:'src/index.html'
        },
    },
    // 文件处理规则
    module: {
        rules: [{
            test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/
        },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    // 降低loader版本，启用CommonJS模块语法
                    options: {
                        esModule: false
                    }
                }]
            }, {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS

                    },
                ],
            }
        ]

    },

    optimization: {
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 以这个路径下的index.html为模板
            template: path.resolve(__dirname ,"/public/index.html")
        }),
    ]
}
