<template>
  <div class="c-purchaseButtons mt-4 w-full md:mt-10">
    <button
      class="rounded-1 w-full rounded border-b-2 border-b-green63 bg-green6b py-3 font-semibold uppercase leading-6 text-white"
      @click="$emit('nextStep')"
    >
      <img
        src="/images/shopping_cart_fill.svg"
        class="-mt-0.5 mb-0.5 inline w-4"
      />
      {{ step === 1 ? $t('button.next') : $t('button.finishStep') }}
    </button>
    <button
      class="w-full py-3 text-xs leading-6 text-graya8"
      @click="$emit('previousStep')"
      v-if="step === 2"
    >
      <img src="/images/arrow_back.svg" class="inline w-3" />
      {{ $t('button.prev') }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { cartServices } from '@/main'

@Component
export default class PurchaseButtons extends Vue {
  public get step(): number {
    return cartServices.step
  }
}
</script>
