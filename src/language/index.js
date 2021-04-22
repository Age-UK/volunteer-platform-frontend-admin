export default {
  general: {
    app: {
      title: 'Volunteer Platform',
      backLink: 'Volunteer Platform Home',
    },
    form: {
      authCode: 'Authorisation code',
      emailAddress: 'Email address',
      password: 'Password',
      newPassword: 'Your new password',
      submit: 'Submit',
    },
  },
  views: {
    logIn: {
      title: 'Log In',
      passwordReset: 'Forgotten your password?',
    },
    resetPassword: {
      title: 'Reset Your Password',
      submit: 'Reset password',
    },
    resetPasswordRequest: {
      title: 'Request Password Reset',
    },
    dashboard: {
      volunteerIndex: {
        title: `Welcome to the ${process.env.VUE_APP_ORG_NAME} Volunteer Portal`,
        subTitle: 'Volunteers',
      },
      volunteerProfile: {
        title: 'Volunteer Profile',
      },
    },
  },
  components: {
    userBar: {
      logOut: 'Log out',
      userSettings: 'User settings',
    },
    pagination: {
      prev: 'Previous',
      next: 'Next',
      total: 'Total records',
    },
  },
};
