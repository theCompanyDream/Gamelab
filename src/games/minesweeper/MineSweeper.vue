<template>
  <main class="mx-auto p-6 bg-white rounded-xl shadow-lg">
    <!-- Game Header -->
    <header class="text-center mb-6">
      <h1 class="text-3xl font-bold mb-4">💣 Minesweeper</h1>

      <!-- Game Stats -->
      <div class="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <div class="text-center">
          <div class="text-2xl font-mono font-bold text-red-600">💣 {{ minesLeft }}</div>
          <div class="text-sm">Mines Left</div>
        </div>

        <div class="text-center">
          <button
            @click="resetGame"
            class="text-4xl hover:scale-110 transition-transform duration-200"
          >
            {{ gameStatus === 'playing' ? '😊' : gameStatus === 'won' ? '😎' : '😵' }}
          </button>
        </div>

        <div class="text-center">
          <div class="text-2xl font-mono font-bold text-blue-600">⏱️ {{ formatTime(timer) }}</div>
          <div class="text-sm">Time</div>
        </div>
      </div>

      <!-- Difficulty Buttons -->
      <div class="flex gap-2 justify-center">
        <button
          @click="setDifficulty('easy')"
          :class="difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200'"
          class="px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Easy (9x9)
        </button>
        <button
          @click="setDifficulty('medium')"
          :class="difficulty === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200'"
          class="px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Medium (16x16)
        </button>
        <button
          @click="setDifficulty('hard')"
          :class="difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200'"
          class="px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Hard (16x30)
        </button>
      </div>
    </header>

    <!-- Game Board -->
    <section
      class="inline-block bg-gray-300 rounded-lg mx-auto"
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, auto)`,
        width: `${cols * 24}px`,
      }"
    >
      <div
        v-for="(cell, index) in board"
        :key="index"
        @click="revealCell(cell)"
        @contextmenu.prevent="flagCell(cell)"
        :class="getCellClass(cell)"
        class="w-6 h-6 flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-150 hover:brightness-110 select-none"
      >
        {{ getCellContent(cell) }}
      </div>
    </section>

    <!-- Instructions -->
    <section class="mt-6 text-sm text-center">
      <p><strong>Left click:</strong> Reveal cell | <strong>Right click:</strong> Flag/unflag</p>
      <p>Find all cells without mines to win!</p>
    </section>

    <!-- Win/Lose Modal -->
    <section v-if="gameStatus !== 'playing'" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 text-center max-w-sm">
        <div class="text-6xl mb-4">
          {{ gameStatus === 'won' ? '🎉' : '💥' }}
        </div>
        <h2 class="text-2xl font-bold mb-4">
          {{ gameStatus === 'won' ? 'You Won!' : 'Game Over!' }}
        </h2>
        <p class="mb-6">
          Time: {{ formatTime(timer) }}
        </p>
        <button
          @click="resetGame"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Play Again
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Types
interface Cell {
  row: number
  col: number
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMines: number
}

type GameStatus = 'playing' | 'won' | 'lost'
type Difficulty = 'easy' | 'medium' | 'hard'

// Game state
const board = ref<Cell[]>([])
const gameStatus = ref<GameStatus>('playing')
const difficulty = ref<Difficulty>('easy')
const timer = ref(0)
const gameStarted = ref(false)
let timerInterval: NodeJS.Timeout | null = null

// Game configuration
const configs = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 }
}

// Computed properties
const currentConfig = computed(() => configs[difficulty.value])
const rows = computed(() => currentConfig.value.rows)
const cols = computed(() => currentConfig.value.cols)
const totalMines = computed(() => currentConfig.value.mines)

const minesLeft = computed(() => {
  const flaggedCount = board.value.filter(cell => cell.isFlagged).length
  return totalMines.value - flaggedCount
})

// Game logic
const initializeBoard = () => {
  board.value = []
  gameStatus.value = 'playing'
  timer.value = 0
  gameStarted.value = false
  stopTimer()

  // Create empty board
  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < cols.value; col++) {
      board.value.push({
        row,
        col,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0
      })
    }
  }
}

const placeMines = (firstClickRow: number, firstClickCol: number) => {
  const minePositions = new Set<string>()

  while (minePositions.size < totalMines.value) {
    const row = Math.floor(Math.random() * rows.value)
    const col = Math.floor(Math.random() * cols.value)
    const position = `${row},${col}`

    // Don't place mine on first click or adjacent cells
    if (Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1) {
      continue
    }

    minePositions.add(position)
  }

  // Place mines on board
  minePositions.forEach(position => {
    const [row, col] = position.split(',').map(Number)
    const cell = getCell(row, col)
    if (cell) {
      cell.isMine = true
    }
  })

  // Calculate neighbor mine counts
  board.value.forEach(cell => {
    if (!cell.isMine) {
      cell.neighborMines = countNeighborMines(cell.row, cell.col)
    }
  })
}

const getCell = (row: number, col: number): Cell | undefined => {
  return board.value.find(cell => cell.row === row && cell.col === col)
}

const countNeighborMines = (row: number, col: number): number => {
  let count = 0

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue

      const neighbor = getCell(row + dr, col + dc)
      if (neighbor?.isMine) count++
    }
  }

  return count
}

const revealCell = (cell: Cell) => {
  if (gameStatus.value !== 'playing' || cell.isRevealed || cell.isFlagged) return

  // First click - place mines
  if (!gameStarted.value) {
    gameStarted.value = true
    placeMines(cell.row, cell.col)
    startTimer()
  }

  cell.isRevealed = true

  if (cell.isMine) {
    gameStatus.value = 'lost'
    revealAllMines()
    stopTimer()
    return
  }

  // Auto-reveal empty cells
  if (cell.neighborMines === 0) {
    revealNeighbors(cell.row, cell.col)
  }

  checkWinCondition()
}

const revealNeighbors = (row: number, col: number) => {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue

      const neighbor = getCell(row + dr, col + dc)
      if (neighbor && !neighbor.isRevealed && !neighbor.isFlagged) {
        revealCell(neighbor)
      }
    }
  }
}

const flagCell = (cell: Cell) => {
  if (gameStatus.value !== 'playing' || cell.isRevealed) return

  cell.isFlagged = !cell.isFlagged
}

const revealAllMines = () => {
  board.value.forEach(cell => {
    if (cell.isMine) {
      cell.isRevealed = true
    }
  })
}

const checkWinCondition = () => {
  const unrevealedNonMines = board.value.filter(cell => !cell.isRevealed && !cell.isMine)

  if (unrevealedNonMines.length === 0) {
    gameStatus.value = 'won'
    stopTimer()
  }
}

// Timer functions
const startTimer = () => {
  timerInterval = setInterval(() => {
    timer.value++
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// UI functions
const getCellClass = (cell: Cell): string => {
  const baseClass = 'border-2'

  if (!cell.isRevealed) {
    return `${baseClass} bg-gray-400 border-gray-500 hover:bg-gray-300`
  }

  if (cell.isMine) {
    return `${baseClass} bg-red-500 border-red-600`
  }

  return `${baseClass} bg-white border-gray-300`
}

const getCellContent = (cell: Cell): string => {
  if (cell.isFlagged) return '🚩'
  if (!cell.isRevealed) return ''
  if (cell.isMine) return '💣'
  if (cell.neighborMines === 0) return ''
  return cell.neighborMines.toString()
}

const setDifficulty = (newDifficulty: Difficulty) => {
  difficulty.value = newDifficulty
  resetGame()
}

const resetGame = () => {
  initializeBoard()
}

// Lifecycle
onMounted(() => {
  initializeBoard()
})

onUnmounted(() => {
  stopTimer()
})
</script>
