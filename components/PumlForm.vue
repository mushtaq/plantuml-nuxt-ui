<script setup lang="ts">
import { ref } from 'vue'
import type { Step } from '~/utils/puml'

interface Props {
  initialValue?: string
}

interface Emits {
  (e: 'success', data: { steps: Step[], originalPuml: string }): void
  (e: 'error', error: string): void
}

interface ApiResponse {
  steps?: Step[]
  originalPuml?: string
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: ''
})

const emit = defineEmits<Emits>()
const value = ref(props.initialValue)
const isSubmitting = ref(false)

async function handleSubmit() {
  isSubmitting.value = true

  try {
    const response = await $fetch<ApiResponse>('/api/puml', {
      method: 'POST',
      body: { puml: value.value }
    })

    if (response.error) {
      emit('error', response.error)
    } else if (response.steps && response.originalPuml) {
      emit('success', {
        steps: response.steps,
        originalPuml: response.originalPuml
      })
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    emit('error', error instanceof Error ? error.message : 'An unexpected error occurred')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mb-8">
    <UFormGroup label="Enter your PlantUML code:" class="mb-4">
      <UTextarea
        v-model="value"
        :disabled="isSubmitting"
        placeholder="Paste your PlantUML code here..."
        :rows="10"
        class="font-mono"
        required
      />
    </UFormGroup>

    <UButton
      type="submit"
      :loading="isSubmitting"
      :disabled="isSubmitting"
      size="lg"
      block
    >
      {{ isSubmitting ? 'Generating...' : 'Generate Diagrams' }}
    </UButton>
  </form>
</template>
