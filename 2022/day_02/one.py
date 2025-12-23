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
Get our score if we follow the strategy guide
"""
def get_score(moves):
    score_hash = {
        'X': 1,
        'Y': 2,
        'Z': 3
    }
    rule_hash = {
        'X': ['C','A','B'],
        'Y': ['A','B','C'],
        'Z': ['B','C','A']
    }
    score = 0
    N = len(moves[0])
    for i in range(N):
        opp_move = moves[0][i] 
        our_move = moves[1][i]

        win_or_draw = rule_hash[our_move].index(opp_move)

        if win_or_draw == 0:
            score += 6
        if win_or_draw == 1:
            score += 3

        score += score_hash[our_move]
    return score

"""
Run code
"""
def main():
    moves = create_data_structure()
    answer = get_score(moves)
    print(answer) # correct
main()