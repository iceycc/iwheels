// 为了将引入的 npm 包，也打包进最终结果中
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
// // 为了将引入的 npm 包，也打包进最终结果中
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from 'rollup-plugin-json';
// 生产dts
import dts from 'rollup-plugin-dts'
import pkg from './package.json';
// 一段自定义的内容，以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._Dry_VERSION_ = '${pkg.version}'
}`
const extensions = ['.ts','.tsx'];
export default [
    {
        input: 'lib/index.ts',
        output: {
                file: pkg.main,
                format: 'cjs',
                name: 'IReact',
                footer,
            }
        ,
        plugins: [
            typescript(),
            resolve(),
            commonjs(),
            json(),
            babel({
                exclude: "node_modules/**",
                extensions
            })
        ]
    },
    {
        // 生成 .d.ts 类型声明文件
        input: 'lib/index.ts',
        output: {
            file: 'dist/index.d.ts',//输出文件的路径和名称
            format: 'cjs',//五种输出格式：amd/es6/iife/umd/cjs
            name: 'iReact'//当format为iife和umd时必须提供，将作为全局变量挂在window下
        },
        plugins: [dts()],
    }
]
