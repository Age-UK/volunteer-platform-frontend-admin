<template>
  <AuthCard @authCardSubmit="onSubmit">
    <template #header>
      <h1 class="text-white fs-3 fw-bold">
        {{ title }}
      </h1>

      <h2 class="text-white fs-4">
        {{ $language.views.logIn.title }}
      </h2>
    </template>

    <template #content>
      <div class="mb-3">
        <TextField
          v-model="email"
          :label="$language.general.form.emailAddress"
          name="email"
          validation="required|email"
          autocomplete="username"
        />
      </div>

      <div class="mb-3 mb-md-2">
        <TextField
          v-model="password"
          type="password"
          :label="$language.general.form.password"
          name="password"
          validation="required"
          autocomplete="current-password"
        />
      </div>

      <p class="text-md-end mb-4">
        <RouterLink to="/reset-password-request">
          {{ $language.views.logIn.passwordReset }}
        </RouterLink>
      </p>

      <button type="submit" class="btn btn-primary">
        {{ $language.general.form.submit }}
      </button>
    </template>
  </AuthCard>
</template>

<script>
import AuthCard from '@/components/auth/AuthCard';
import TextField from '@/components/form/TextField';

export default {
  components: {
    AuthCard,
    TextField,
  },
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
    async onSubmit() {
      this.$store.dispatch('alert/hideAlert');

      const payload = {
        user: {
          email: this.email,
          password: this.password,
        },
      };

      try {
        await this.$services.auth.login(payload);

        this.$router.push({ name: 'Dashboard' });
      } catch (e) {
        this.$store.dispatch('alert/showAlert', {
          type: 'alert-danger',
          text: e.message,
        });
      }
    },
  },
};
</script>
