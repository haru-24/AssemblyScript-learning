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
AssemblyScript x 64,145,438 ops/sec ±2.26% (88 runs sampled)
JavaScript x 63,444,465 ops/sec ±5.18% (84 runs sampled)
AssemblyScript won
---------------------------------------------------------------
Running factorialLarge
AssemblyScript x 12,713,168 ops/sec ±1.31% (90 runs sampled)
JavaScript x 13,122,202 ops/sec ±0.75% (92 runs sampled)
JavaScript won
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

### fibonacci 関数

コード

```JS
 function fib(n) {
    const result = [0, 1]

    for (let i = 2; i <= n; i++) {
      const a = result[i - 1]
      const b = result[i - 2]

      result.push(a + b)
    }
    return result[n]
  }
```

- Small len=10
- Large len=2000

```
Running fibSmall
AssemblyScript x 2,014,353 ops/sec ±2.82% (87 runs sampled)
JavaScript x 18,910,662 ops/sec ±2.84% (86 runs sampled)
JavaScript won
---------------------------------------------------------------
Running fibLarge
AssemblyScript x 225,826 ops/sec ±2.83% (87 runs sampled)
JavaScript x 875,388 ops/sec ±1.51% (87 runs sampled)
JavaScript won
```
