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
Let's find the top three elves with the greatest number of calories and return that sum
"""
def greatest_calorie_elf(elf_dict):
    temp = []
    for elf in elf_dict.keys():
        temp.append(sum(elf_dict[elf]))
    temp.sort()
    return sum(temp[len(temp) - 3:len(temp):])

"""
Print how many calories the top three elves are carrying
"""
def main():
    elf_dict = get_dict_data()
    answer = greatest_calorie_elf(elf_dict)
    print(answer) # correct
main()