"""
return array of everyones rucksack as str
"""
def create_data_structure():
    result = []
    with open('large.txt') as file:
        for line in file:
            temp = line.rstrip()
            result.append(temp)
    return result

"""
return the common item in three rucksacks
"""
def common_three(bag1, bag2, bag3):
    duplicates = {}

    for item in bag1:
        duplicates[item] = 1
    
    for item in bag2:
        if item in duplicates:
            duplicates[item] = 2

    for item in bag3:
        if item in duplicates and duplicates[item] == 2:
            return item

    raise Exception('no item carried by all three elves')

"""
step through three rucksacks at a time
"""
def main():
    alphabet = 'abcdefghijklmnopqrstuvwzyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    scores = {}
    count = 1
    for letter in alphabet:
        scores[letter] = count
        count += 1

    result = 0
    rucksacks = create_data_structure()
    for i in range(0, len(rucksacks), 3):
        result += scores[common_three(rucksacks[i], rucksacks[i + 1], rucksacks[i + 2])]
    print(result) # correct

main()
