"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempCache = void 0;
var TempCache = /** @class */ (function () {
    function TempCache(seccondsCache) {
        if (seccondsCache === void 0) { seccondsCache = 60; }
        this.miliSeccondsCache = seccondsCache * 1000;
        this.cachedValues = new Map();
        this.timerDelete = new Map();
    }
    TempCache.prototype.getCached = function (aliasKey, methodToGet) {
        var timerMap = this.timerDelete;
        clearTimeout(timerMap.get(aliasKey));
        if (this.cachedValues.has(aliasKey)) {
            return this.cachedValues.get(aliasKey);
        }
        this.cachedValues.set(aliasKey, methodToGet());
        timerMap.set(aliasKey, setTimeout(function () {
            clearTimeout(timerMap.get(aliasKey));
        }, this.miliSeccondsCache));
        return this.cachedValues.get(aliasKey);
    };
    return TempCache;
}());
exports.TempCache = TempCache;
