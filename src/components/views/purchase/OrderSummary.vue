<template>
  <div class="c-orderSummary bg-white p-2">
    <div class="border-2 border-dotted px-2 py-4">
      <h3 class="font-black font-bold uppercase">
        {{ $t('views.purchase.orderTitle') }}
      </h3>
      <div class="border-b border-b-2 border-dotted py-4">
        <div
          class="flex justify-between pb-2"
          v-for="(product, id) in products"
          :key="`product${id}`"
        >
          <p>{{ product.name }}</p>
          <p>$ {{ product.price }}</p>
        </div>
      </div>
      <div class="border-b border-b-2 border-dotted py-4">
        <div class="flex justify-between pb-2">
          <p>{{ $t('views.purchase.totalPurchase') }}</p>
          <p>$ {{ purchase?.total ?? 0 }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t('views.purchase.estimatedTax') }}</p>
          <p>$ {{ purchase?.tax ?? 0 }}</p>
        </div>
      </div>
      <div class="mt-3 flex justify-between">
        <p class="font-bold">{{ $t('views.purchase.total') }}</p>
        <p class="text-2xl font-bold">$ {{ purchase?.summary ?? 0 }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { IProduct } from '@/types/ProductsTypes'
import { cartServices } from '@/main'
import { Nullable } from '@/types/Nullable'
import { IPurchase } from '@/types/CartTypes'

@Component
export default class OrderSummary extends Vue {
  public get products(): IProduct[] {
    return cartServices.products
  }

  public get purchase(): Nullable<IPurchase> {
    return cartServices.purchase
  }
}
</script>
