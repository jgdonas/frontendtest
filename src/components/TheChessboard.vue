<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'

const NUMBER_OF_FILES = 8
const NUMBER_OF_RANKS = 8
const NUMBER_OF_SQUARES = NUMBER_OF_FILES * NUMBER_OF_RANKS

const clickedSquares = ref<Array<boolean>>([])

const { addMove } = useGameStore()

const isDarkSquare = (index: number) => {
  const file = Math.floor(index / NUMBER_OF_FILES)
  const rank = index % NUMBER_OF_RANKS

  return file % 2 !== rank % 2
}

const onSquareClicked = (index: number) => {
  // Store the move
  addMove(index)

  // Mark square as clicked
  clickedSquares.value[index] = true
}
</script>

<template>
  <div class="w-full grid grid-cols-8 border border-black cursor-pointer">
    <div
      v-for="(_, index) in NUMBER_OF_SQUARES"
      v-bind:key="index"
      class="col-span-1 aspect-square"
      :class="{
        'bg-green-400': isDarkSquare(index),
        'bg-green-700': clickedSquares[index] && isDarkSquare(index),
        'bg-gray-300': clickedSquares[index] && !isDarkSquare(index),
      }"
      @click="onSquareClicked(index)"
    ></div>
  </div>
</template>
