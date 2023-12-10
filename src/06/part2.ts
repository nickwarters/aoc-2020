import { readFileSync } from 'fs'

const tests: [string, any][] = [
	[
		`abc

a
b
c

ab
ac

a
a
a
a

b`,
		11,
	],
]

tests.forEach(([input, expected], i) => {
	const result = solve(input)
	console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass' : 'Fail'}\n----\n`)
})

console.log(
	`Full Input Solution\n----\n${solve(
		readFileSync('./input.txt', { encoding: 'utf-8' })
	)}`
)

function solve(input: string): number {
	let total = 0
	let init: string[] = []
	total = input
		.split('\n\n')
		.map((group) => {
			return group.split('\n').reduce((acc, current, i) => {
				if (i === 0) {
					return current.split('')
				}

				return acc.filter((x) => current.includes(x))
			}, init)
		})
		.reduce((acc, cur) => acc + cur.length, 0)

	return total
}
