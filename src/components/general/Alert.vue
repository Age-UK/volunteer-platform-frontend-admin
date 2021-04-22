<template>
  <div
    class="alert text-center position-sticky top-0 mb-0"
    :class="alertType"
    role="alert"
    aria-live="polite"
  >
    <strong>{{ text }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    alertType: {
      type: String,
      required: false,
      default: 'alert-success',
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
