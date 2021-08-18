// 导入处理路径的模块
const path = require('path');
module.exports = {
    mode: 'production',
    // 项目入口文件
    entry: path.resolve(__dirname, 'src/index.ts'),
    // 项目输出文件
    output: {
        filename: 'index.js',
        libraryTarget: "umd",   // 不用省略
        path: path.resolve(__dirname, 'lib'),
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
                loader: "ts-loader",
            }
        ]

    },
    // 插件
    plugins: []
}
