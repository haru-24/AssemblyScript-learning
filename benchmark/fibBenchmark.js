import Benchmark from 'benchmark'
import { fib } from '../build/release.js'

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

function fibTest() {
  function fibJs(n) {
    const result = [0, 1]

    for (let i = 2; i <= n; i++) {
      const a = result[i - 1]
      const b = result[i - 2]

      result.push(a + b)
    }
    return result[n]
  }

  const fibAs = fib

  const testSmall = Benchmark.Suite('fibSmall')
  testSmall
    .add('AssemblyScript', function () {
      fibAs(10)
    })
    .add('JavaScript', function () {
      fibJs(10)
    })
  runSuite(testSmall)

  const testLarge = Benchmark.Suite('fibLarge')
  testLarge
    .add('AssemblyScript', function () {
      fibAs(200)
    })
    .add('JavaScript', function () {
      fibJs(200)
    })
  runSuite(testLarge)
}

fibTest()
