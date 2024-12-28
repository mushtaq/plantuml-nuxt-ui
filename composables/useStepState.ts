export const useStepState = (maxSteps: number) => {
  const currentStep = useState('current-step', () => {
    const stored = localStorage.getItem('current-step')
    return stored ? Math.min(parseInt(stored, 10), maxSteps - 1) : 0
  })

  watchEffect(() => {
    if (maxSteps > 0 && currentStep.value >= maxSteps) {
      currentStep.value = 0
    }
    localStorage.setItem('current-step', currentStep.value.toString())
  })

  const stepNumber = computed(() => currentStep.value + 1)
  const isFirstStep = computed(() => currentStep.value === 0)
  const isLastStep = computed(() => currentStep.value === maxSteps - 1)

  function goToPrevious() {
    if (!isFirstStep.value) {
      currentStep.value--
    }
  }

  function goToNext() {
    if (!isLastStep.value) {
      currentStep.value++
    }
  }

  return {
    currentStep: readonly(currentStep),
    stepNumber,
    isFirstStep,
    isLastStep,
    goToPrevious,
    goToNext
  }
}
