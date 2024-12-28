import type { Step } from '~/utils/puml'

export const usePumlSubmit = () => {
  const isSubmitting = ref(false)
  const pending = ref(false)

  const submit = async (puml: string) => {
    if (!puml.trim()) {
      throw new Error('No PlantUML code provided')
    }

    isSubmitting.value = true
    pending.value = true

    try {
      const { data, error } = await useFetch<{
        steps?: Step[]
        originalPuml?: string
        error?: string
      }>('/api/puml', {
        method: 'POST',
        body: { puml }
      })

      if (error.value) {
        throw error.value
      }

      if (data.value?.error) {
        throw new Error(data.value.error)
      }

      if (!data.value?.steps || !data.value?.originalPuml) {
        throw new Error('Invalid response from server')
      }

      return {
        steps: data.value.steps,
        originalPuml: data.value.originalPuml
      }
    } finally {
      isSubmitting.value = false
      pending.value = false
    }
  }

  return {
    isSubmitting: readonly(isSubmitting),
    pending: readonly(pending),
    submit
  }
}
