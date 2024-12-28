import type { Step } from '~/utils/puml'

export const usePumlState = () => {
  const steps = useState<Step[]>('puml-steps', () => [])
  const error = useState<string | undefined>('puml-error', () => undefined)
  
  const handleSuccess = (data: { steps: Step[], originalPuml: string }) => {
    steps.value = data.steps
    error.value = undefined
  }

  const handleError = (errorMessage: string) => {
    error.value = errorMessage
    steps.value = []
  }

  return {
    steps,
    error,
    handleSuccess,
    handleError
  }
}
