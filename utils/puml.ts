import { encode } from 'plantuml-encoder'

export interface Step {
  puml: string
  image: string
}

export const PLANTUML_STYLE = `
skinparam backgroundColor transparent
skinparam handwritten false

skinparam sequence {
    ArrowColor #2C3E50
    ActorBorderColor #2C3E50
    LifeLineBorderColor #2C3E50
    LifeLineBackgroundColor #A9DCDF
    
    ParticipantBorderColor #2C3E50
    ParticipantBackgroundColor #A9DCDF
    ParticipantFontName Helvetica
    ParticipantFontSize 17
    ParticipantFontColor #2C3E50
    
    ActorBackgroundColor #A9DCDF
    ActorFontColor #2C3E50
    ActorFontSize 17
    ActorFontName Helvetica
}
`

export function processPumlSteps(pumlText: string): Step[] {
  const steps: Step[] = []
  let baseDefinitions = ""
  let currentStep = ""
  let inStep = false
  let inBaseDefinitions = true

  const lines = pumlText.split("\n")

  for (const line of lines) {
    if (line.includes("@startuml")) {
      inBaseDefinitions = true
      continue
    }

    if (line.trim().startsWith("' [step")) {
      inStep = true
      inBaseDefinitions = false
      continue
    }

    if (line.trim().startsWith("' [/step")) {
      if (inStep) {
        const displayPuml = `@startuml\n${baseDefinitions}${currentStep}\n@enduml`
        const fullPuml = `@startuml\n${PLANTUML_STYLE}\n${baseDefinitions}${currentStep}\n@enduml`
        
        const encoded = encode(fullPuml)
        steps.push({
          puml: displayPuml,
          image: `https://www.plantuml.com/plantuml/png/${encoded}`,
        })
        
        currentStep = ""
      }
      inStep = false
      continue
    }

    if (inBaseDefinitions && !inStep && !line.includes("@enduml")) {
      baseDefinitions += line + "\n"
    }

    if (inStep) {
      currentStep += line + "\n"
    }
  }

  return steps
}
