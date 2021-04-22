import { createRouter, createWebHashHistory } from 'vue-router';
import { auth } from '@/services';
import store from '@/store';
import NProgress from 'nprogress';
import LogIn from '@/views/auth/LogIn';
import ResetPasswordRequest from '@/views/auth/ResetPasswordRequest';
import ResetPassword from '@/views/auth/ResetPassword';
import Dashboard from '@/views/dashboard/Index';
import VolunteerIndex from '@/views/dashboard/volunteer/VolunteerIndex';
import VolunteerProfile from '@/views/dashboard/volunteer/VolunteerProfile';

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
    meta: {
      title: 'Log in',
      isAuth: true,
      requiresAuth: false,
    },
  },
  {
    path: '/reset-password-request',
    name: 'ResetPasswordRequest',
    component: ResetPasswordRequest,
    meta: {
      title: 'Reset password request',
      isAuth: true,
      requiresAuth: false,
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      title: 'Reset password',
      isAuth: true,
      requiresAuth: false,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/1',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
    },
    children: [
      {
        path: ':page',
        component: VolunteerIndex,
      },
      {
        path: '/profile/:id',
        component: VolunteerProfile,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**
 * Route guards
 */
router.beforeEach(async to => {
  const isLoggedIn = localStorage.getItem('authenticatedUser') !== null;

  /**
   * Redirect user to Log In view if route requires auth, and user is logged
   * out.
   */
  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      name: 'LogIn',
      replace: true,
    };
  }

  /**
   * Redirect user to dashboard if route is an auth route (e.g. Log In) and
   * user is logged in.
   */
  if (to.meta.isAuth && isLoggedIn) {
    return {
      name: 'Dashboard',
      replace: true,
    };
  }

  /**
   * Redirect user to Log In view if authentication token has expired, log user
   * out and notify via message.
   */
  if ((await auth.userAuthenticationInvalid()) && isLoggedIn) {
    store.dispatch('auth/removeUser');

    store.dispatch('alert/showAlert', {
      type: 'alert-info',
      text: 'Your session has expired - please log back in to continue.',
    });

    return {
      name: 'LogIn',
      replace: true,
      query: {
        message: true,
      },
    };
  }
});

/**
 * NProgress
 */
router.beforeEach(async to => {
  /**
   * Hide any previous alerts, unless we send a query param (?message=true)
   * to the next router path to retain the Alert banner.
   */
  if (!to.query.message) {
    store.dispatch('alert/hideAlert');
  }

  /**
   * Start the route progress bar.
   */
  NProgress.start();
});

router.afterEach(async () => {
  window.scrollTo(0, 0);

  /**
   * Complete the animation of the route progress bar.
   */
  NProgress.done();
});

export default router;
