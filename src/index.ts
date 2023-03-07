
export class TempCache{
    protected miliSeccondsCache: number;
    protected cachedValues: Map<string, any>;
    protected timerDelete: Map<string, NodeJS.Timeout>;
    constructor(seccondsCache:number = 60){
      this.miliSeccondsCache = seccondsCache*1000;
      this.cachedValues = new Map<string, any>();
      this.timerDelete = new Map<string, NodeJS.Timeout>();
    }
    getCached<T>(aliasKey:string, methodToGet:() => T):T{
      const timerMap = this.timerDelete;
      if(this.cachedValues.has(aliasKey)){
        return this.cachedValues.get(aliasKey) as T;
      }
      clearTimeout(timerMap.get(aliasKey));
      this.cachedValues.set(aliasKey, methodToGet());
      const cachedValues = this.cachedValues;
      timerMap.set(aliasKey, setTimeout(()=>{
        clearTimeout(timerMap.get(aliasKey));
        timerMap.delete(aliasKey);
        cachedValues.delete(aliasKey);
      }, this.miliSeccondsCache))
      return this.cachedValues.get(aliasKey) as T;
    }
  }
  