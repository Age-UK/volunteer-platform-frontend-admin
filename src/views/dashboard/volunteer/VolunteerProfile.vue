<template>
  <div class="p-4 p-lg-5">
    <RouterLink
      :to="{ name: 'Dashboard' }"
      class="text-dark fw-bold text-decoration-none mb-4 d-flex align-items-center"
    >
      <VueFeather
        class="me-1"
        type="arrow-left"
        size="16px"
        aria-hidden="true"
      />
      {{ $language.general.app.backLink }}
    </RouterLink>

    <h2 class="mb-4 text-muted fw-bold d-flex align-items-center">
      <VueFeather class="me-2" type="user" size="30px" aria-hidden="true" />
      {{ $language.views.dashboard.volunteerProfile.title }}
    </h2>

    <h3 class="mb-2">
      {{ profile.title }} {{ profile.forenames }} {{ profile.surname }}
    </h3>

    <p v-if="profile.email" class="d-flex align-items-center fs-5 mb-1">
      <VueFeather type="at-sign" class="text-muted me-2" aria-hiden="true" />
      <span class="visually-hidden">Email</span>
      <a :href="`mailto:${profile.email}`" class="text-decoration-none">{{
        profile.email
      }}</a>
    </p>

    <p v-if="profile.telephone" class="d-flex align-items-center fs-5 mb-1">
      <VueFeather type="phone" class="text-muted me-2" aria-hidden="true" />
      <span class="visually-hidden">Telephone</span>
      {{ profile.telephone }}
    </p>

    <table class="table table-striped mt-5 mb-4">
      <thead class="bg-primary">
        <th scope="col" colspan="2">
          <h3 class="h5 text-light mb-0">
            Volunteer Status
          </h3>
        </th>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="w-25">
            Status
          </th>
          <td>
            {{ profile.status }}

            <small class="d-block mt-1 text-muted fw-bold text-sm">
              Last updated: {{ statusChangedAt }}
            </small>
          </td>
        </tr>
        <tr>
          <th scope="row">Created</th>
          <td>{{ createdAt }}</td>
        </tr>
        <tr>
          <th scope="row">Updated</th>
          <td>{{ updatedAt }}</td>
        </tr>
      </tbody>
    </table>

    <table class="table table-striped mb-4">
      <thead class="bg-primary">
        <th scope="col" colspan="2">
          <h3 class="h5 text-light mb-0">
            Volunteer Information
          </h3>
        </th>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="w-25">Date of Birth</th>
          <td>{{ profile.dateOfBirth }}</td>
        </tr>
        <tr>
          <th scope="row">Interests</th>
          <td>
            <span
              v-for="(interest, index) in interests"
              :key="index"
              class="d-flex align-items-center"
            >
              <VueFeather
                class="text-muted me-2"
                type="check"
                size="16px"
                aria-hidden="true"
              />
              {{ interest }}
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">Communication Preferences</th>
          <td v-if="hasCommsPreferences">
            <span
              v-for="preference in commsPreferences"
              :key="preference.value"
              class="d-flex align-items-center"
              :class="{ 'd-none': !profile[preference.value] }"
            >
              <VueFeather
                class="text-muted me-2"
                :type="preference.icon"
                size="16px"
                aria-hidden="true"
              />
              {{ preference.name }}
            </span>
          </td>
          <td v-else>
            Do Not Contact
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table table-striped mb-4">
      <thead class="bg-primary">
        <th scope="col" colspan="2">
          <h3 class="h5 text-light mb-0">
            Volunteer Address
          </h3>
        </th>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="w-25">Address Line 1</th>
          <td>{{ profile.addressLine1 }}</td>
        </tr>
        <tr>
          <th scope="row">Address Line 2</th>
          <td>{{ profile.addressLine2 }}</td>
        </tr>
        <tr>
          <th scope="row">Town</th>
          <td>{{ profile.town }}</td>
        </tr>
        <tr>
          <th scope="row">Postcode</th>
          <td>{{ profile.postcode }}</td>
        </tr>
        <tr>
          <th scope="row">County</th>
          <td>{{ profile.county }}</td>
        </tr>
        <tr>
          <th scope="row">Country</th>
          <td>{{ profile.country }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      commsPreferences: [
        {
          name: 'SMS',
          value: 'CommsSMSEnabled',
          icon: 'smartphone',
        },
        {
          name: 'Post',
          value: 'CommsPostEnabled',
          icon: 'mail',
        },
        {
          name: 'Email',
          value: 'CommsEmailEnabled',
          icon: 'at-sign',
        },
        {
          name: 'Phone',
          value: 'CommsPhoneEnabled',
          icon: 'phone',
        },
      ],
      divisions: [],
      profile: {},
    };
  },
  computed: {
    statusChangedAt() {
      return this.profile.statusChangedAt
        ? this.formatDate(this.profile.statusChangedAt)
        : '---';
    },
    createdAt() {
      return this.profile.createdAt
        ? this.formatDate(this.profile.createdAt)
        : '---';
    },
    updatedAt() {
      return this.profile.updatedAt
        ? this.formatDate(this.profile.updatedAt)
        : '---';
    },
    volunteerDivisionIds() {
      return this.profile.interests
        ? this.profile.interests.map(i => i.divisionId)
        : [];
    },
    interests() {
      return this.volunteerDivisionIds
        ? this.divisions
            .filter(d => this.volunteerDivisionIds.includes(d.id))
            .map(d => d.name)
        : '---';
    },
    hasCommsPreferences() {
      return (
        this.profile.CommsSMSEnabled ||
        this.profile.CommsPostEnabled ||
        this.profile.CommsEmailEnabled ||
        this.profile.CommsPhoneEnabled
      );
    },
  },
  async beforeCreate() {
    this.divisions = await this.$services.volunteers.divisions();
    this.profile = await this.$services.volunteers.profile(
      this.$route.params.id,
    );
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), this.$appGlobals.dateFormat);
    },
  },
};
</script>
