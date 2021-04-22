<template>
  <div class="p-4 p-lg-5">
    <h2 class="mb-4 fw-bold text-muted">
      {{ $language.views.dashboard.volunteerIndex.title }}
    </h2>

    <h3 class="mb-4">
      {{ $language.views.dashboard.volunteerIndex.subTitle }}
    </h3>

    <div class="row">
      <div class="col-12 col-lg-6 mb-3">
        <label class="form-label fw-bold" for="search-term">Search:</label>
        <input
          id="search-term"
          class="form-control"
          placeholder="Forenames, surname, email or postcode"
          @input="updateSearchTerm"
        />
      </div>

      <div class="col-12 col-lg-3 mb-3">
        <label class="fw-bold mb-2" for="filter-division">Division:</label>
        <select
          id="filter-division"
          class="form-select"
          :disabled="!defaults.divisions.length"
          @input="updateDivisions"
        >
          <option value="" selected>All</option>
          <option
            v-for="(division, index) in defaults.divisions"
            :key="index"
            :value="division.id"
          >
            {{ division.name }}
          </option>
        </select>
      </div>

      <div class="col-12 col-lg-3 mb-3">
        <label class="fw-bold mb-2" for="filter-status">Status:</label>
        <select id="filter-status" class="form-select" @input="updateStatuses">
          <option value="" selected>All</option>
          <option
            v-for="(status, index) in defaults.statuses"
            :key="index"
            :value="status.value"
          >
            {{ status.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="table-responsive" :class="{ loading: searching }">
      <table class="table bg-light">
        <thead class="bg-gray">
          <tr>
            <th scope="col">Forenames</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Divisions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(volunteer, index) in volunteers" :key="index">
            <td>{{ volunteer.forenames }}</td>
            <td>{{ volunteer.surname }}</td>
            <td>{{ volunteer.email }}</td>
            <td>{{ volunteer.status }}</td>
            <td class="w-25">
              {{ volunteer.divisions.join(', ') }}
            </td>
            <td>
              <RouterLink
                :to="`/profile/${volunteer.id}`"
                class="w-100 btn btn-primary"
              >
                View
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :current="Number($route.params.page)" :total="total" />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';
import Pagination from '@/components/dashboard/Pagination';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      searching: false,
      total: 0,
      defaults: {
        divisions: [],
        statuses: this.$appGlobals.statuses,
      },
      volunteers: [],
      search: {
        page: 1,
        searchTerm: '',
        divisions: [],
        statuses: [],
      },
    };
  },
  watch: {
    search: {
      async handler(val) {
        await this.searchVolunteers(val);
      },
      immediate: true,
      deep: true,
    },
    'search.searchTerm': async function() {
      this.$router.replace('/dashboard');
    },
    'search.divisions': async function() {
      this.$router.replace('/dashboard');
    },
    'search.statuses': async function() {
      this.$router.replace('/dashboard');
    },
    '$route.params.page': {
      async handler(val) {
        this.search.page = val;
      },
      immediate: true,
    },
  },
  async beforeCreate() {
    this.defaults.divisions = await this.$services.volunteers.divisions();
  },
  methods: {
    async searchVolunteers(payload) {
      this.searching = true;

      const search = await this.$services.volunteers.search({
        ...payload,
      });

      this.volunteers = search.results;
      this.total = search.total;

      this.searching = false;
    },
    updateSearchTerm: _debounce(function(e) {
      this.search.searchTerm = e.target.value;
    }, 500),
    updateDivisions(e) {
      this.search.divisions = e.target.value ? [e.target.value] : [];
    },
    updateStatuses(e) {
      this.search.statuses = e.target.value ? [e.target.value] : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  opacity: 0.25;
}
</style>
