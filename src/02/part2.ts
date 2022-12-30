import { readFileSync } from 'fs'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [[`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`, 1]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}\n----\n----`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 0

    let minmax: string | number[] = ''
    let min: number | string = ''
    let max: number | string = ''
    let c = ''
    let pw = ''

    lineLoop:
    for (const line of splitLines(input)){
        [minmax, c, pw] = line.split(' ')

        c = c.replace(':', '')
        minmax = minmax.split('-')!.map(n => parseInt(n))
        min = minmax[0]
        max = minmax[1]

        if(pw.charAt(min - 1) === c && pw.charAt(max - 1) === c){
            continue 
        }

        if(pw.charAt(min - 1) === c || pw.charAt(max - 1) === c){
            retVal++
        }
    }

    return retVal
}
