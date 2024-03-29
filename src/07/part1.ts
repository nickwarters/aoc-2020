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
		4,
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
	let total = 0

	const tree: Record<string, Record<string, number>> = {}

	input.split('\n').forEach((line) => {
		const [bag, contains] = line.split(' bags contain ')
		if (!Object.keys(tree).includes(bag)) {
			tree[bag] = { 'shiny gold': 0 }
		}
		contains.split(', ').forEach((item) => {
			if (item.includes('no other bags')) {
				return
			}
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

	const seenWithShinyGold = new Set<string>()
	for (const bag in tree) {
		let countOfShinyGold = tree[bag]['shiny gold']
		if (countOfShinyGold) {
			seenWithShinyGold.add(bag)
			total += 1
			continue
		}

		let b: string | undefined
		const queue: string[] = Object.keys(tree[bag])
		while (countOfShinyGold || queue.length > 0) {
			b = queue.pop()
			if (b === undefined) {
				break
			}
			countOfShinyGold += tree[b]['shiny gold']
			if (countOfShinyGold) {
				seenWithShinyGold.add(b)
			}
			queue.push(...Object.keys(tree[b]).filter((x) => x !== 'shiny gold'))
		}

		if (countOfShinyGold) {
			seenWithShinyGold.add(bag)
			total += 1
		}
	}

	return total
}
