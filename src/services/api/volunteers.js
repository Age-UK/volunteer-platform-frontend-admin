/**
 * Volunteers Service.
 *
 * @file Volunteers API service.
 *
 * @module volunteers
 */

/**
 * Import axios.
 *
 * @external "axios"
 * @see {@link https://www.npmjs.com/package/axios}
 */
import axios from 'axios';

/**
 * Import Vuex Store.
 */
import store from '@/store';

/**
 * Base URL for authorisation service.
 *
 * @constant
 * @type {string}
 */
const baseURL = process.env.VUE_APP_BACKEND_ENDPOINT;

/**
 * Salesforce oAuth Axios instance.
 */
const volunteers = axios.create({
  baseURL: baseURL,
});

/**
 * Get searchable volunteers list.
 *
 * @async
 *
 * @param {object} payload - Arguments payload.
 * @returns {object|Error} - Returns object with array of volunteers and total, empty values if not authenticated.
 *
 * @example
 *   let response = await this.$services.volunteers.search({
 *     page: 1,
 *   });
 */
const search = async payload => {
  /**
   * Auth header for requests to service.
   *
   * @constant
   * @type {string}
   */
  const authToken = store.getters['auth/getAuthToken'];

  const defaults = {
    page: 1,
    searchTerm: '',
    divisions: [],
    statuses: [],
  };

  const mergedPayload = {
    ...defaults,
    ...payload,
  };

  if (authToken) {
    try {
      const results = await volunteers({
        method: 'post',
        url: 'volunteers/search',
        data: mergedPayload,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });

      const total = await volunteers({
        method: 'post',
        url: 'volunteers/search/total',
        data: mergedPayload,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });

      return {
        results: results.data,
        total: total.data.total,
      };
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  } else {
    return {
      results: [],
      total: 0,
    };
  }
};

/**
 * Get divisions data.
 *
 * @async
 *
 * @returns {Array|Error} - Array of divisions, empty array if not authenticated.
 *
 * @example
 *   let response = await this.$services.volunteers.divisions();
 */
const divisions = async () => {
  /**
   * Auth header for requests to service.
   *
   * @constant
   * @type {string}
   */
  const authToken = store.getters['auth/getAuthToken'];

  if (authToken) {
    try {
      let response = await volunteers({
        method: 'get',
        url: `divisions`,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });

      return response.data;
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  } else {
    return [];
  }
};

/**
 * Get volunteer profile data.
 *
 * @async
 *
 * @param {string} id - User ID.
 * @returns {object|Error} - Returns volunteer profile object, empty object if not authenticated.
 *
 * @example
 *   let response = await this.$services.volunteers.profile('xxx-xxx-xxx');
 */
const profile = async id => {
  /**
   * Auth header for requests to service.
   *
   * @constant
   * @type {string}
   */
  const authToken = store.getters['auth/getAuthToken'];

  if (authToken) {
    try {
      let response = await volunteers({
        method: 'get',
        url: `volunteers/${id}`,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });

      return response.data;
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  } else {
    return {};
  }
};

export default {
  search: search,
  divisions: divisions,
  profile: profile,
};
