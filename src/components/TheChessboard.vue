<script setup lang="ts">
const NUMBER_OF_SQUARES = 64

const isDarkSquare = (index: number) => ((index % 2) + Math.ceil(index / 8)) % 2
</script>

<template>
  <div class="w-full grid grid-cols-8 border border-black">
    <div
      v-for="value in NUMBER_OF_SQUARES"
      v-bind:key="value"
      class="col-span-1 aspect-square"
      :class="{ 'bg-green-600': isDarkSquare(value) }"
    ></div>
  </div>
</template>
s
