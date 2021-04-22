<template>
  <div class="d-md-flex justify-content-between bg-gray w-100 p-4">
    <h1 class="h5 m-0">
      {{ title }}
    </h1>

    <div class="dropdown">
      <button
        id="dropdown"
        class="d-flex align-items-center btn p-0"
        type="button"
        :aria-expanded="!dropdownActive"
        @click="dropdownActive = !dropdownActive"
      >
        {{ email }}
        <span class="visually-hidden">
          - {{ $language.components.userBar.userSettings }}
        </span>
        <VueFeather
          class="ms-2"
          :type="dropdownIcon"
          size="16px"
          aria-hidden="true"
        />
      </button>

      <ul
        class="dropdown-menu"
        :class="{ 'd-block': dropdownActive }"
        aria-labelledby="dropdown"
        aria-live="polite"
      >
        <li>
          <div class="dropdown-item px-0">
            <button
              class="d-flex align-items-center w-100 btn px-3 py-0"
              @click="logOut"
            >
              {{ $language.components.userBar.logOut }}

              <VueFeather
                class="ms-2"
                type="log-out"
                size="16px"
                aria-hidden="true"
              />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownActive: false,
    };
  },
  computed: {
    title() {
      return process.env.VUE_APP_NAME;
    },
    email() {
      return this.$store.state.auth.user
        ? this.$store.state.auth.user.email
        : '';
    },
    dropdownIcon() {
      return this.dropdownActive ? 'chevron-up' : 'chevron-down';
    },
  },
  methods: {
    async logOut() {
      await this.$services.auth.logout();

      this.$router.push({
        name: 'LogIn',
      });
    },
  },
};
</script>
