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
return duplicate item in each compartment of the rucksack
"""
def find_duplicate(rucksack):
    N = len(rucksack)
    comp_one = rucksack[0:N//2:]
    comp_two = rucksack[N//2:N:]
    duplicates = {}
    for item in comp_one:
        duplicates[item] = 1
    
    for item in comp_two:
        if item in duplicates:
            return item

    raise Exception("No duplicate found")

"""
assign priorities according to alphabetization
"""
def main():
    alphabet = 'abcdefghijklmnopqrstuvwzyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    scores = {}
    counter = 1
    for letter in alphabet:
        scores[letter] = counter
        counter += 1

    rucksacks = create_data_structure()
    result = 0
    for rucksack in rucksacks:
        result += scores[find_duplicate(rucksack)]
    print(result) # correct

main()