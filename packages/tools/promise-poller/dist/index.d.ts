declare type StrategyName = 'fixed-interval' | 'linear-backoff' | 'exponential-backoff';
interface Options {
    taskFn: Function;
    strategy?: StrategyName;
    masterTimeout?: number;
    shouldContinue: (err: Error | null, result?: any) => boolean;
    taskTimeout?: number;
    progressCallback?: (retriesRemain: number, error: Error) => unknown;
    retries?: number;
    interval?: number;
    start?: number;
    increment?: number;
    min?: number;
    max?: number;
}

declare const promisePoller: (options: Options) => Promise<unknown>;

export { promisePoller as default };
//# sourceMappingURL=index.d.ts.map
