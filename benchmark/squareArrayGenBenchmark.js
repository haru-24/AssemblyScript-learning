import Benchmark from 'benchmark'
import { squareArrayGen } from '../build/release.js'

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
}

function squareArrayGenTest() {
  function squareArrayGenJs(len) {
    const arr = new Int32Array(len).map((_, i) => i)
    const result = new Int32Array(len)
    for (let i = 0; i < len; ++i) {
      const e = arr[i]
      result[i] = e * e
    }
    return result
  }

  const squareArrayGenAs = squareArrayGen

  const testSmall = Benchmark.Suite('squareArrayGenSmall')
  testSmall
    .add('AssemblyScript', function () {
      squareArrayGenAs(20)
    })
    .add('JavaScript', function () {
      squareArrayGenJs(20)
    })
  runSuite(testSmall)

  const testLarge = Benchmark.Suite('squareArrayGenLarge')
  testLarge
    .add('AssemblyScript', function () {
      squareArrayGenAs(200)
    })
    .add('JavaScript', function () {
      squareArrayGenJs(200)
    })
  runSuite(testLarge)
}

squareArrayGenTest()
