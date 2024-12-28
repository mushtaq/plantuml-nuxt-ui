import { processPumlSteps } from '~/utils/puml'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!body.puml) {
      return {
        error: 'No PlantUML code provided'
      }
    }

    const steps = processPumlSteps(body.puml)
    
    return {
      steps,
      originalPuml: body.puml
    }
  } catch (error) {
    console.error('Error processing PlantUML:', error)
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
})
