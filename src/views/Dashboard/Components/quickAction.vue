<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// actions: mix of Tailwind classes (bgColor/textColor) and hex colors (bgHex/textHex)
// Use class binding when Tailwind classes are available (better for purge), otherwise use inline styles.
const actions = [
  { id: 1, name: 'Add Student', description: 'Register new student', icon: 'person_add', bgColor: 'bg-blue-50', textColor: 'text-blue-600', route: '/students/add' },
  // Use hex for background and text for this card as an example
  { id: 2, name: 'Generate Report', description: 'Create academic report', icon: 'description', bgHex: '#ecfdf5', textHex: '#059669', route: '/reports' },
  { id: 3, name: 'Record Payment', description: 'Process fee payment', icon: 'credit_card', bgColor: 'bg-amber-50', textColor: 'text-amber-600', route: '/payments' },
  // Another example using hex colors
  { id: 4, name: 'Send Notice', description: 'Broadcast message', icon: 'chat_bubble', bgHex: '#fff1f2', textHex: '#db2777', route: '/notices' }
]

function handleAction(action) {
  if (action.route) {
    // navigate to a route; if route doesn't exist yet, this will fail in runtime — used as example
    router.push(action.route)
  } else {
    console.log('Quick action clicked:', action.name)
  }
}

</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Quick Actions</h3>
    </div>

    <!-- Grid container -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="action in actions"
        :key="action.id"
        @click="handleAction(action)"
        role="button"
        tabindex="0"
        class="rounded-lg p-5 text-center space-y-2 cursor-pointer transition-shadow hover:shadow-md"
        :class="action.bgColor ? action.bgColor : ''"
        :style="action.bgHex ? { backgroundColor: action.bgHex } : null"
      >
        <div class="mx-auto w-12 h-12 rounded-lg bg-white/60 flex items-center justify-center">
          <span
            :class="['material-symbols-outlined', action.textColor ? action.textColor : '']"
            :style="action.textHex ? { color: action.textHex } : null"
            class="text-2xl"
          >
            {{ action.icon }}
          </span>
        </div>

        <div :style="action.textHex ? { color: action.textHex } : null" class="font-semibold">{{ action.name }}</div>
        <div class="text-xs text-gray-500">{{ action.description }}</div>
      </div>
    </div>
  </div>
</template>
