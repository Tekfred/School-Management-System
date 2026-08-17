<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedFile = ref(null)
const description = ref('')
const isDragging = ref(false)
const fileInput = ref(null)

function onFileChange(e) {
  selectedFile.value = e.target.files[0] || null
}

function handleDrop(e) {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    selectedFile.value = e.dataTransfer.files[0]
  }
}

function handleDragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
}

function handleDragLeave(e) {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
}

function triggerFileSelect() {
  fileInput.value?.click()
}

function submitWork() {
  if (!selectedFile.value) return
  console.log('Submitting', selectedFile.value, description.value)
  router.push('/app/view-results')
}

function goBack() {
  router.push('/app/dashboard')
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from('.sw-header', { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out' })
      gsap.from('.sw-card', {
        y: 18, opacity: 0, duration: 0.45,
        stagger: 0.1, ease: 'power2.out', delay: 0.2,
      })
    }
  } catch (e) {}
})
</script>

<template>
  <div class="min-h-full px-4 py-5 sm:px-6 lg:px-8">
    <!-- Header -->
    <header class="sw-header flex items-center justify-between mb-6 flex-wrap gap-3">
      <div class="flex items-center gap-3">
        <button
          @click="goBack"
          class="flex items-center justify-center h-9 w-9 rounded-xl bg-(--surface-muted) border border-(--surface-border) muted-text hover:bg-(--surface-border) transition-all"
        >
          <span class="material-symbols-outlined text-base">arrow_back</span>
        </button>
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-(--accent) mb-1">Assignments</p>
          <h1 class="text-2xl font-black heading-text">Submit Work</h1>
        </div>
      </div>
    </header>

    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Main submit card -->
      <div class="sw-card surface-card rounded-3xl p-6 md:p-8">
        <div class="flex items-center gap-3 mb-6">
          <span class="material-symbols-outlined text-2xl text-(--accent)">upload_file</span>
          <div>
            <h3 class="font-bold heading-text">Upload your assignment</h3>
            <p class="text-sm muted-text">Submit completed work for grading</p>
          </div>
        </div>

        <div class="space-y-5">
          <!-- Description textarea -->
          <div>
            <label class="block text-sm font-semibold body-text mb-2">Description</label>
            <textarea
              v-model="description"
              rows="3"
              placeholder="Brief description of your submission..."
              class="w-full px-3 py-2 rounded-xl border border-(--surface-border) bg-(--surface-muted) body-text resize-none placeholder-muted-text focus:outline-none focus:border-(--accent) transition-colors"
            />
          </div>

          <!-- File upload area -->
          <div>
            <label class="block text-sm font-semibold body-text mb-2">File</label>
            <div
              @drop="handleDrop"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @click="triggerFileSelect"
              class="relative flex flex-col items-center justify-center h-36 rounded-2xl border-2 border-dashed border-(--surface-border) bg-(--surface-muted) cursor-pointer transition-all duration-200 hover:border-(--accent) hover:bg-(--surface)"
              :class="{ 'border-(--accent) bg-(--surface)': isDragging }"
            >
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="onFileChange"
              />
              <span class="material-symbols-outlined text-3xl text-(--subtle-text) mb-1">{{ isDragging ? 'file_download' : 'description' }}</span>
              <p class="text-sm font-semibold muted-text">
                {{ selectedFile ? selectedFile.name : 'Click to upload or drag & drop' }}
              </p>
              <p v-if="selectedFile" class="text-xs muted-text mt-1">
                {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB
              </p>
              <p v-if="!selectedFile" class="text-xs muted-text mt-1">PDF, DOCX, ZIP up to 25MB</p>
            </div>
          </div>

          <!-- Submit button -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-(--surface-border)">
            <button
              @click="goBack"
              class="px-5 py-2.5 text-sm font-semibold rounded-xl border border-(--surface-border) muted-text hover:bg-(--surface-border) transition-all"
            >
              Cancel
            </button>
            <button
              @click="submitWork"
              :disabled="!selectedFile"
              class="primary-action inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedFile }"
            >
              <span class="material-symbols-outlined text-base">send</span>
              Submit Work
            </button>
          </div>
        </div>
      </div>

      <!-- Assignment info panel -->
      <div class="sw-card surface-panel rounded-3xl p-6">
        <div class="flex items-center gap-3 mb-4">
          <span class="material-symbols-outlined text-xl text-(--accent)">info</span>
          <h3 class="font-bold heading-text">Assignment Details</h3>
        </div>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="muted-text">Title</span>
            <span class="body-text font-semibold">Data Structures - Binary Trees Lab</span>
          </div>
          <div class="flex justify-between">
            <span class="muted-text">Course</span>
            <span class="body-text font-semibold">CS 302</span>
          </div>
          <div class="flex justify-between">
            <span class="muted-text">Due</span>
            <span class="body-text font-semibold">Jun 10, 2026</span>
          </div>
          <div class="flex justify-between">
            <span class="muted-text">Status</span>
            <span class="text-amber-500 font-semibold">Not Submitted</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.surface-panel {
  background: var(--surface);
  border: 1px solid var(--surface-border);
  box-shadow: var(--surface-shadow);
}

.dark .surface-panel {
  background: #111827;
  border-color: rgba(51, 65, 85, 0.92);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}
</style>
