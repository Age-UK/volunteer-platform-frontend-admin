<template>
  <div class="d-flex min-vh-100 flex-column flex-lg-row">
    <Navigation />

    <main class="w-100" role="main">
      <UserBar />

      <RouterView></RouterView>
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/dashboard/Navigation';
import UserBar from '@/components/dashboard/UserBar';

export default {
  components: {
    Navigation,
    UserBar,
  },
};
</script>
