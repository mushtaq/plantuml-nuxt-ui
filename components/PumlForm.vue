<script setup lang="ts">
const props = withDefaults(defineProps<{
  initialValue?: string
}>(), {
  initialValue: ''
})

const { handleSuccess, handleError } = usePumlState()
const { isSubmitting, submit } = usePumlSubmit()
const value = useModel(props, 'initialValue')

async function handleSubmit() {
  try {
    const result = await submit(value.value)
    handleSuccess(result)
  } catch (error) {
    console.error('Error submitting form:', error)
    handleError(error instanceof Error ? error.message : 'An unexpected error occurred')
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
        variant="outline"
        color="gray"
        required
      />
    </UFormGroup>

    <UButton
      type="submit"
      :loading="isSubmitting"
      :disabled="isSubmitting || !value"
      size="lg"
      block
    >
      {{ isSubmitting ? 'Generating...' : 'Generate Diagrams' }}
    </UButton>
  </form>
</template>
