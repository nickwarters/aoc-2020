import { writeFileSync, readFileSync } from 'fs'
import path from 'path'
const cookie = readFileSync(path.join(process.cwd(), 'cookie.txt'), { encoding: 'utf-8' })
const headers = new Headers({ 'Cookie': cookie })
const year = process.cwd().match(/(\d{4})/g)![0]
const day = process.argv[2]
const url = `https://adventofcode.com/${year}/day/${day}/input` 

fetch(url, { 
    credentials: 'include', 
    headers 
}).then(res => {
    return res.text()
}).then(data => {
    writeFileSync(path.join(process.cwd(), 'src', `${day}`.padStart(2, '0'), 'input.txt'), data.trimEnd())

}).catch(err => process.stdout.write(`${err}\n`))
