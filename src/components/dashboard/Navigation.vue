<template>
  <div
    class="bg-primary p-3 p-lg-4 d-flex flex-row flex-lg-column justify-content-between justify-content-lg-start align-items-center align-items-lg-start flex-wrap flex-lg-nowrap"
    :class="$style.sidebarNav"
  >
    <RouterLink :to="{ name: 'Dashboard' }">
      <img
        v-svg-inline
        class="logo-white mb-1 mb-lg-5"
        :class="$style.logo"
        src="@/assets/images/age-uk-logo.svg"
        :alt="`${$appGlobals.orgName} logo`"
      />
    </RouterLink>

    <nav class="d-lg-none navbar navbar-light">
      <button
        class="navbar-toggler bg-light"
        type="button"
        aria-controls="navigation"
        :aria-expanded="!menuActive"
        aria-label="Toggle navigation"
        @click="menuActive = !menuActive"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>

    <nav
      id="navigation"
      aria-live="polite"
      class="d-lg-flex flex-column w-100 mt-3 mt-lg-0 pt-3 pt-lg-0 border-top-2"
      :class="[$style.navigation, { 'd-none': !menuActive }]"
      :aria-hidden="!menuActive"
    >
      <RouterLink
        v-for="(item, index) in navigation"
        :key="index"
        :to="item.to"
        class="d-flex align-items-center w-100 mb-3 mb-lg-4 text-white text-decoration-none"
      >
        <VueFeather
          class="me-2 me-lg-3"
          :type="item.icon"
          size="24px"
          aria-hidden="true"
        />
        <span class="fs-5 fw-light">{{ item.title }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuActive: false,
      navigation: [
        {
          title: 'Home',
          to: '/dashboard',
          icon: 'home',
        },
        {
          title: 'Service Providers',
          to: '/dashboard',
          icon: 'map-pin',
        },
        {
          title: 'Services',
          to: '/dashboard',
          icon: 'settings',
        },
        {
          title: 'Staff',
          to: '/dashboard',
          icon: 'users',
        },
      ],
    };
  },
};
</script>

<style lang="scss" module>
.sidebarNav {
  @include media-breakpoint-up(lg) {
    width: 292px;
  }
}

.navigation {
  border-top: 1px solid $white;

  @include media-breakpoint-up(lg) {
    border-top: 0;
  }
}

.logo {
  height: auto;
  max-width: 90px;

  @include media-breakpoint-up(md) {
    max-width: 120px;
  }

  @include media-breakpoint-up(lg) {
    max-width: 160px;
  }
}
</style>
