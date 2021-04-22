<template>
  <AuthCard @authCardSubmit="onSubmit">
    <template #header>
      <h1 class="text-white fs-3 fw-bold">
        {{ title }}
      </h1>

      <h2 class="text-white fs-4">
        {{ $language.views.resetPassword.title }}
      </h2>
    </template>

    <template #content>
      <div class="mb-3">
        <TextField
          v-model="authCode"
          :label="$language.general.form.authCode"
          name="authCode"
          validation="required"
        />
      </div>

      <div class="mb-4">
        <TextField
          v-model="password"
          type="password"
          :label="$language.general.form.newPassword"
          name="password"
          validation="required|min:8"
          autocomplete="off"
        />
      </div>

      <button type="submit" class="btn btn-primary">
        {{ $language.views.resetPassword.submit }}
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
      authCode: '',
      password: '',
    };
  },
  computed: {
    title() {
      return process.env.VUE_APP_NAME;
    },
  },
  created() {
    if (this.$route.query.id) {
      this.authCode = this.$route.query.id;
    }
  },
  methods: {
    async onSubmit() {
      this.$store.dispatch('alert/hideAlert');

      const payload = {
        resetPasswordRequest: {
          id: this.authCode,
          password: this.password,
        },
      };

      try {
        await this.$services.auth.resetPassword(payload);

        this.$store.dispatch('alert/showAlert', {
          type: 'alert-success',
          text: 'Your password has been successfully updated.',
        });

        this.$router.push({
          path: '/',
          query: {
            message: 'true',
          },
        });
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
