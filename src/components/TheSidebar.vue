<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const { moves, reset } = useGameStore()
</script>

<template>
  <div class="flex flex-col  p-4">
    <header>
      <div class="flex flex-row justify-between">
        <h2 class="text-xl font-bold mb-4">Moves</h2>
        <span v-if="moves.length > 0" class="select-none cursor-pointer" @click="reset()">🗑️</span>
      </div>

      <div v-if="moves.length === 0">No moves yet...</div>
    </header>

    <div class="lg:overflow-scroll flex-1">
      <div
        v-for="(move, index) in moves"
        v-bind:key="index"
        class="flex px-3 py-2"
        :class="index % 2 === 0 ? 'bg-stone-700' : 'bg-stone-400'"
      >
        <span class="text-stone-500 w-8 mr-2">{{ index + 1 }}.</span>
        <span class="font-bold">{{ move }}</span>
      </div>
    </div>
  </div>
</template>
