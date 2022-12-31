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
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 0

    const step = input.indexOf('\n')

    console.log({step})
    input = input.replace(/\n/g, '')

    let path = input.split('') 

    let i = 0
    let n = 2
    while(true){

        if(i > input.length){
            break 
        }

        i += step + 3
        if(i > n * step){
            i = i - step
        }

        if(input.charAt(i) === '#'){
            retVal++
            path[i] = 'X'
        } else {
            path[i] = 'O'
        }

        n++
    }

    console.log({input, path})

    return retVal
}
