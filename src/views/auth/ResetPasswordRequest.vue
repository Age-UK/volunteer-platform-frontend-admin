<template>
  <AuthCard @authCardSubmit="onSubmit">
    <template #header>
      <h1 class="text-white fs-3 fw-bold">
        {{ title }}
      </h1>

      <h2 class="text-white fs-4">
        {{ $language.views.resetPasswordRequest.title }}
      </h2>
    </template>

    <template #content>
      <div class="mb-4">
        <TextField
          v-model="email"
          :label="$language.general.form.emailAddress"
          name="email"
          validation="required|email"
          autocomplete="username"
        />
      </div>

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
        },
      };

      try {
        await this.$services.auth.resetPasswordRequest(payload);

        this.$store.dispatch('alert/showAlert', {
          type: 'alert-success',
          text:
            'Thank you - an email containing your authorisation code has been sent to your email address.',
        });

        this.$router.push({
          path: 'reset-password',
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
