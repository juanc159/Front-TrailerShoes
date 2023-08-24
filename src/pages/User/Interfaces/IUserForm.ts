export default interface IUserForm {
  id?: number | null
  email: string
  password: string | null
  name: string
  lastName: string
  identity_type_id: number | null
  charge_id: number | null
  role_id: number | null
  idNumber: number | string

  expeditionDate: string | null
  birthDate: string | null
  gender_id: number | null
  weight: string | null
  height: string | null
  civil_status_id: number | null
  phone: string | null
  cellphone: string | null
  address: string | null
  have_son: string | null
  nameContact: string | null
  relationshipContact: string | null
  phoneContact: string | null
  cellphoneContact: string | null
  emailContact: string | null
}
