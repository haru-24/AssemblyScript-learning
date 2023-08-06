import Benchmark from 'benchmark'
import { factorial } from '../build/release.js'

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

function factorialTest() {
  function factorialJs(i) {
    return i == 0 ? 1 : i * factorial(i - 1)
  }

  const factorialAs = factorial

  const testSmall = Benchmark.Suite('factorialSmall')
  testSmall
    .add('AssemblyScript', function () {
      factorialAs(3)
    })
    .add('JavaScript', function () {
      factorialJs(3)
    })
  runSuite(testSmall)

  const testLarge = Benchmark.Suite('factorialLarge')
  testLarge
    .add('AssemblyScript', function () {
      factorialAs(20)
    })
    .add('JavaScript', function () {
      factorialJs(20)
    })
  runSuite(testLarge)
}

factorialTest()
