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
        if arr2[i][0] <= arr1[i][0]:
            arr1[i], arr2[i] = arr2[i], arr1[i]         
        if arr1[i][1] >= arr2[i][0]:
            count += 1
    return count

'''
run code
'''
def main():
    pairs = create_data_structure()
    answer = find_overlap(pairs[0], pairs[1])
    print(answer) # correct
main()