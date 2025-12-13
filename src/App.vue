<script setup lang="ts">
import TheChessboard from '@/components/TheChessboard.vue'
import TheSidebar from '@/components/TheSidebar.vue'
</script>

<template>
  <div class="w-screen h-screen flex flex-col lg:flex-row items-center">
    <div class="w-screen">
      <main class="aspect-square max-w-svh m-auto p-1"><TheChessboard /></main>
    </div>
    <aside class="w-full h-full">
      <TheSidebar class="h-full" />
    </aside>
  </div>
</template>
