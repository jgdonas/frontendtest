import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '@/stores/game'

describe('Game Store', () => {
  beforeEach(() => {
    // Fresh Pinia instance for every test to prevent state leaking
    setActivePinia(createPinia())
  })

  it('starts with no moves', () => {
    const store = useGameStore()
    expect(store.moves).toHaveLength(0)
  })

  it('records a move correctly', () => {
    const store = useGameStore()

    // Simulate clicking index 0 (Top-left corner -> a8)
    store.addMove(0)

    expect(store.moves).toHaveLength(1)
    expect(store.moves[0]).toBe('a8')
  })

  it('calculates algebraic notation correctly', () => {
    const store = useGameStore()

    // Test a few specific squares
    store.addMove(63) // Bottom-right -> h1
    expect(store.moves[0]).toBe('h1')

    store.addMove(36) // Middle -> e4
    expect(store.moves[1]).toBe('e4')
  })
})
