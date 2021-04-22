export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  mutations: {
    setUserState(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUserState', user);
    },
    updateUser({ commit }, user) {
      localStorage.setItem('authenticatedUser', JSON.stringify(user));

      commit('setUserState', user);
    },
    removeUser({ commit }) {
      localStorage.removeItem('authenticatedUser');

      commit('setUserState', null);
    },
  },
  getters: {
    getAuthToken: state => {
      return state.user ? state.user.token : null;
    },
  },
};
