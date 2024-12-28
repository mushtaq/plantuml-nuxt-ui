<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Step } from '~/utils/puml'

const colorMode = useColorMode()
const steps = ref<Step[]>()
const error = ref<string>()

const themeIcon = computed(() => 
  colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'
)

function handleSuccess(data: { steps: Step[], originalPuml: string }) {
  steps.value = data.steps
  error.value = undefined
}

function handleError(errorMessage: string) {
  error.value = errorMessage
  steps.value = undefined
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <UContainer class="py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">PlantUML Step Viewer</h1>
        <ClientOnly>
          <UButton
            :icon="themeIcon"
            color="gray"
            variant="ghost"
            @click="toggleColorMode"
          />
        </ClientOnly>
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
  </div>
</template>
