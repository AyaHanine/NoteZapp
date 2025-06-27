<template>
  <div
    class="bg-white rounded-2xl shadow p-6 flex flex-col h-full border-t-4 border-copper-300 min-h-[200px]"
  >
    <h3 class="font-bold text-copper-900 mb-2 text-lg">{{ note.title }}</h3>
    <div class="text-copper-700 text-sm mb-2">
      {{ formatDate(note.date) }}
    </div>
    <div class="flex-1 text-copper-800 mb-3 text-base">
      {{ note.content }}
    </div>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in note.tags"
        :key="tag"
        class="bg-copper-100 text-copper-700 px-2 py-1 rounded text-xs"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ note: Object })
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "2-digit" });
}
</script>
