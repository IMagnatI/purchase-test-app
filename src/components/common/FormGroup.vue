<template>
  <div
    class="c-formGroup rounded-b border-b border-b-2 bg-white px-2.5 pb-2.5 pt-1"
    :class="{
      'border-b-redfa': isError,
      'border-b-grayd9': !isError,
    }"
  >
    <label class="-mb-1 text-xs font-bold">{{ label }}</label>
    <div>
      <slot />
    </div>
    <p class="-mb-2.5 text-xs text-redfa" v-if="error.length && isError">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
@Component({
  components: {},
})
export default class FormGroup extends Vue {
  @Prop
  public label!: string

  @Prop
  public error!: string

  @Prop
  public isError!: boolean
}
</script>
