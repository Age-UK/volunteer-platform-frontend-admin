/**
 * Auth Service.
 *
 * @file User authorisation API service.
 *
 * @module auth
 */

/**
 * Import axios.
 *
 * @external "axios"
 * @see {@link https://www.npmjs.com/package/axios}
 */
import axios from 'axios';

/**
 * Import jsonwebtoken.
 *
 * @external "jsonwebtoken"
 * @see {@link https://www.npmjs.com/package/jsonwebtoken}
 */
import jwt from 'jsonwebtoken';

/**
 * Import NProgress.
 *
 * @external "nprogress"
 * @see {@link https://www.npmjs.com/package/nprogress}
 */
import NProgress from 'nprogress';

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
const auth = axios.create({
  baseURL: baseURL,
});

/**
 * Get authorisation token, log user in.
 *
 * @async
 *
 * @param {object} payload - Credentials payload including email address and password.
 * @returns {Promise} - Axios Promise function response ('post').
 *
 * @example
 *   let response = await this.$services.auth.login({
 *     user: {
 *       email: 'user@domain.com',
 *       password: 'aSecurePassword',
 *     }
 *   });
 */
const login = async payload => {
  NProgress.start();

  try {
    let response = await auth({
      method: 'post',
      url: 'login',
      data: payload,
    });

    store.dispatch('auth/updateUser', response.data.user);
  } catch (e) {
    let authError = new Error();

    if (e.message === 'Request failed with status code 401') {
      authError.name = 'Unauthorized';
      authError.message = 'Sorry, it looks like those details are incorrect.';

      throw authError;
    } else {
      authError.name = 'Request Failed';
      authError.message = 'Oops! It looks like something went wrong.';

      throw authError;
    }
  } finally {
    NProgress.done();
  }
};

/**
 * Log user out.
 *
 * @async
 */
const logout = async () => {
  store.dispatch('auth/removeUser');
};

/**
 * Trigger password reset request, allow user to get authorisation token to
 * reset password via email.
 *
 * @async
 *
 * @param {object} payload - Credentials payload including email address.
 * @returns {Promise} - Axios Promise function response ('post').
 *
 * @example
 *   let response = await this.$services.auth.resetPasswordRequest({
 *     user: {
 *       email: 'user@domain.com',
 *     }
 *   });
 */
const resetPasswordRequest = async payload => {
  NProgress.start();

  try {
    await auth({
      method: 'post',
      url: 'resetPasswordRequest',
      data: payload,
    });
  } catch (e) {
    let authError = new Error();
    authError.name = 'Request Failed';
    authError.message = 'Oops! It looks like something went wrong.';

    throw authError;
  } finally {
    NProgress.done();
  }
};

/**
 * Trigger password reset with authorisation code and email.
 *
 * @async
 *
 * @param {object} payload - Credentials payload including authorisation code and new password.
 * @returns {Promise} - Axios Promise function response ('post').
 *
 * @example
 *   let response = await this.$services.auth.resetPassword({
 *     resetPasswordRequest: {
 *       id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
 *       password: 'aNewSecurePassword',
 *     }
 *   });
 */
const resetPassword = async payload => {
  NProgress.start();

  try {
    await auth({
      method: 'post',
      url: 'resetPassword',
      data: payload,
    });
  } catch (e) {
    let authError = new Error();

    if (e.message === 'Request failed with status code 401') {
      authError.name = 'Unauthorized';
      authError.message =
        'Sorry, it looks your authorisation code has expired.';

      throw authError;
    } else {
      authError.name = 'Request Failed';
      authError.message = 'Oops! It looks like something went wrong.';

      throw authError;
    }
  } finally {
    NProgress.done();
  }
};

/**
 * Check local storage for user authentication, set in store if user exists in
 * local storage.
 *
 * @async
 */
const setUserIfAuthenticated = async () => {
  const authenticatedUser = localStorage.getItem('authenticatedUser');

  if (authenticatedUser) {
    const user = JSON.parse(authenticatedUser);

    store.dispatch('auth/setUser', user);
  }
};

/**
 * Check user's authentication is valid (token has not expired).
 *
 * @returns {boolean} - True / false if token expiry can be checked, true by default.
 *
 * @async
 */
const userAuthenticationInvalid = async () => {
  const authenticatedUser = localStorage.getItem('authenticatedUser');

  if (authenticatedUser) {
    const user = JSON.parse(authenticatedUser);

    return (
      parseInt(
        Date.now()
          .toString()
          .slice(0, 10),
        10,
      ) > jwt.decode(user.token).exp
    );
  }

  return true;
};

export default {
  login: login,
  logout: logout,
  resetPasswordRequest: resetPasswordRequest,
  resetPassword: resetPassword,
  setUserIfAuthenticated: setUserIfAuthenticated,
  userAuthenticationInvalid: userAuthenticationInvalid,
};
