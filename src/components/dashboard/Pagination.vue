<template>
  <nav aria-label="Pagination">
    <ul class="pagination justify-content-end mb-2">
      <li class="page-item" :class="{ disabled: !hasPrev }">
        <RouterLink v-if="hasPrev" :to="page(prev)" class="page-link">
          {{ $language.components.pagination.prev }}
        </RouterLink>
        <span v-else class="page-link">
          {{ $language.components.pagination.prev }}
        </span>
      </li>

      <li
        v-for="index in pages"
        :key="index"
        class="page-item"
        :class="{ active: index === current }"
        :aria-current="index === current ? 'page' : null"
      >
        <RouterLink :to="page(index)" class="page-link">
          {{ index }}
        </RouterLink>
      </li>

      <li class="page-item" :class="{ disabled: !hasNext }">
        <RouterLink v-if="hasNext" :to="page(next)" class="page-link">
          {{ $language.components.pagination.next }}
        </RouterLink>
        <span v-else class="page-link">
          {{ $language.components.pagination.next }}
        </span>
      </li>
    </ul>
  </nav>

  <p class="text-small text-end fst-italic">
    {{ $language.components.pagination.total }}:
    <span class="fw-bold">{{ total }}</span>
  </p>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.$appGlobals.perPage);
    },
    prev() {
      return this.current - 1;
    },
    next() {
      return this.current + 1;
    },
    hasPrev() {
      return this.current !== 1;
    },
    hasNext() {
      return this.current !== this.pages;
    },
  },
  methods: {
    page(number) {
      return {
        name: this.$route.name,
        params: {
          page: number,
        },
      };
    },
  },
};
</script>
