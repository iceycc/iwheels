import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve'; // 支持解析引入node_modules下的包
import commonjs from '@rollup/plugin-commonjs'; // 支持commonjs引入
import typescript from "@rollup/plugin-typescript"; // 支持ts
import {terser} from 'rollup-plugin-terser'; // 压缩js
import dts from "rollup-plugin-dts";
import IUtils from "@iwheels/utils"
import {name} from "./package.json"; // 自动重启
const pkgName = "$_" + IUtils.doCamel(name.split('/')[1])
export default [
    {
        input: './lib/index.ts',
        output: {
            file: './dist/index.js',
            format: 'umd', // 6种输出格式,amd/es/iife/umd/cjs/system
            name: pkgName,
            sourcemap: true
        },
        plugins: [
            babel({
                babelHelpers: 'external',
                include: ["./lib/**"],
                exclude: "node_modules/**"
            }),
            resolve(),
            commonjs(),
            typescript(),
            terser()
        ]
    },
    {
        // 生成 .d.ts 类型声明文件
        input: './lib/index.ts',
        output: {
            file: './dist/index.d.ts',//输出文件的路径和名称
            format: 'umd',//五种输出格式：amd/es6/iife/umd/cjs
            name: pkgName,//当format为iife和umd时必须提供，将作为全局变量挂在window下
            sourcemap: true
        },
        plugins: [dts()],
    }]
