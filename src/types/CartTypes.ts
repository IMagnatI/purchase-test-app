import type { Nullable } from '@/types/Nullable'

export interface IPurchase {
  uuid: string
  total: number
  tax: number
  summary: number
}

export interface IPersonalInfoForm {
  firstName: string
  lastName: string
  email: string
  country: string
  postalCode: string
  phoneNumber: string
}

export interface IPaymentForm {
  cardNumber: string
  securityCode: string
  expirationDate: string
}

export interface ICartForm {
  personalInformations: Nullable<IPersonalInfoForm>
  peymentDetails: Nullable<IPaymentForm>
}
