from collections import Counter

with open("small.txt") as f:
    lines = [line.strip() for line in f.readlines()]

template = lines[0]
letters = Counter(template)
pairs = Counter([a+b for a,b in zip(template,template[1:])])

rules = dict()
for line in lines[2:]:
    a,b,c = line[0],line[1],line[-1]
    rules[a+b] = c

# print(rules.items())
# print(pairs)
print(pairs)
print(letters)

for _ in range(40):
    oldpairs = pairs.copy()
    for (a,b),c in rules.items():
        count = oldpairs[a+b]
        pairs[a+b] -= count
        pairs[a+c] += count
        pairs[c+b] += count
        letters[c] += count

# print(letters.most_common())
print(letters.most_common()[0][1]-letters.most_common()[-1][1])