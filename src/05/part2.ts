import { readFileSync } from 'fs'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [
    [`FBFBBFFRLR`, 357],
    [`BFFFBBFRRR`, 567],
    [`FFFBBBFRRR`, 119],
    [`BBFFBBFRLL`, 820],
    [`BBFFBBFRLL
FFFBBBFRRR
BFFFBBFRRR
FBFBBFFRLR`, 820]
]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`----\nExample Input Solution
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}\n----`)
})

console.log(`----\nFull Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}\n----`)

function solve(input: string): number {

    const init = (n: number) => new Array(n).fill(0).map((_, i) => i)
    
    let retVal = 0

    const ids = []

    for(const line of splitLines(input)){

        let t = init(128)
        let s = init(8)

        let id = 0

        let r = 0
        let c = 0

        for(let i = 0; i < line.length; i++){
            if(i < 7){
                

                if(line.charAt(i) === 'F'){
                    t = t.slice(0, t.length / 2)
                } else {
                    t = t.slice(t.length / 2)
                }
                continue 
            }


            if(line.charAt(i) === 'L'){
                s = s.slice(0, s.length / 2)
            } else {
                s = s.slice(s.length / 2)
            }
        }
        if(t.length === 1){
            r = t[0] 
        }

        if(s.length === 1){
            c = s[0]
        }

        id = r * 8 + c

        ids.push(id)
    }

    let prev = 0 
    for(const id of ids.sort((a,b)=>a-b)){
        if(id - prev === 2){
            retVal = id - 1
            break 
        }
        prev = id
    }
    return retVal
}
