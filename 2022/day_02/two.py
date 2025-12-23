"""
Store our opponents moves and our moves as arrays in a tuple
"""
def create_data_structure():
    opponent_moves = []
    our_moves = []
    with open('large.txt') as file:
        for line in file:
            temp = line.rstrip()
            opponent_moves.append(temp.split(' ')[0])
            our_moves.append(temp.split(' ')[1])
    return opponent_moves, our_moves

"""
Get score according to the new strategy guide
"""
def get_score(moves):
    score_guide = {
        'X': 0,
        'Y': 3,
        'Z': 6,
    }
    move_guide = {
        'A': [2,1,3],
        'B': [3,2,1],
        'C': [1,3,2],
    }
    score = 0
    N = len(moves[0])

    for i in range(N):
        opp_move = moves[0][i]
        strategy = moves[1][i]

        outcome = score_guide[strategy]
    
        if outcome == 6:
            score += move_guide[opp_move][0] + 6
        elif outcome == 3:
            score += move_guide[opp_move][1] + 3
        else:
            score += move_guide[opp_move][2] + 0

    return score

"""
Run code
"""
def main():
    moves = create_data_structure()
    answer = get_score(moves)
    print(answer) # correct
main()