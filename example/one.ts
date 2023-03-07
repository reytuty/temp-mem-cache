import { TempCache } from "../src/index";

const cache1minute = new TempCache(6);

async function myComplexAsyncFunction(a:number, b:number):Promise<number>{
    return new Promise<number>((response, reject)=>{
        //here something that you do not need to call every time
        response(a * b);
    });
}

//here the traditional way
async function getSomethingAsync(a:number, b:number):Promise<number>{
    return myComplexAsyncFunction(a, b);
}
//now with cache
async function getSomethingAsyncCache(a:number, b:number):Promise<number>{
    return cache1minute.getCached<Promise<number>>('getSomethingAsyncCache_'+a+'+'+b, ()=>{
        console.log("calling myComplexAsyncFunction for ", a, b)
        return myComplexAsyncFunction(a, b);
    });
}

//now testing
(
    async ()=>{
        //call 3 times, but runs just 1 time
        const r1 = await getSomethingAsyncCache(5, 2);
        const r2 = await getSomethingAsyncCache(5, 2);
        const r3 = await getSomethingAsyncCache(5, 2);
        setTimeout(async ()=>{
            console.log("now the cache was deleted:")
            const r4 = await getSomethingAsyncCache(5, 2);
            console.log("result 4:", r4);
        }, 7000)
        //after 6 secconds, the function will be called again
        console.log("all results:", r1, r2, r3);
        
    }
)()