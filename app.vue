<script setup lang="ts">
import { ref } from 'vue'
import type { Step } from '~/utils/puml'

const steps = ref<Step[]>()
const error = ref<string>()

function handleSuccess(data: { steps: Step[], originalPuml: string }) {
  steps.value = data.steps
  error.value = undefined
}

function handleError(errorMessage: string) {
  error.value = errorMessage
  steps.value = undefined
}
</script>

<template>
  <UContainer class="py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">PlantUML Step Viewer</h1>
    </div>

    <PumlForm
      @success="handleSuccess"
      @error="handleError"
    />

    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      icon="i-heroicons-exclamation-triangle"
      title="Error"
      :description="error"
      class="mb-8"
    />

    <StepViewer
      v-if="steps && steps.length > 0"
      :steps="steps"
    />
  </UContainer>
  <NuxtPage />
</template>
