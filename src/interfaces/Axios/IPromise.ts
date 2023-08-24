export default interface IPromise {
  code: number
  message: string
  data?: object
  errors?: Array<string>
}
