'''
return pairs as [low, high] in arr
'''
def create_data_structure():
    all_left, all_right = [], []
    with open('large.txt') as file:
        for line in file:
            temp = line.rstrip()
            pairs = temp.split(',')
            left = pairs[0].split('-')
            right = pairs[1].split('-')
            all_left.append([int(l) for l in left])
            all_right.append([int(r) for r in right])
    return all_left, all_right

'''
compute overlap of pairs
'''
def find_overlap(arr1, arr2):
    count = 0
    for i in range(len(arr1)):
        if arr1[i][0] >= arr2[i][0] and arr1[i][1] <= arr2[i][1]:
            count += 1
        elif arr2[i][0] >= arr1[i][0] and arr2[i][1] <= arr1[i][1]:
            count += 1
        else:
            pass
    return count

'''
run code
'''
def main():
    pairs = create_data_structure()
    answer = find_overlap(pairs[0], pairs[1])
    print(answer) # correct

main()