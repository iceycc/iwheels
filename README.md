
## 计划
- [ ] lerna + yarn 搭建workspace+monorepo项目
- [ ] rollup搭建工具库
- [ ] webpack搭建个别组件库
- [ ] 一天一个轮子

## 轮子
### React相关 @iweels/for-react
-  react-error-boundary 轮子

### Vue相关 @iweels/for-vue

## 通用
- idb-keyval 轮子
- js-cookie 轮子
- copy-to-clipboard 轮子
## lerna
- 创建新包 `lerna create @iwheels/vue`

## 配置babel7
https://babeljs.io/docs/en/usage

## 常用命令：
```shell script
# 创建一个轮子
lerna create @iwheel/xxx packages 

#将module-1 包添加到'prefix-' 前缀文件夹中的包中
lerna add module-1 packages/prefix- * 

#将module-1 安装到module-2 
lerna add module-1 --scope=module-2 

#在 devDependencies中将 module-1安装到 module-2 
lerna add module-1 --scope=module-2 --dev

 #在 peerDependencies中将 module-1安装到 module-2 
lerna add module-1 --scope=module-2 -- peer 

#在除 module-1 之外的所有模块中安装 module-1 
lerna add module-1 

#在所有模块中安装 babel-core 
lerna add babel-core
```

