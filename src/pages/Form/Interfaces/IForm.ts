import IArrayInputs from "./IArrayInputs"

export default interface IForm {
  id?: number | null
  name: string | null
  arrayInputs: Array<IArrayInputs>
}
