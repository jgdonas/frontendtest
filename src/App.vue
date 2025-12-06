<script setup lang="ts">
import TheChessBoard from '@/components/TheChessboard.vue'
import TheSidebar from '@/components/TheSidebar.vue'
</script>

<template>
  <div class="h-screen w-screen flex flex-col lg:flex-row items-center p-1 gap-1">
    <main class="w-full aspect-square flex flex-col justify-center">
      <TheChessBoard></TheChessBoard>
    </main>

    <aside
      class="h-full w-full lg:w-80 lg:h-auto lg:self-stretch bg-stone-700 rounded-lg shadow-xl flex flex-col overflow-y-auto"
    >
      <TheSidebar></TheSidebar>
    </aside>
  </div>
</template>

<style scoped></style>
