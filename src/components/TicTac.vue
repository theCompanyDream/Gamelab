<!-- src/TicTacToe.vue -->
<template>
    <div>
        <h1>Tic Tac Toe</h1>
        <div id="board">
            <div
                v-for="(cell, index) in board"
                :key="index"
                class="cell"
                @click="makeMove(index)"
            >
                {{ cell }}
            </div>
        </div>
        <button @click="resetGame">Reset</button>
        <p v-if="winner">Winner: {{ winner }}</p>
        <p v-if="isDraw && !winner">It's a draw!</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            board: Array(9).fill(''),
            currentPlayer: 'X',
            winner: null,
            isDraw: false,
        };
    },
    methods: {
        makeMove(index) {
            if (this.board[index] === '' && !this.winner) {
                this.board[index] = this.currentPlayer; // Direct assignment
                this.checkForWinner();
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        },
        checkForWinner() {
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
                if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                    this.winner = this.board[a];
                    return;
                }
            }

            if (!this.board.includes('')) {
                this.isDraw = true;
            }
        },
        resetGame() {
            this.board = Array(9).fill('');
            this.currentPlayer = 'X';
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
