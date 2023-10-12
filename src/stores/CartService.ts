import { Pinia, Store } from 'pinia-class-component'
import type { IProduct } from '@/types/ProductsTypes'
import type { IPaymentForm, IPurchase } from '@/types/CartTypes'
import type { Nullable } from '@/types/Nullable'
import CartRepository from '@/repositories/CartRepository'
import type { ICartForm, IPersonalInfoForm } from '@/types/CartTypes'

interface ICartStore {
  products: IProduct[]
  isLoading: boolean
  isError: boolean
  purchase: Nullable<IPurchase>
  step: number
  form: ICartForm
}

@Store
export default class CartService extends Pinia {
  public store: ICartStore = {
    products: [],
    isLoading: false,
    isError: false,
    purchase: null,
    step: 1,
    form: {
      personalInformations: null,
      peymentDetails: null,
    },
  }

  public get products(): IProduct[] {
    return this.store.products
  }

  public get isLoading(): boolean {
    return this.store.isLoading
  }

  public get isError(): boolean {
    return this.store.isError
  }

  public get step(): number {
    return this.store.step
  }

  public get form(): ICartForm {
    return this.store.form
  }

  public get purchase(): Nullable<IPurchase> {
    return this.store.purchase
  }

  public async loadProducts(): Promise<void> {
    this.store.products = CartRepository.getProducts()
  }

  public async loadPurchase(): Promise<void> {
    this.store.purchase = CartRepository.getPurchase()
  }

  public setStep(step: number): void {
    this.store.step = step
  }

  public setPersonalInformations(
    personalInformationsForm: IPersonalInfoForm
  ): void {
    this.store.form.personalInformations = personalInformationsForm
  }

  public setPeymentDetails(peymentDetailsForm: IPaymentForm): void {
    this.store.form.peymentDetails = peymentDetailsForm
  }

  public sendForm(): void {
    //eslint-disable-next-line
    console.log('Send form to api', this.store.form)
  }
}
