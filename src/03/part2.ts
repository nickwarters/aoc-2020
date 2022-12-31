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
.#..#...#.#`, 336]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution\n----\nExpected: ${expected}\nGot: ${result}\n----\nTest ${i + 1} ${result === expected ? 'Pass': 'Fail'}\n----\n\n`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 1

    const lineLength = input.indexOf('\n')
    const steps = [[1,1], [3,1], [5,1], [7,1], [1,2]]

    for (const step of steps){

        let collisions = 0
        const [r, d] = step

        const maxStep = (d * lineLength) + r

        input = input.replace(/\n/g, '')

        let i = 0
        while(true){

            if(i > input.length){
                break 
            }

            i = i % lineLength >= (lineLength - r) ? i + ((d - 1) * lineLength) + r : i + maxStep

            if(input.charAt(i) === '#'){
                collisions++
            }
        }

        retVal = retVal * collisions
    }

    //console.log({input, path: path.join('')})

    return retVal
}
