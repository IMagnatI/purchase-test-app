import Products from './mocks/products'
import Purchase from './mocks/purchase'
import type { IProduct } from '@/types/ProductsTypes'
import type { IPurchase } from '@/types/CartTypes'
import type { Nullable } from '@/types/Nullable'

class CartRepository {
  public getProducts(): IProduct[] {
    return Products
  }

  public getPurchase(): Nullable<IPurchase> {
    return Purchase
  }
}

export default new CartRepository()
