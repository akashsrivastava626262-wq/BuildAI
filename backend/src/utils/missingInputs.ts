export class MissingInputsError extends Error {
  constructor(
    public missingFields: Array<{ field: string; label: string; reason: string }>,
  ) {
    super('Missing required inputs for construction cost estimation')
    this.name = 'MissingInputsError'
  }
}
