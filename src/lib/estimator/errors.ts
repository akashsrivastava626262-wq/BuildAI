export interface MissingField {
  field: string
  label: string
  reason: string
}

export class MissingInputsError extends Error {
  missingFields: MissingField[]

  constructor(missingFields: MissingField[]) {
    super('Missing required inputs for estimation.')
    this.name = 'MissingInputsError'
    this.missingFields = missingFields
  }
}
