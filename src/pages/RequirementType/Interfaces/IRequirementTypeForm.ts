export default interface RequirementType {
  id?: number | null
  name: string | null
  arrayCharges: Array<object>
  arrayInputs: Array<object>
  internal: boolean | null | number
  external: boolean | null | number
}
