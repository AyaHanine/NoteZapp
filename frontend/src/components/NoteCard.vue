<template>
  <div class="note-card-fixed relative bg-white rounded-2xl shadow p-6 flex flex-col">


  <!-- Bloc étoile favoris + pin rouge -->
<div class="absolute top-4 right-4 flex items-center gap-2">
  <!-- Etoile favoris -->
  <button
    class="focus:outline-none"
    @click.stop="toggleFavorite"
    :aria-label="note.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
  >
    <svg
      class="w-7 h-7 transition"
      :class="note.favorite ? 'text-yellow-400' : 'text-copper-300 hover:text-yellow-400'"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path :d="starPath" />
    </svg>
  </button>
  <!-- Pin rouge -->
  <span v-if="note.pinned" title="Note épinglée" class="ml-1 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-red-500"
      fill="currentColor"
      viewBox="0 0 24 24"
      style="vertical-align: middle;">
      <path d="M15.9894 4.9502L16.52 4.42014L16.52 4.42014L15.9894 4.9502ZM19.0717 8.03562L18.5411 8.56568L18.5411 8.56568L19.0717 8.03562ZM8.73845 19.429L8.20785 19.9591L8.73845 19.429ZM4.62176 15.3081L5.15236 14.7781L4.62176 15.3081ZM17.567 14.9943L17.3032 14.2922L17.567 14.9943ZM15.6499 15.7146L15.9137 16.4167L15.6499 15.7146ZM8.33227 8.38177L7.62805 8.12375H7.62805L8.33227 8.38177ZM9.02673 6.48636L9.73095 6.74438L9.02673 6.48636ZM5.84512 10.6735L6.04445 11.3965H6.04445L5.84512 10.6735ZM7.30174 10.1351L6.86354 9.52646L6.86354 9.52646L7.30174 10.1351ZM7.6759 9.79038L8.24673 10.2768H8.24673L7.6759 9.79038ZM14.2511 16.3805L14.7421 16.9475L14.7421 16.9475L14.2511 16.3805ZM13.3807 18.2012L12.6575 18.0022V18.0022L13.3807 18.2012ZM13.917 16.7466L13.3076 16.3094L13.3076 16.3094L13.917 16.7466ZM2.71854 12.7552L1.96855 12.76V12.76L2.71854 12.7552ZM2.93053 11.9521L2.28061 11.5778H2.28061L2.93053 11.9521ZM11.3053 21.3431L11.3064 20.5931H11.3064L11.3053 21.3431ZM12.0933 21.1347L11.7216 20.4833L11.7216 20.4833L12.0933 21.1347ZM11.6973 2.03606L11.8589 2.76845L11.6973 2.03606ZM15.4588 5.48026L18.5411 8.56568L19.6023 7.50556L16.52 4.42014L15.4588 5.48026ZM9.26905 18.8989L5.15236 14.7781L4.09116 15.8382L8.20785 19.9591L9.26905 18.8989ZM17.3032 14.2922L15.3861 15.0125L15.9137 16.4167L17.8308 15.6964L17.3032 14.2922ZM9.03649 8.63979L9.73095 6.74438L8.32251 6.22834L7.62805 8.12375L9.03649 8.63979ZM6.04445 11.3965C6.75591 11.2003 7.29726 11.0625 7.73995 10.7438L6.86354 9.52646C6.6906 9.65097 6.46608 9.72428 5.64578 9.95044L6.04445 11.3965ZM7.62805 8.12375C7.3351 8.92332 7.24345 9.14153 7.10507 9.30391L8.24673 10.2768C8.60048 9.86175 8.78237 9.33337 9.03649 8.63979L7.62805 8.12375ZM7.73995 10.7438C7.92704 10.6091 8.09719 10.4523 8.24673 10.2768L7.10507 9.30391C7.03377 9.38757 6.95268 9.46229 6.86354 9.52646L7.73995 10.7438ZM15.3861 15.0125C14.697 15.2714 14.1717 15.4571 13.7601 15.8135L14.7421 16.9475C14.9029 16.8082 15.1193 16.7152 15.9137 16.4167L15.3861 15.0125ZM14.1038 18.4001C14.3291 17.5813 14.4022 17.3569 14.5263 17.1838L13.3076 16.3094C12.9903 16.7517 12.853 17.2919 12.6575 18.0022L14.1038 18.4001ZM13.7601 15.8135C13.5904 15.9605 13.4385 16.1269 13.3076 16.3094L14.5263 17.1838C14.5888 17.0968 14.6612 17.0175 14.7421 16.9475L13.7601 15.8135ZM5.15236 14.7781C4.50623 14.1313 4.06806 13.691 3.78374 13.3338C3.49842 12.9753 3.46896 12.8201 3.46852 12.7505L1.96855 12.76C1.97223 13.3422 2.26135 13.8297 2.6101 14.2679C2.95984 14.7073 3.47123 15.2176 4.09116 15.8382L5.15236 14.7781ZM5.64578 9.95044C4.80056 10.1835 4.10403 10.3743 3.58304 10.5835C3.06349 10.792 2.57124 11.0732 2.28061 11.5778L3.58045 12.3264C3.61507 12.2663 3.717 12.146 4.14187 11.9755C4.56531 11.8055 5.16345 11.6394 6.04445 11.3965L5.64578 9.95044ZM3.46852 12.7505C3.46758 12.6016 3.50623 12.4553 3.58045 12.3264L2.28061 11.5778C2.07362 11.9372 1.96593 12.3452 1.96855 12.76L3.46852 12.7505ZM8.20785 19.9591C8.83172 20.5836 9.34472 21.0987 9.78654 21.4506C10.2271 21.8015 10.718 22.0922 11.3042 22.0931L11.3064 20.5931C11.237 20.593 11.0815 20.5644 10.7211 20.2773C10.3619 19.9912 9.91931 19.5499 9.26905 18.8989L8.20785 19.9591ZM12.6575 18.0022C12.4133 18.8897 12.2463 19.4924 12.0752 19.9188C11.9034 20.3467 11.7822 20.4487 11.7216 20.4833L12.4651 21.7861C12.9741 21.4956 13.2573 21.0004 13.4672 20.4775C13.6777 19.9532 13.8695 19.2516 14.1038 18.4001L12.6575 18.0022ZM11.3042 22.0931C11.7113 22.0937 12.1115 21.9879 12.4651 21.7861L11.7216 20.4833C11.5951 20.5555 11.452 20.5933 11.3064 20.5931L11.3042 22.0931ZM18.5411 8.56568C19.6046 9.63022 20.3403 10.3695 20.7918 10.9788C21.2353 11.5774 21.2864 11.8959 21.2322 12.1464L22.6983 12.4634C22.8882 11.5854 22.5383 10.8162 21.997 10.0857C21.4636 9.36592 20.6306 8.53486 19.6023 7.50556L18.5411 8.56568ZM17.8308 15.6964C19.1922 15.1849 20.2941 14.773 21.0771 14.3384C21.8719 13.8973 22.5084 13.3416 22.6983 12.4634L21.2322 12.1464C21.178 12.3968 21.0002 12.6655 20.3492 13.0268C19.6865 13.3946 18.7113 13.7632 17.3032 14.2922L17.8308 15.6964ZM16.52 4.42014C15.4841 3.3832 14.6481 2.54353 13.9246 2.00638C13.1909 1.46165 12.4175 1.10912 11.5357 1.30367L11.8589 2.76845C12.1086 2.71335 12.4278 2.7633 13.0305 3.21075C13.6434 3.66579 14.3877 4.40801 15.4588 5.48026L16.52 4.42014ZM9.73095 6.74438C10.2526 5.32075 10.6162 4.33403 10.9813 3.66315C11.3403 3.00338 11.6091 2.82357 11.8589 2.76845L11.5357 1.30367C10.6541 1.49819 10.1006 2.14332 9.6637 2.94618C9.23286 3.73793 8.82695 4.85154 8.32251 6.22834L9.73095 6.74438Z" fill="currentColor"/>
      <path opacity="0.5" d="M1.4694 21.4697C1.17666 21.7627 1.1769 22.2376 1.46994 22.5304C1.76298 22.8231 2.23786 22.8229 2.5306 22.5298L1.4694 21.4697ZM7.18383 17.8719C7.47657 17.5788 7.47633 17.1039 7.18329 16.8112C6.89024 16.5185 6.41537 16.5187 6.12263 16.8117L7.18383 17.8719ZM2.5306 22.5298L7.18383 17.8719L6.12263 16.8117L1.4694 21.4697L2.5306 22.5298Z" fill="currentColor"/>
    </svg>
  </span>
</div>



    <!-- Contenu note -->
    <h3 class="font-bold text-xl mb-2 text-copper-900 truncate" :title="note.title">{{ note.title }}</h3>
    <div class="text-copper-700 text-sm mb-3">{{ formatDate(note.date) }}</div>
    <div class="flex-1 text-copper-900 note-content" v-html="note.content"></div>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="tag in note.tags"
        :key="tag"
        class="bg-copper-100 text-copper-700 rounded-xl px-3 py-1 text-xs font-semibold"
      >
        #{{ tag }}
      </span>
    </div>

    <!-- Boutons poubelle et menu "..." -->
    <div class="absolute bottom-4 right-4 flex items-center gap-2 z-10">
      <!-- Poubelle -->
      <button
        class="focus:outline-none"
        @click.stop="deleteNote"
        aria-label="Supprimer la note"
      >
        <svg class="w-6 h-6 text-copper-300 hover:text-red-400 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8" />
        </svg>
      </button>

      <!-- Bouton Modifier (icône crayon) -->
      <button
        class="focus:outline-none"
        @click.stop="editNote"
        aria-label="Modifier la note"
      >
        <svg class="w-6 h-6 text-copper-300 hover:text-copper-500 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z"/>
        </svg>
      </button>

      <!-- 3 points menu -->
      <div class="relative">
        <button
          class="focus:outline-none"
          @click.stop="showMenu = !showMenu"
          aria-label="Actions"
        >
          <svg class="w-6 h-6 text-copper-300 hover:text-copper-500 transition" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="4" cy="10" r="2"/>
            <circle cx="10" cy="10" r="2"/>
            <circle cx="16" cy="10" r="2"/>
          </svg>
        </button>
        <transition name="fade">
          <div
            v-if="showMenu"
            class="absolute right-0 bottom-8 w-36 bg-white rounded-xl shadow-lg border border-gray-100 z-30"
          >
            <ul class="py-1">
              <li>
                <button
                  class="w-full px-4 py-2 flex items-center gap-2 text-copper-700 hover:bg-copper-50"
                  @click="handlePin"
                >
                  <svg v-if="note.pinned" class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.05 4.05a7 7 0 119.9 9.9L10 19.9l-4.95-5.95a7 7 0 010-9.9z"/>
                  </svg>
                  <svg v-else class="w-5 h-5 text-copper-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.05 4.05a7 7 0 119.9 9.9L10 19.9l-4.95-5.95a7 7 0 010-9.9z"/>
                  </svg>
                  <span>{{ note.pinned ? 'UnPin' : 'Pin' }}</span>
                </button>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from "vue"
import axios from "axios"
const props = defineProps({
  note: Object,
  showRedPin: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["favorite-updated", "deleted", "pin-updated"])
const showMenu = ref(false)
const router = useRouter()

function editNote() {
  router.push(`/notes/edit/${props.note.id}`)
}

function handleClickOutside(event) {
  if (!event.target.closest('.note-card-fixed')) {
    showMenu.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short"
  })
}

const starPath =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.539 1.118l-3.384-2.46a1 1 0 00-1.175 0l-3.384 2.46c-.783.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118l-3.384-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"

async function toggleFavorite() {
  try {
    const updatedNote = { ...props.note, favorite: !props.note.favorite }
    await axios.patch(`http://localhost:3001/notes/${props.note.id}`, {
      favorite: updatedNote.favorite,
    })
    emit("favorite-updated", updatedNote)
  } catch (e) {
    alert("Erreur lors de la mise à jour du favori")
  }
}

async function handlePin() {
  try {
    const updatedNote = { ...props.note, pinned: !props.note.pinned }
    await axios.patch(`http://localhost:3001/notes/${props.note.id}`, {
      pinned: updatedNote.pinned,
    })
    emit("pin-updated", updatedNote)
    showMenu.value = false
  } catch (e) {
    alert("Erreur lors de l'épinglage")
  }
}

async function deleteNote() {
  if (confirm("Supprimer cette note ?")) {
    try {
      await axios.patch(`http://localhost:3001/notes/${props.note.id}`, {
        deleted: true,
        deletionDate: new Date().toISOString()
      })
      emit("deleted", props.note.id)
    } catch (e) {
      alert("Erreur lors de la suppression de la note")
    }
  }
}
</script>

<style scoped>
.note-card-fixed {
  width: 370px;
  min-width: 370px;
  max-width: 370px;
  height: 270px;
  min-height: 270px;
  max-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
}
.note-content {
  flex: 1 1 auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
