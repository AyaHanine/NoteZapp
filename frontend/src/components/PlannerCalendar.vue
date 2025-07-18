<template>
  <div :class="[
    'bg-copper-100 border border-copper-300 rounded-xl',
    mini ? 'p-2 text-sm' : 'p-6'
  ]">
    <!-- Formulaire ajout événement -->
    <div v-if="!hideForm" class="mb-6 space-y-2 bg-copper-50 p-4 rounded-lg border border-copper-300">
      <h3 class="text-copper-900 font-bold text-lg">Ajouter un événement</h3>
      <input v-model="newEvent.title" placeholder="Titre" class="px-3 py-2 rounded w-full border border-copper-200" />
      <input v-model="newEvent.start" type="datetime-local" class="px-3 py-2 rounded w-full border border-copper-200" />
      <input v-model="newEvent.end" type="datetime-local" class="px-3 py-2 rounded w-full border border-copper-200" />
      <button @click="addEvent" class="bg-copper-400 hover:bg-copper-500 text-white px-4 py-2 rounded font-semibold">
        Ajouter
      </button>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 :class="['font-bold text-copper-900', mini ? 'text-lg' : 'text-2xl']">Calendrier</h2>
      <div class="flex items-center space-x-3">
        <button @click="previousMonth" class="bg-copper-300 text-copper-900 p-2 rounded-lg hover:bg-copper-400 transition-colors">
          ◀
        </button>
        <div class="bg-copper-500 text-white px-4 py-1 rounded-lg font-semibold" :class="mini ? 'text-sm' : 'text-lg'">
          {{ currentMonthName }}
        </div>
        <button @click="nextMonth" class="bg-copper-300 text-copper-900 p-2 rounded-lg hover:bg-copper-400 transition-colors">
          ▶
        </button>
      </div>
    </div>

    <!-- Jours de la semaine -->
    <div class="grid grid-cols-7 gap-2 mb-4">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="text-center font-semibold text-copper-600"
        :class="mini ? 'text-xs py-1' : 'text-sm py-3'"
      >
        {{ day }}
      </div>
    </div>

    <!-- Grille du calendrier -->
    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="[
          'relative rounded-lg border-2 transition-all hover:bg-copper-100/80',
mini ? 'min-h-[75px] p-2 text-sm' : 'min-h-[100px] p-2',
          !day.isCurrentMonth ? 'bg-copper-50 text-copper-400 border-copper-300' : 'bg-white border-copper-400',
          day.isToday ? 'border-copper-900' : ''
        ]"
      >
        <div class="flex justify-between items-start mb-1">
          <div
            class="font-semibold"
            :class="{
              'text-copper-400': !day.isCurrentMonth,
              'text-copper-900': day.isCurrentMonth,
              'text-copper-900 font-bold': day.isToday
            }"
          >
            {{ day.day }}
          </div>
        </div>

        <div v-if="day.events?.length" class="space-y-1">
          <div
            v-for="(event, i) in day.events"
            :key="i"
            class="text-xs p-1 rounded-md font-semibold bg-copper-400 text-white truncate"
          >
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { hideForm, mini = false, scrollable = false } = defineProps({
  hideForm: Boolean,
  mini: {
    type: Boolean,
    default: false
  },
  scrollable: {
    type: Boolean,
    default: false
  }
})


const isMini = mini === true



import { ref, computed, onMounted, watch } from "vue"
import axios from "axios"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
const userId = computed(() => userStore.user?.id || localStorage.getItem("userId") || null)

const currentDate = ref(new Date())
const events = ref([])

const newEvent = ref({
  title: "",
  start: "",
  end: "",
  category: "Planner",
  userId: userId.value,
  createdAt: new Date().toISOString()
})

watch(userId, val => {
  newEvent.value.userId = val
})

const fetchEvents = async () => {
  if (!userId.value) return
  const res = await axios.get(`http://localhost:3001/notes?category=Planner&userId=${userId.value}`)
  events.value = Array.isArray(res.data)
    ? res.data.map(e => ({
      ...e,
      start: e.start ? new Date(e.start) : null,
      end: e.end ? new Date(e.end) : null
    }))
    : []
}

const addEvent = async () => {
  if (!newEvent.value.title || !newEvent.value.start || !newEvent.value.end) return
  await axios.post("http://localhost:3001/notes", {
    ...newEvent.value,
    start: new Date(newEvent.value.start).toISOString(),
    end: new Date(newEvent.value.end).toISOString(),
    userId: userId.value,
    createdAt: new Date().toISOString()
  })
  newEvent.value.title = ""
  newEvent.value.start = ""
  newEvent.value.end = ""
  fetchEvents()
}

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
})

const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  let firstDayOfWeek = firstDay.getDay() - 1
  if (firstDayOfWeek < 0) firstDayOfWeek = 6

  const days = []
  const prevMonth = new Date(year, month, 0)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonth.getDate() - i
    days.push({
      day,
      date: new Date(year, month - 1, day),
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    const isToday = isDateToday(date)
    const dayEvents = getEventsForDate(date)
    days.push({
      day,
      date,
      isCurrentMonth: true,
      isToday,
      events: dayEvents
    })
  }

  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }

  return days
})

const isDateToday = (date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const getEventsForDate = (date) => {
  return events.value.filter(e => {
    if (!e.start) return false
    const d = new Date(e.start)
    return (
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    )
  })
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

onMounted(fetchEvents)
</script>
