// The entry file of your WebAssembly module.

export const Int32Array_ID = idof<Int32Array>()

export function add(a: i32, b: i32): i32 {
  return a + b
}

export function factorial(i: i32): i32 {
  return i == 0 ? 1 : i * factorial(i - 1)
}

export function squareArray(arr: Int32Array): Int32Array {
  const len = arr.length
  const result = new Int32Array(len)
  for (let i = 0; i < len; ++i) {
    const e = arr[i]
    result[i] = e * e
  }
  return result
}

export function squareArrayGen(len: i32): Int32Array {
  const arr = new Int32Array(len).map((_, i) => i)
  const result = new Int32Array(len)
  for (let i = 0; i < len; ++i) {
    const e = arr[i]
    result[i] = e * e
  }
  return result
}

export function fib(n: i32): i32 {
  const result = [0, 1]

  for (let i = 2; i <= n; i++) {
    const a = result[i - 1]
    const b = result[i - 2]

    result.push(a + b)
  }
  return result[n]
}
