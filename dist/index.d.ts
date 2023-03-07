export declare class TempCache {
    protected miliSeccondsCache: number;
    protected cachedValues: Map<string, any>;
    protected timerDelete: Map<string, number>;
    constructor(seccondsCache?: number);
    getCached<T>(aliasKey: string, methodToGet: () => T): T;
}
