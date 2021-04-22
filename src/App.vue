<template>
  <Alert v-if="alert.active" :alert-type="alert.type" :text="alert.text" />

  <RouterView />
</template>

<script>
import { mapState } from 'vuex';
import Alert from '@/components/general/Alert';

export default {
  components: {
    Alert,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.user !== null;
    },
    ...mapState('alert', {
      alert: state => state,
    }),
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
