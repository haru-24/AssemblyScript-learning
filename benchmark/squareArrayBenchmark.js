import Benchmark from 'benchmark'
import { squareArray } from '../build/release.js'

function runSuite(suite) {
  console.log('Running', suite.name)
  suite
    .on('cycle', (event) => {
      console.log(String(event.target))
    })
    .on('complete', function (event) {
      console.log(this.filter('fastest').map('name') + ' won')
    })
    .run()
  console.log('---------------------------------------------------------------')
}

function squareArrayTest() {
  function squareArrayJs(arr) {
    const len = arr.length
    const result = new Int32Array(len)
    for (let i = 0; i < len; ++i) {
      const e = arr[i]
      result[i] = e * e
    }
    return result
  }

  const squareArrayAs = squareArray

  const testSmall = Benchmark.Suite('squareArraySmall')
  testSmall
    .add('AssemblyScript', function () {
      squareArrayAs([1, 2, 3])
    })
    .add('JavaScript', function () {
      squareArrayJs([1, 2, 3])
    })
  runSuite(testSmall)

  const testLarge = Benchmark.Suite('squareArrayLarge')
  const largeArray = new Int32Array(1000).fill(1).map((val, i) => {
    val + i * 0.001
  })
  testLarge
    .add('AssemblyScript', function () {
      squareArrayAs(largeArray)
    })
    .add('JavaScript', function () {
      squareArrayJs(largeArray)
    })
  runSuite(testLarge)
}

squareArrayTest()
