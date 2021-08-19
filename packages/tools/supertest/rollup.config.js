import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve'; // 支持解析引入node_modules下的包
import commonjs from '@rollup/plugin-commonjs'; // 支持commonjs引入
// import typescript from "@rollup/plugin-typescript"; // 支持ts
import serve from 'rollup-plugin-serve'; // 本地服务器
import livereload from "rollup-plugin-livereload";
import IUtils from "@iwheels/utils";
import {name} from "./package.json"; // 自动重启
const pkgName = "$_" + IUtils.doCamel(name.split('/')[1])

export default {
    input: './src/index.js',
    output: {
        file: './public/index.js',
        format: 'umd', // 6种输出格式,amd/es/iife/umd/cjs/system
        sourcemap: true,
        name: pkgName
    },
    plugins: [
        babel({
            babelHelpers: 'external',
            include: ["./src/**", "./lib/**"],
            exclude: "node_modules/**"
        }),
        resolve(),
        commonjs(),
        // typescript(),
        // terser(),
        serve({
            open: true,
            port: 8151,
            contentBase: './public'
        }),
        livereload()
    ]
}

