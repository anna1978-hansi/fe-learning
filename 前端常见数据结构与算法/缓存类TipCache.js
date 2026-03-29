class TipCache {
    constructor() {
        this._cachePool = {};
    }
    
    set(key, value) {
        this._cachePool[key] = value;
    }
    
    get(key) {
        return this._cachePool[key];
    }
}

export default new TipCache();