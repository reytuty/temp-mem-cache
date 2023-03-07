# temp-mem-cache

To cache results in local cache memory.
Sometimes is more simple to cache local results for minutes or secconds insted of create a REDIS solution to optimize some complexed things that you need to call more than one time.

| You just need 1 instance for all cache with the same expiration time

## Usage

```

import { TempCache } from "temp-mem-cache";

const cache1minute = new TempCache(60); //60 secconds of expiration time

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
    let myUniquealias = 'getSomethingAsyncCache_'+a+'+'+b;
    return cache1minute.getCached<Promise<number>>(myUniqueAlias, ()=>{
        console.log("calling myComplexAsyncFunction for ", a, b)
        return myComplexAsyncFunction(a, b);
    });
}

```

It works for a database calls and api 3th party calls.

# Class TempCache

Instantiate:

`const myCache = new TempCache(<time-in-secconds>)`

Functions:

`getCached(<alias-key>, <function-to-call>)`

## alias-key

| Tip: Keep the key-alias unique but do not forget to involve the paramethers. If you recive a json you can do something like that:

```
const alias = JSON.stringify({ myParametersHere: 1 });
```


## function-to-call

Pass a function that do not need to send parameter. If your function use parameters, create a const or let variable to be used inside of a anonimous function

```
const a = 1;
const b = 2;
myCache.getCache('test', ()=>{
    myFunction(a, b)
})
```