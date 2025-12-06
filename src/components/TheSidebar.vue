<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const { moves } = useGameStore()
</script>

<template>
  <div class="flex flex-col bg-stone-800 text-stone-200 p-4">
    <h2 class="text-xl font-bold mb-4">Moves</h2>

    <div v-if="moves.length === 0">No moves yet...</div>

    <div
      v-for="(move, index) in moves"
      v-bind:key="move"
      class="flex px-3 py-2"
      :class="index % 2 === 0 ? 'bg-stone-700' : 'bg-stone-800'"
    >
      <span class="text-stone-500 w-8 mr-2">{{ index + 1 }}.</span>
      <span class="font-bold">{{ move }}</span>
    </div>
  </div>
</template>
