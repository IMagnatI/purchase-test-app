<template>
  <div class="v-purchaseView">
    <div
      class="mx-auto flex w-full flex-row-reverse flex-col flex-col-reverse flex-wrap p-3 md:flex-row md:flex-row lg:max-w-[1400px]"
    >
      <PurchaseTitles class="hidden md:flex" />
      <div class="w-full md:w-2/3 md:pr-4 lg:w-3/4">
        <PersonalInformation v-if="step === 1" />
        <PaymentsDetails v-if="step === 2" />
      </div>
      <div class="mb-5 w-full md:mb-0 md:w-1/3 lg:w-1/4">
        <OrderSummary />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import OrderSummary from '@/components/views/purchase/OrderSummary.vue'
import PaymentsDetails from '@/components/views/purchase/PaymentsDetails.vue'
import PersonalInformation from '@/components/views/purchase/PersonalInformation.vue'
import { cartServices, countryServices } from '@/main'
import PurchaseTitles from '@/components/views/purchase/PurchaseTitles.vue'

@Component({
  components: {
    PurchaseTitles,
    OrderSummary,
    PaymentsDetails,
    PersonalInformation,
  },
})
export default class PurchaseView extends Vue {
  public get step(): number {
    return cartServices.step
  }

  public mounted() {
    cartServices.loadProducts()
    cartServices.loadPurchase()
    countryServices.loadCountries()
  }
}
</script>
