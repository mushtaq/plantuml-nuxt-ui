<script setup lang="ts">
import type { Step } from '~/utils/puml'

interface Props {
  steps: Step[]
}

const props = defineProps<Props>()
const stepsLength = computed(() => props.steps.length)
const {
  currentStep,
  stepNumber,
  isFirstStep,
  isLastStep,
  goToPrevious,
  goToNext
} = useStepState(stepsLength.value)

const step = computed(() => props.steps[currentStep.value])

function handleStepChange(direction: 'previous' | 'next') {
  if (direction === 'previous') {
    goToPrevious()
  } else {
    goToNext()
  }
}
</script>

<template>
  <UCard class="bg-white dark:bg-gray-800">
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Step {{ stepNumber }} of {{ stepsLength }}
        </h2>
        <div class="space-x-2">
          <UButton
            icon="i-heroicons-arrow-left"
            color="gray"
            variant="ghost"
            :disabled="isFirstStep"
            @click="handleStepChange('previous')"
          />
          <UButton
            icon="i-heroicons-arrow-right"
            color="gray"
            variant="ghost"
            :disabled="isLastStep"
            @click="handleStepChange('next')"
          />
        </div>
      </div>
    </template>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <UCard class="bg-gray-50 dark:bg-gray-900">
        <pre class="text-sm overflow-x-auto font-mono text-gray-900 dark:text-gray-100 whitespace-pre"><code>{{step.puml.split('\n').map(line => line.trimStart()).join('\n')}}</code></pre>
      </UCard>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <img
          :src="step.image"
          :alt="`PlantUML diagram for step ${stepNumber}`"
          class="max-w-full h-auto"
          loading="lazy"
        />
      </div>
    </div>
  </UCard>
</template>
