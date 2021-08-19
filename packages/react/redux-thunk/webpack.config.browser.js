// 导入处理路径的模块
const path = require('path');
// 将打包的代码放在内存，可以快速热加载
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
    mode: "development",
    // 项目入口文件
    entry: path.resolve(__dirname, 'src/index.jsx'),
    // 项目输出文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    devServer: {    //这是dev-server命令的第二种方式
        publicPath: '/',
        contentBase: path.join(__dirname, './public/'),
        open: true,
        port: 4237,
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.(ts|js|jsx)x?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                include: [/src/, /lib/],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]

    },

    optimization: {},
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            // 以这个路径下的index.html为模板
            template: path.resolve(__dirname, "/public/index.html")
        })
    ]
}
