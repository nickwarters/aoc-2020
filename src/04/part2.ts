import { readFileSync } from 'fs'

const tests: [string, any][] = [[`eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`, 4]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}\n----`)
})

console.log(`----\nFull Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 0

    const fields = {
        'byr': (v: string) => {
            if(v.length !== 4) return false 

            const year = parseInt(v)

            if(isNaN(year)) return false 

            if(year < 1920 || year > 2002) return false

            return true 
        }, 
        'iyr': (v: string) => {
            if(v.length !== 4) return false 

            const year = parseInt(v)

            if(isNaN(year)) return false 

            if(year < 2010 || year > 2020) return false

            return true 

        }, 
        'eyr': (v: string) => {
            if(v.length !== 4) return false 

            const year = parseInt(v)

            if(isNaN(year)) return false 

            if(year < 2020 || year > 2030) return false

            return true 
        }, 
        'hgt': (v: string) => {
            let h = v.match(/^(\d+)(in|cm)$/)
            if(!h) return false

            let n = parseInt(h[1])
            let u = h[2]

            if(u === 'in'){
                return n >= 59 && n <= 76
            } else {
                return n >= 150 && n <= 193
            }
        }, 
        'hcl': (v: string) => {
            v = v.replace(/#[0-9a-f]{6}/, '')
            return v  === ''
        }, 
        'ecl': (v: string) => {
            return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v)
        }, 
        'pid': (v: string) => {
            v = v.replace(/\d{9}/, '')

            return v === ''
        },
        'cid': (v: string) => true 
    }

    lineLoop:
    for(const line of input.split('\n\n')){
        const parts = line.split(/\n| /).reduce((prev: {[key: string]: string}, current: string | string[])=>{
            if(typeof current === 'string'){
                current = current.split(':')
            }
            prev[current[0]] = current[1]
            return prev
        }, {'cid': ''})

        let field: keyof typeof fields
        for(field in fields){
            if(!(field in parts)){continue lineLoop}

            if(!fields[field](parts[field])){continue lineLoop}
            
        }

        retVal++
    }

    return retVal
}
