<template>
  <div class="c-paymentsDetails">
    <PurchaseTitles class="flex md:hidden" />
    <div class="flex flex-wrap lg:pl-6">
      <div class="w-full">
        <FormGroup
          class="relative"
          :label="$t('views.purchase.form.cardNumber')"
          :is-error="isSendForm && !isValidCardNumber"
          :error="$t('views.purchase.error.cardNumber')"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            :placeholder="$t('views.purchase.form.cardNumberPlaceholder')"
            v-model="form.cardNumber"
          />
          <img
            :src="`/images/${cardType}.svg`"
            class="absolute right-4 top-6 w-7"
            v-show="cardType.length > 0"
          />
        </FormGroup>
      </div>
      <div class="mt-4 w-full lg:w-1/2 lg:pr-2">
        <FormGroup
          :label="$t('views.purchase.form.securityCode')"
          :is-error="!isValidSecurityCode && isSendForm"
          :error="$t('views.purchase.error.securityCode')"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            :placeholder="$t('views.purchase.form.securityCodePlaceholder')"
            v-model="form.securityCode"
          />
        </FormGroup>
      </div>
      <div class="mt-4 w-full lg:w-1/2 lg:pl-2">
        <FormGroup
          :label="$t('views.purchase.form.expirationDate')"
          :is-error="!isValidExpirationDate && isSendForm"
          :error="$t('views.purchase.error.expirationDate')"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            :placeholder="$t('views.purchase.form.expirationDatePlaceholder')"
            v-model="form.expirationDate"
          />
        </FormGroup>
      </div>
      <PurchaseButtons @nextStep="nextStep()" @previousStep="previousStep()" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { ICartForm, IPaymentForm } from '@/types/CartTypes'
import FormGroup from '@/components/common/FormGroup.vue'
import { cartServices } from '@/main'
import PurchaseButtons from '@/components/views/purchase/PurchaseButtons.vue'
import PurchaseTitles from '@/components/views/purchase/PurchaseTitles.vue'

@Component({
  components: {
    FormGroup,
    PurchaseButtons,
    PurchaseTitles,
  },
})
export default class PaymentsDetails extends Vue {
  public form: IPaymentForm = {
    cardNumber: '',
    securityCode: '',
    expirationDate: '',
  }

  public isSendForm: boolean = false

  public get isVisa(): boolean {
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/

    return visaRegEx.test(this.form.cardNumber)
  }

  public get isMastercard(): boolean {
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/

    return mastercardRegEx.test(this.form.cardNumber)
  }

  public get isAmericanExpress(): boolean {
    const amexpRegEx = /^(?:3[47][0-9]{13})$/

    return amexpRegEx.test(this.form.cardNumber)
  }

  public get isDiscover(): boolean {
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/

    return discovRegEx.test(this.form.cardNumber)
  }

  public get cardType(): string {
    if (this.isVisa) {
      return 'visa'
    } else if (this.isMastercard) {
      return 'mastercard'
    } else if (this.isAmericanExpress) {
      return 'american-express'
    } else if (this.isDiscover) {
      return 'discover'
    } else {
      return ''
    }
  }

  public get isValidSecurityCode(): boolean {
    const securityCodeRegEx = /^[0-9]{3,4}$/

    return securityCodeRegEx.test(this.form.securityCode)
  }

  public get isValidExpirationDate(): boolean {
    const expirationDateRegEx = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/

    return expirationDateRegEx.test(this.form.expirationDate)
  }

  public get isValidCardNumber(): boolean {
    return (
      this.form.cardNumber.length > 0 &&
      (this.isVisa ||
        this.isMastercard ||
        this.isAmericanExpress ||
        this.isDiscover)
    )
  }

  public get isInValidForm(): boolean {
    return (
      !this.isValidCardNumber ||
      !this.isValidSecurityCode ||
      !this.isValidExpirationDate
    )
  }

  public nextStep(): void {
    this.isSendForm = true

    if (this.isInValidForm) return

    cartServices.setPeymentDetails(this.form)
    cartServices.sendForm()
  }

  public get storeForm(): ICartForm {
    return cartServices.form
  }

  public mounted() {
    if (this.storeForm.peymentDetails) {
      this.form = this.storeForm.peymentDetails
    }
  }

  public previousStep(): void {
    cartServices.setStep(1)
  }
}
</script>
