def perform_smith_waterman(seq1: str, seq2: str, match: int, mismatch: int, gap: int):
    m = len(seq1) + 1
    n = len(seq2) + 1
    
    # Initialize DP matrix with zeros
    matrix = [[0 for _ in range(n)] for _ in range(m)]
    
    max_score = 0
    max_pos = [] # Could be multiple max positions, storing all
    
    # Fill the matrix
    for i in range(1, m):
        for j in range(1, n):
            is_match = seq1[i-1] == seq2[j-1]
            score_diag = matrix[i-1][j-1] + (match if is_match else mismatch)
            score_up = matrix[i-1][j] + gap
            score_left = matrix[i][j-1] + gap
            
            # Local alignment allows score to drop to zero
            current_score = max(0, score_diag, score_up, score_left)
            matrix[i][j] = current_score
            
            if current_score > max_score:
                max_score = current_score
                max_pos = [(i, j)]
            elif current_score == max_score and current_score > 0:
                max_pos.append((i, j))

    # Traceback (only taking the first max pos for simplicity, could be extended to show all)
    paths = []
    if max_score > 0 and max_pos:
        curr_i, curr_j = max_pos[0]
        paths.append((curr_i, curr_j))
        
        while matrix[curr_i][curr_j] > 0:
            current_score = matrix[curr_i][curr_j]
            
            is_match = seq1[curr_i-1] == seq2[curr_j-1]
            score_diag = matrix[curr_i-1][curr_j-1] + (match if is_match else mismatch)
            score_up = matrix[curr_i-1][curr_j] + gap
            score_left = matrix[curr_i][curr_j-1] + gap
            
            # Find which direction we came from
            if current_score == max(0, score_diag) and curr_i > 0 and curr_j > 0:
                curr_i -= 1
                curr_j -= 1
            elif current_score == score_up and curr_i > 0:
                curr_i -= 1
            elif current_score == score_left and curr_j > 0:
                curr_j -= 1
            else:
                break # Should not happen if matrix is correct
                
            if matrix[curr_i][curr_j] > 0:
                paths.append((curr_i, curr_j))
            else:
                break
                
    return {
        "matrix": matrix,
        "paths": paths,
        "seq1": list(seq1),
        "seq2": list(seq2),
        "score": max_score
    }
