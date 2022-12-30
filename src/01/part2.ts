import { readFileSync } from 'fs'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [[`1721
979
366
299
675
1456`, 241861950]]

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

    const lines = splitLines(input).map(n => parseInt(n))

    for(let x = 0; x < lines.length; x++){
        for(let y = 0; y < lines.length; y++){
            if(x === y){ continue }

            let v1 = lines[x]

            let v2 = lines[y]
            let v3 = 2020 - v1 - v2
            if(lines.includes(v3)){
                retVal = v1 * v2 * v3
                break
            }
        }
    }

    return retVal
}
