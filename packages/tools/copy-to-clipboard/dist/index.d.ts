declare type Format = 'text/plain' | 'text/html' | 'default';
interface Options {
    onCopy?: (copiedText: DataTransfer | null) => unknown;
    format?: Format;
}

declare const copy: (text: string, options?: Options) => boolean;

export { copy as default };
//# sourceMappingURL=index.d.ts.map
