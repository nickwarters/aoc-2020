import { readFileSync } from 'fs'

const tests: [string, any][] = [[`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`, 7]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}\n----\n\n`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 0

    const lineLength = input.indexOf('\n')
    const maxStep = lineLength + 3

    input = input.replace(/\n/g, '')

    let path = input.split('') 

    let i = 0
    let n = 2
    while(true){

        if(i > input.length){
            break 
        }

        i = i % lineLength >= (lineLength - 3) ? i + 3 : i + maxStep

        if(input.charAt(i) === '#'){
            retVal++
            path[i] = 'X'
        } else {
            path[i] = 'O'
        }

        n++
    }

    //console.log({input, path: path.join('')})

    return retVal
}
