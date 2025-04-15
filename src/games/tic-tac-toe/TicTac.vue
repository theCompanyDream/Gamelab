<template>
    <main>
        <h1 className="text-center text-2xl m-3 font-bold">Tic Tac Toe</h1>
        <section id="board">
            <div
                v-for="(cell, index) in board"
                :key="index"
                class="cell"
                @click="makeMove(index)"
            >
                {{ cell }}
            </div>
            <button className="m-4 bg-purple-300 border-black" @click="resetGame">Reset</button>
            <p v-if="winner">Winner: {{ winner }}</p>
            <p v-if="isDraw && !winner">It's a draw!</p>
        </section>
    </main>
</template>

<script>
export default {
    data() {
        return {
            board: Array(9).fill(''),
            currentPlayer: 'O',
            winner: null,
            isDraw: false,
        };
    },
    methods: {
        makeMove(index) {
            if (this.board[index] === '' && !this.winner) {
                this.board[index] = this.currentPlayer;
                this.checkForWinner();
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                if (!this.winner && !this.isDraw) {
                    setTimeout(this.computerMove, 400)
                }
            }
        },
        computerMove() {
            const bestMove = this.minimax(this.board, this.currentPlayer);
            this.board[bestMove.index] = this.currentPlayer;
            this.checkForWinner();
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        },
        minimax(board, player) {
            const scores = {
                'X': 1,
                'O': -1,
                'draw': 0,
            };

            // Check for terminal state
            const winner = this.checkWinner(board);
            if (winner) {
                return { score: scores[winner] };
            }

            const availableMoves = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
            let bestMove;

            if (player === 'X') {
                let bestScore = -Infinity; // Maximize for X
                for (const move of availableMoves) {
                    board[move] = player; // Make the move
                    const score = this.minimax(board, 'O').score; // Recursively call minimax
                    board[move] = ''; // Undo the move

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { index: move, score: bestScore };
                    }
                }
            } else {
                let bestScore = Infinity; // Minimize for O
                for (const move of availableMoves) {
                    board[move] = player; // Make the move
                    const score = this.minimax(board, 'X').score; // Recursively call minimax
                    board[move] = ''; // Undo the move

                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = { index: move, score: bestScore };
                    }
                }
            }
            return bestMove;
        },
        checkWinner(board) {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (const condition of winningConditions) {
                const [a, b, c] = condition;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a]; // Return winner ('X' or 'O')
                }
            }

            if (!board.includes('')) {
                return 'draw';
            }

            return null; // No winner yet
        },
        checkForWinner() {
            const winner = this.checkWinner(this.board);
            if (winner) {
                this.winner = winner === 'draw' ? null : winner;
                this.isDraw = winner === 'draw';
            }
        },
        resetGame() {
            this.board = Array(9).fill('');
            this.currentPlayer = 'O';
            this.winner = null;
            this.isDraw = false;
        },
    },
};
</script>

<style scoped>
#board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
    margin: 0 auto; /* Centers the board horizontally */
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* Ensures elements like the heading and button are stacked */
}

.cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border: 2px solid #333;
    font-size: 2em;
    cursor: pointer;
}
</style>
