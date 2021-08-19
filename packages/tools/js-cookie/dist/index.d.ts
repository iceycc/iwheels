interface Attributes {
    path: string;
    expires?: string | number | Date;
}
interface Converter {
    encode: (text: string) => string;
    decode: (text: string) => string;
}

interface Cookie {
    get: (key: string) => string | null;
    set: (key: string, value: string) => void;
    del: (key: string) => void;
    withConverter: (converter: Converter) => Cookie;
    withAttributes: (attributes: Partial<Attributes>) => Cookie;
}
declare const _default: Cookie;

export { _default as default };
//# sourceMappingURL=index.d.ts.map
