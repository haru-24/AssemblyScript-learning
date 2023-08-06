# AssemblyScript Learning

## インストール

```
$ npm i
```

## WASM をビルド

```
$ npm run asbuild
```

## テスト

```
$ npm run test
```

## ベンチマーク計測

JavaScript と WASM の速度を比較する

```
$ npm run benchmark -func {関数名}
```

## 結果

### add 関数

コード

```JavaScript
  function add(a, b) {
    return a + b
  }
```

```
Running add
AssemblyScript x 129,916,538 ops/sec ±0.73% (95 runs sampled)
JavaScript x 785,587,687 ops/sec ±1.60% (86 runs sampled)
JavaScript won
```

### factorial 関数

コード

```JS
  function factorial(i) {
    return i == 0 ? 1 : i * factorial(i - 1)
  }
```

- Small i=3
- Large i=20

```
Running factorialSmall
AssemblyScript x 65,292,283 ops/sec ±0.76% (90 runs sampled)
JavaScript x 68,965,802 ops/sec ±0.74% (88 runs sampled)
JavaScript won
---------------------------------------------------------------
Running factorialLarge
AssemblyScript x 12,967,833 ops/sec ±1.94% (90 runs sampled)
JavaScript x 12,994,578 ops/sec ±1.02% (91 runs sampled)
```

### squareArray 関数

コード

```JS
  function squareArray(arr) {
    const len = arr.length
    const result = new Int32Array(len)
    for (let i = 0; i < len; ++i) {
      const e = arr[i]
      result[i] = e * e
    }
    return result
  }
```

- Small arr=[1, 2, 3]
- Large arr=[0,0,0,0 ...] \*レングスが 1000 の配列

```
Running squareArraySmall
AssemblyScript x 1,525,514 ops/sec ±0.63% (89 runs sampled)
JavaScript x 18,507,986 ops/sec ±0.61% (90 runs sampled)
JavaScript won
---------------------------------------------------------------
Running squareArrayLarge
AssemblyScript x 77,541 ops/sec ±0.99% (88 runs sampled)
JavaScript x 248,878 ops/sec ±1.55% (86 runs sampled)
JavaScript won
```

### squareArrayGen 関数

コード

```JS
  function squareArrayGen(len) {
    const arr = new Int32Array(len).map((_, i) => i)
    const result = new Int32Array(len)
    for (let i = 0; i < len; ++i) {
      const e = arr[i]
      result[i] = e * e
    }
    return result
  }
```

- Small len=20
- Large len=200

```
Running squareArrayGenSmall
AssemblyScript x 554,770 ops/sec ±2.61% (81 runs sampled)
JavaScript x 355,074 ops/sec ±6.97% (67 runs sampled)
AssemblyScript won
---------------------------------------------------------------
Running squareArrayGenLarge
AssemblyScript x 208,484 ops/sec ±1.94% (86 runs sampled)
JavaScript x 178,064 ops/sec ±2.54% (78 runs sampled)
AssemblyScript won
```
