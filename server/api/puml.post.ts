import { z } from 'zod'
import { processPumlSteps } from '~/utils/puml'

const requestSchema = z.object({
  puml: z.string().min(1, 'PlantUML code is required')
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { puml } = requestSchema.parse(body)
    
    const steps = processPumlSteps(puml)
    
    setResponseStatus(event, 200)
    return {
      steps,
      originalPuml: puml
    }
  } catch (err: unknown) {
    const error = err as Error
    console.error('Error processing PlantUML:', error)
    
    if (err instanceof z.ZodError) {
      setResponseStatus(event, 400)
      return {
        error: err.errors[0].message
      }
    }
    
    setResponseStatus(event, 500)
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
})
