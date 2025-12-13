<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { onUnmounted, ref } from 'vue'

const NUMBER_OF_FILES = 8
const NUMBER_OF_RANKS = 8
const NUMBER_OF_SQUARES = NUMBER_OF_FILES * NUMBER_OF_RANKS

const { addMove, $onAction } = useGameStore()

const selectedSquares = ref<Set<number>>(new Set())

const isDarkSquare = (index: number) => {
  const file = Math.floor(index / NUMBER_OF_FILES)
  const rank = index % NUMBER_OF_RANKS

  return file % 2 !== rank % 2
}

const squareSelected = (index: number) => {
  addMove(index)

  if (selectedSquares.value.has(index)) {
    selectedSquares.value.delete(index)
  } else {
    selectedSquares.value.add(index)
  }
}

// Maybe not my preferred way of communicating components, but it's fine to learn a new thing
// from 'pinia' 😉 (https://pinia.vuejs.org/core-concepts/actions.html).
const unsuscribe = $onAction(({ name }) => {
  if (name === 'reset') {
    selectedSquares.value.clear()
  }
})

onUnmounted(unsuscribe)
</script>

<template>
  <div class="w-full grid grid-cols-8 cursor-pointer bg-white">
    <div
      v-for="(_, index) in NUMBER_OF_SQUARES"
      v-bind:key="index"
      class="col-span-1 aspect-square"
      :class="{
        'bg-green-400': isDarkSquare(index),
        'bg-green-700': selectedSquares.has(index) && isDarkSquare(index),
        'bg-gray-300': selectedSquares.has(index) && !isDarkSquare(index),
      }"
      @click="squareSelected(index)"
    ></div>
  </div>
</template>
