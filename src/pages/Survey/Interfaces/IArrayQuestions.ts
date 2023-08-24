export default interface IArrayQuestions {
  id?: number | null
  question: string
  type_question: number
  type_name: string
  arrayOptions: Array<object>
  delete?: string
}
