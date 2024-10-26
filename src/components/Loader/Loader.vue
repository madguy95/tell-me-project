<template>
  <b-overlay
    :show="visible"
    :opacity="opacity"
    spinner-medium
    spinner-variant="primary"
    :fixed="isFullPage"
    no-wrap
  >
  </b-overlay>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    opacity: {
      type: Number,
      default: 0.6,
    },
    isFullPage: {
      type: Boolean,
      default: false,
    },
  },
};
</script>