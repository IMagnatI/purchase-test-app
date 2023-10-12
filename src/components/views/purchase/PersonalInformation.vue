<template>
  <div class="c-personalInformation">
    <PurchaseTitles class="flex md:hidden" />
    <div class="flex flex-wrap lg:pl-6">
      <div class="w-full lg:w-1/2 lg:pr-2">
        <FormGroup
          :label="$t('views.purchase.form.firstName')"
          :is-error="!isValidFirstName && isSendForm"
          :error="$t('views.purchase.error.firstName')"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            :placeholder="$t('views.purchase.form.firstNamePlaceholder')"
            v-model="form.firstName"
          />
        </FormGroup>
      </div>
      <div class="mt-4 w-full lg:mt-0 lg:w-1/2 lg:pl-2">
        <FormGroup
          :label="$t('views.purchase.form.lastName')"
          :is-error="!isValidLastName && isSendForm"
          :error="$t('views.purchase.error.lastName')"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            :placeholder="$t('views.purchase.form.lastNamePlaceholder')"
            v-model="form.lastName"
          />
        </FormGroup>
      </div>
      <div class="mt-4 w-full">
        <FormGroup
          :label="$t('views.purchase.form.email')"
          :is-error="!isValidEmail && isSendForm"
          :error="$t('views.purchase.error.email')"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            :placeholder="$t('views.purchase.form.emailPlaceholder')"
            v-model="form.email"
          />
        </FormGroup>
      </div>
      <div class="mt-4 w-full lg:w-1/2 lg:pr-2">
        <FormGroup
          :label="$t('views.purchase.form.country')"
          :is-error="!isValidCountry && isSendForm"
          :error="$t('views.purchase.error.country')"
        >
          <select
            class="-mt-1 w-full border-none py-0.5"
            v-model="form.country"
          >
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.code"
              :selected="country.code === form.country"
            >
              {{ country.name }}
            </option>
          </select>
        </FormGroup>
      </div>
      <div class="mt-4 w-full lg:w-1/2 lg:pl-2">
        <FormGroup
          :label="$t('views.purchase.form.postalCode')"
          :is-error="!isValidPostalCode && isSendForm"
          :error="`${$t(
            'views.purchase.error.postalCode'
          )} ${postalCodePlaceholder}`"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            v-model="form.postalCode"
            :placeholder="postalCodePlaceholder"
          />
        </FormGroup>
      </div>
      <div class="mt-4 w-full">
        <FormGroup
          :label="$t('views.purchase.form.phoneNumber')"
          :is-error="!isValidPhoneNumber && isSendForm"
          :error="$t('views.purchase.error.phoneNumber')"
        >
          <input
            type="text"
            class="-mt-1 w-full py-0.5"
            :placeholder="$t('views.purchase.form.phoneNumberPlaceholder')"
            v-model="form.phoneNumber"
          />
        </FormGroup>
      </div>
      <PurchaseButtons @nextStep="nextStep()" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { cartServices, countryServices } from '@/main'
import type { ICartForm, IPersonalInfoForm } from '@/types/CartTypes'
import ReRegExp from 'reregexp'
import FormGroup from '@/components/common/FormGroup.vue'
import { ICountry } from '@/types/CountryTypes'
import { Nullable } from '@/types/Nullable'
import PurchaseButtons from '@/components/views/purchase/PurchaseButtons.vue'
import PurchaseTitles from '@/components/views/purchase/PurchaseTitles.vue'

@Component({
  components: {
    FormGroup,
    PurchaseButtons,
    PurchaseTitles,
  },
})
export default class PersonalInformation extends Vue {
  public form: IPersonalInfoForm = {
    firstName: '',
    lastName: '',
    email: '',
    country: 'PL',
    postalCode: '',
    phoneNumber: '',
  }

  public isSendForm: boolean = false

  public get countries() {
    return countryServices.countries
  }

  public get country(): Nullable<ICountry> {
    return (
      this.countries.find((country) => country.code === this.form.country) ??
      null
    )
  }

  public get isValidFirstName(): boolean {
    return this.form.firstName.length > 0
  }

  public get isValidLastName(): boolean {
    return this.form.lastName.length > 0
  }

  public get isValidEmail(): boolean {
    const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return this.form.email.length > 0 && emailRegex.test(this.form.email)
  }

  public get isValidCountry(): boolean {
    return this.form.country.length > 0
  }

  public get isValidPostalCode(): boolean {
    if (!this.country || !this.country.postal) return false

    const postalRegex = new RegExp(this.country.postal)
    return (
      this.form.postalCode.length > 0 && postalRegex.test(this.form.postalCode)
    )
  }

  public get isValidPhoneNumber(): boolean {
    const phoneRegex =
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/g
    return (
      this.form.phoneNumber.length > 0 && phoneRegex.test(this.form.phoneNumber)
    )
  }

  public get postalCodePlaceholder(): string {
    if (!this.country || !this.country.postal) return ''

    const postal = new ReRegExp(this.country.postal).build()
    return postal
  }

  public get storeForm(): ICartForm {
    return cartServices.form
  }

  public get isInValidForm(): boolean {
    return (
      !this.isValidFirstName ||
      !this.isValidLastName ||
      !this.isValidEmail ||
      !this.isValidCountry ||
      !this.isValidPostalCode ||
      !this.isValidPhoneNumber
    )
  }

  public nextStep(): void {
    this.isSendForm = true

    if (this.isInValidForm) return

    cartServices.setPersonalInformations(this.form)
    cartServices.setStep(2)
  }

  public mounted() {
    if (this.storeForm.personalInformations) {
      this.form = this.storeForm.personalInformations
    }
  }
}
</script>
