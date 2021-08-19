declare type Store = <T>(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>) => Promise<T>;
/**
 * 将 request 变为 Promise 对象
 * indexeddb 操作成功后会调用 onsuccess，因此绑定到 resolve
 * indexeddb 操作失败后会调用 onerror，因此绑定到 reject
 * @param request
 */
declare function promisifyRequest<T = undefined>(request: IDBRequest<T> | IDBTransaction): Promise<T>;
/**
 * 创建数据库，并提供操作入口
 * @param dbName
 * @param storeName
 */
declare function createStore(dbName: string, storeName: string): Promise<Store>;
/**
 * 获取单例 default store
 */
declare function getDefaultStore(): Promise<Store>;
/**
 * 根据 key 获取对应 value
 * @param key 传入的 key
 * @param customStore 自定义 store 获取 defaultStore
 */
declare function get<T>(key: IDBValidKey, customStore?: Promise<Store>): Promise<T | undefined>;
/**
 * 批量获取 values
 * @param keys 传入的 keys
 * @param customStore 自定义 store 获取 defaultStore
 */
declare function getMany(keys: IDBValidKey[], customStore?: Promise<Store>): Promise<any[]>;
/**
 * 设置 key-value 对，key 不存在则创建，key 存在则覆盖
 * @param key 传入的 key
 * @param value 传入的 value
 * @param customStore 自定义 store 获取 defaultStore
 */
declare function set(key: IDBValidKey, value: any, customStore?: Promise<Store>): Promise<IDBValidKey>;
/**
 * 批量设置 key-value 对
 * @param entries 传入的键值对
 * @param customStore 自定义 store 获取 defaultStore
 */
declare function setMany(entries: [IDBValidKey, any][], customStore?: Promise<Store>): Promise<void>;
/**
 * 根据 key 删除对应的 key-value 对
 * @param key 传入的 key
 * @param customStore 自定义 store 获取 defaultStore
 */
declare function del(key: IDBValidKey, customStore?: Promise<Store>): Promise<undefined>;
/**
 * 清除数据库内容
 * @param customStore 自定义 store 获取 defaultStore
 */
declare function clear(customStore?: Promise<Store>): Promise<undefined>;
/**
 * 获取数据库里所有 keys
 * @param customStore
 */
declare function keys(customStore?: Promise<Store>): Promise<IDBValidKey[]>;
/**
 * 获取数据库里所有 values
 * @param customStore
 */
declare function values(customStore?: Promise<Store>): Promise<any[]>;
/**
 * 获取数据库里所有 entries
 * @param customStore
 */
declare function entries(customStore?: Promise<Store>): Promise<[IDBValidKey, any][]>;

export { clear, createStore, del, entries, get, getDefaultStore, getMany, keys, promisifyRequest, set, setMany, values };
//# sourceMappingURL=index.d.ts.map
