"""
Let's store the elves as dictionary keys and their food items as values in an array
"""
def get_dict_data():
    result = {'elf_0': []}
    count = 0
    with open('large.txt') as file:
        for line in file:
            temp = line.rstrip()
            if temp == '':
                count += 1
                result['elf_' + str(count)] = []
            else:
                result['elf_' + str(count)].append(int(temp))
    return result

"""
Let's find the elf with the greatest number of calories
"""
def greatest_calorie_elf(elf_dict):
    max_calories = float('-inf')
    for elf in elf_dict.keys():
        max_calories = max(max_calories, sum(elf_dict[elf]))
    return max_calories

"""
Print how many calories the elf carrying the most calories has
"""
def main():
    elf_dict = get_dict_data()
    answer = greatest_calorie_elf(elf_dict)
    print(answer) # correct
main()