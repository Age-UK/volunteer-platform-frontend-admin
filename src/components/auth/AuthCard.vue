<template>
  <main role="main" class="container-fluid d-flex min-vh-100 py-4">
    <Form
      :class="$style.authCard"
      class="bg-white shadow-sm m-auto"
      @submit="authCardSubmit()"
    >
      <header class="bg-primary px-4 py-3 text-center">
        <RouterLink to="/">
          <img
            v-svg-inline
            class="logo-white mb-4"
            :class="$style.logo"
            src="@/assets/images/age-uk-logo.svg"
            :alt="`${$appGlobals.orgName} logo`"
          />
        </RouterLink>

        <slot name="header"></slot>
      </header>

      <div class="p-4">
        <slot name="content"></slot>
      </div>
    </Form>
  </main>
</template>

<script>
import { Form } from 'vee-validate';

export default {
  components: {
    Form,
  },
  emits: ['authCardSubmit'],
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    title() {
      return process.env.VUE_APP_NAME;
    },
  },
  methods: {
    async authCardSubmit() {
      this.$emit('authCardSubmit');
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  background-color: $gray-200;
}
</style>

<style lang="scss" module>
.authCard {
  width: 100%;
  max-width: 500px;
}

.logo {
  height: auto;
  max-width: 90px;

  @include media-breakpoint-up(md) {
    max-width: 140px;
  }
}
</style>
