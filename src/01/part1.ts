import { readFileSync } from 'fs'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [[`1721
979
366
299
675
1456`, 514579]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 0

    const lines = splitLines(input)

    for(const line of lines){
        let v1 = parseInt(line)
        let v2 = 2020 - v1
        if(lines.includes(`${v2}`)){
                retVal = v1 * v2
                break
        }

    }

    return retVal
}
