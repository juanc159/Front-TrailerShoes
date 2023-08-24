import IArrayQuestions from "./IArrayQuestions"

export default interface ISurveyForm {
  id?: number | null
  name: string | null
  startDate: string | null
  endDate: string | null
  arrayQuestions: Array<IArrayQuestions>
  answerSeveralTimes: number | null
}
