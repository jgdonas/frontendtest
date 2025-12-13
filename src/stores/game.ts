import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export const useGameStore = defineStore('game', () => {
  // State
  const moves = ref<string[]>([])

  // Actions
  /**
   * Computes the square algebraic notation based on its index (0 => 'a8', 63 => 'h1')
   * and updates the store state.
   * @param squareIndex
   */
  const addMove = (squareIndex: number) => {
    const file = files[squareIndex % 8]
    const rank = 8 - Math.floor(squareIndex / 8)

    const square = `${file}${rank}`

    // Update state
    moves.value.push(square)
  }

  const reset = () => {
    moves.value.splice(0, moves.value.length)
  }

  // Getters
  const moveCount = computed(() => moves.value.length)

  return { addMove, moveCount, moves, reset }
})
