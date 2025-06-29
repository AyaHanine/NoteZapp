<template>
  <button
    class="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition
      font-medium text-left
      hover:bg-copper-800
      focus:outline-none"
    :class="{
      'bg-copper-800 shadow text-copper-400': active && !danger,
      'bg-copper-700 text-copper-300 shadow': active && danger,
      'text-copper-100': !active,
      'hover:text-copper-300': !danger,
      'hover:text-red-400': danger
    }"
    @click="$emit('click')"
  >
    <span v-if="icon" :class="['mdi', icon, 'text-lg', danger ? 'text-red-400' : active ? 'text-copper-400' : 'text-copper-200']"></span>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  label: String,
  icon: String,
  active: Boolean,
  danger: Boolean
});
</script>
