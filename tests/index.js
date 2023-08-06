import assert from 'assert'
import { add, factorial, squareArray, fib } from '../build/debug.js'
assert.strictEqual(add(1, 2), 3)
assert.strictEqual(factorial(3), 6)
assert.deepStrictEqual(squareArray([1, 2, 3, 4]), new Int32Array([1, 4, 9, 16]))
assert.strictEqual(fib(3), 2)
console.log('success')
