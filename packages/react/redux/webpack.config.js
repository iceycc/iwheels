// 导入处理路径的模块
const path = require('path');
// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
    mode: 'production',
    // 项目入口文件
    entry: path.resolve(__dirname, 'lib/index.ts'),
    // 项目输出文件
    output: {
        filename: 'index.js',
        libraryTarget: "umd",   // 不用省略
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    // 文件处理规则
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            }
        ]

    },

    optimization: {},
    // 插件
    plugins: []
}
