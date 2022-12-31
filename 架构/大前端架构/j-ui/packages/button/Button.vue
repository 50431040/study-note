<template>
  <button class="j-button" :class="[buttonType, buttonSize]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "JButton"
}
</script>

<script setup>
import { computed } from "vue"

const props = defineProps({
  type: {
    required: false,
    type: String,
    default: "default"
  },
  size: {
    required: false,
    type: String,
    default: "default"
  }
})

const buttonType = computed(() => "j-button--" + props.type)
const buttonSize = computed(() => "j-button-" + props.size)
</script>