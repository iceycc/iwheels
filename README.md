## 项目介绍
主体项目基于 lerna + yarn搭建项目

纯js轮子采用rollup构建

基于ui的采用webpack搭建

搭建一个前端轮子库，里面集合了各种轮子集合。

现已收录一下轮子，后面持续更新
- [造一个 react-error-boundary 轮子](https://github.com/Haixiang6123/my-react-error-bounday)
- [造一个 idb-keyval 轮子](https://github.com/Haixiang6123/my-idb-keyval)
- [造一个 js-cookie 轮子](https://github.com/Haixiang6123/my-js-cookie)
- [造一个 copy-to-clipboard 轮子](https://github.com/Haixiang6123/my-copy-to-clipboard)
- [造一个 react-infinite-scroller 轮子](https://github.com/Haixiang6123/my-react-infinite-scroller)
- [造一个 react-contenteditable 轮子](https://github.com/Haixiang6123/my-react-contenteditable)
- [造一个 promise-poller 轮子](https://github.com/Haixiang6123/my-promise-poller)
- [造一个 redux 轮子](https://github.com/Haixiang6123/my-redux)
- [造一个 redux-thunk 轮子](https://github.com/Haixiang6123/my-redux-thunk)
- [造一个 supertest 轮子](https://github.com/Haixiang6123/my-supertest)

## 
## 项目目录
```
.
├── LICENSE.md
├── README.md
├── examples # 案例项目
│   └── react-demo
├── lerna-debug.log
├── lerna.json
├── package.json
├── packages # 轮子目录，可以根据目录分类，比如未来可以新增vue相关
│   ├── utils  # 公共函数
│   ├── react # react相关的轮子
│   │   ├── react-contenteditable
│   │   ├── react-error-boundary
│   │   ├── react-infinite-scroller
│   │   ├── redux
│   │   └── redux-thunk
│   └── tools # 通用工具轮子
│       ├── copy-to-clipboard
│       ├── idb-keyval
│       ├── js-cookie
│       ├── promise-poller
│       └── supertest
├── template # 轮子构建模版，不局限
│   ├── rollup # 适用于纯js轮子
│   └── webpack # 需要UI的
└── yarn.lock
```
## iwheels
- `npm i @iwheels/react-contenteditable`
- `npm i @iwheels/react-error-boundary`
- `npm i @iwheels/react-infinite-scroller`
- `npm i @iwheels/rudex`
- `npm i @iwheels/rudex-thunk`
- `npm i @iwheels/copy-to-clipboard`
- `npm i @iwheels/idb-keyval`
- `npm i @iwheels/js-cookie`
- `npm i @iwheels/promise-poller`
- `npm i @iwheels/supertest`
- todo: more...

## 来源
[@海怪](https://yanhaixiang.com/#/) ，《一天学习一个 npm 轮子，十天后变成轮子哥》

## 更新日志
v1.0
