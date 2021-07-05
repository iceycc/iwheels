// export {}
type context = (any) => any

declare interface require implements NodeRequire{
    context: context;
}

declare interface window {
    context: context;
}
