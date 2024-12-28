<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Step } from '~/utils/puml'

interface Props {
  steps: Step[]
}

const props = defineProps<Props>()
const currentStep = ref(0)
const stepsLength = computed(() => props.steps.length)

watch(() => stepsLength.value, (newLength) => {
  if (newLength > 0 && currentStep.value >= newLength) {
    currentStep.value = 0
  }
})

const step = computed(() => props.steps[currentStep.value])
const stepNumber = computed(() => currentStep.value + 1)

function handleStepChange(direction: 'previous' | 'next') {
  if (direction === 'previous') {
    currentStep.value = Math.max(0, currentStep.value - 1)
  } else {
    currentStep.value = Math.min(stepsLength.value - 1, currentStep.value + 1)
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
            :disabled="currentStep === 0"
            @click="handleStepChange('previous')"
          />
          <UButton
            icon="i-heroicons-arrow-right"
            color="gray"
            variant="ghost"
            :disabled="currentStep === stepsLength - 1"
            @click="handleStepChange('next')"
          />
        </div>
      </div>
    </template>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <UCard class="bg-gray-50 dark:bg-gray-900">
        <pre class="text-sm overflow-x-auto font-mono text-gray-900 dark:text-gray-100">
          <code>{{ step.puml }}</code>
        </pre>
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
