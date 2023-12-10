import { readFileSync } from 'fs'

const tests: [string, any][] = [
	[
		`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`,
		5,
	],
]

tests.forEach(([input, expected], i) => {
	const result = solve(input)
	console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass' : 'Fail'}`)
})

console.log(
	`Full Input Solution\n----\n${solve(
		readFileSync(__dirname + '/' + 'input.txt', { encoding: 'utf-8' })
	)}`
)

function solve(input: string): number {
	const lines = input.split('\n')

	let total = 0
	let i = 0
	const seen = new Set()

	while (true) {
		if (seen.has(i)) {
			break
		}
		seen.add(i)
		const [inst, num] = lines[i].split(' ')
		if (inst === 'nop') {
			i++
			continue
		}
		if (inst === 'jmp') {
			console.log(`jumping ${num} to ${i + parseInt(num)}`)
			i += parseInt(num)
			continue
		}

		i++

		total += parseInt(num)
		console.log(`adding ${num}. new total=${total}`)
	}

	return total
}
