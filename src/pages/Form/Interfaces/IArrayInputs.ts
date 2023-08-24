export default interface IArrayInputs {
  id?: number | null
  label: string | null
  type_input: number | null
  type_name: string
  arrayOptions: Array<object>
  delete?: string
}
