// 导入处理路径的模块
const path = require('path');
const webpack = require("webpack");
// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
    // 项目入口文件
    entry: path.resolve(__dirname, 'src/index.ts'),
    // 项目输出文件
    output: {
        filename: 'bundle.js',
        libraryTarget: "umd",   // 不用省略
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
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
    ]
}
