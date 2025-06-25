<template>
  <header class="w-full py-6 px-8 flex justify-between items-center bg-white/90 shadow-sm sticky top-0 z-50 backdrop-blur-lg">
    <div class="flex items-center gap-2">
      <svg class="w-9 h-9" viewBox="0 0 50 50" fill="none">
        <ellipse cx="25" cy="25" rx="22" ry="22" :fill="logoColor"/>
        <text x="50%" y="60%" text-anchor="middle" font-size="22" fill="white" font-family="Verdana" dy=".3em">N</text>
      </svg>
      <span class="ml-1 text-2xl font-black text-[#1e293b] tracking-tighter select-none font-sans">NoteZapp</span>
    </div>
    <nav class="flex gap-10 items-center text-base font-semibold">
      <a href="#features" class="text-[#334155] hover:text-[#6366f1] transition">Fonctionnalités</a>
      <a href="#about" class="text-[#334155] hover:text-[#6366f1] transition">À propos</a>
      <a href="#footer" class="text-[#334155] hover:text-[#6366f1] transition">Contact</a>
      <a href="https://github.com/" target="_blank" class="ml-4 px-4 py-2 rounded-full border border-[#6366f1] bg-white hover:bg-indigo-50 text-[#6366f1] transition font-semibold">GitHub</a>
    </nav>
    
  </header>
</template>

<script setup>
const logoColor = "#6366f1"
</script>
