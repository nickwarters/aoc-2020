import { readFileSync } from 'fs'

const tests: [string, any][] = [
	[
		`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`,
		32,
	],
	[
		`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`,
		126,
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

type Tree = Record<string, Record<string, number>>

function solve(input: string): number {
	let total = 0

	const tree: Tree = {}

	input.split('\n').forEach((line) => {
		const [bag, contains] = line.split(' bags contain ')
		if (!Object.keys(tree).includes(bag)) {
			tree[bag] = { 'shiny gold': 0 }
		}
		if (line.includes('no other bags')) {
			return
		}
		contains.split(', ').forEach((item) => {
			const [count, bMod, bCol, _] = item.split(' ')
			const b = [bMod, bCol].join(' ')
			tree[bag][b] = tree[bag][b]
				? tree[bag][b] + parseInt(count)
				: parseInt(count)
			if (!Object.keys(tree).includes(b)) {
				tree[b] = { 'shiny gold': 0 }
			}
		})
	})

	console.log(tree)

	let bag = 'shiny gold'

	total = 0
	const queue = Object.keys(tree[bag])
	for (const b of queue) {
		const m = tree[bag][b]

		total += m * walkQueue(tree, b, m)
	}

	return total
}

function walkQueue(tree: Tree, bag: string, multiplier: number): number {
	const queue = Object.entries(tree[bag]).filter(([_, v]) => v > 0)

	let total = 1

	for (const [b, _] of queue) {
		const m = tree[bag][b]
		if (m === 0) {
			continue
		}

		total += m * walkQueue(tree, b, m)
	}

	return total
}
