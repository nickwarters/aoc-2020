import { readFileSync } from 'fs'

const tests: [string, any][] = [[`abc

a
b
c

ab
ac

a
a
a
a

b`, 11]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}\n----\n`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 0

    for(const group of input.split('\n\n')){
        const a = new Set(group.match(/[a-z]/g))
        retVal += a.size
    }

    return retVal
}
