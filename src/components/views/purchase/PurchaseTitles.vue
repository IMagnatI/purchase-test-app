<template>
  <p class="my-8 w-full font-bold uppercase md:-ml-2 md:mt-0">
    <span
      class="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-center text-white"
      >{{ step }}</span
    >{{ $t(`views.purchase.step${step}`) }}
  </p>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { cartServices } from '@/main'

@Component
export default class PurchaseTitles extends Vue {
  public get step(): number {
    return cartServices.step
  }
}
</script>
