<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const selectedFile = ref(null)
const description = ref('')

function onFileChange(e) {
  selectedFile.value = e.target.files[0] || null
}

function submitWork() {
  // Placeholder: implement actual upload logic later
  console.log('Submitting', selectedFile.value, description.value)
  // After successful submit, navigate to view results page
  router.push('/app/view-results')
}
</script>

<template>
  <div class="min-h-full px-5 py-6 sm:px-8">
    <div class="portal-card max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold text-[#181D31] dark:text-white">Submit Assignment</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">Upload your work for grading</p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Description</label>
          <input v-model="description" placeholder="Short description" class="w-full px-3 py-2 rounded-lg border bg-white/90 dark:bg-[#0f172a]" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">File</label>
          <input type="file" @change="onFileChange" class="w-full" />
          <p v-if="selectedFile" class="text-xs mt-2 text-slate-500">Selected: {{ selectedFile.name }}</p>
        </div>

        <div class="flex items-center justify-end gap-3">
          <button @click="submitWork" class="rounded-full bg-[#181D31] px-4 py-2 text-sm font-semibold text-white hover:bg-[#283252]">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portal-card { padding: 1.25rem; background: rgba(255,255,255,0.95); border-radius: 12px; }
</style>
