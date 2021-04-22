export default {
  namespaced: true,
  state: () => ({
    active: false,
    type: null,
    text: null,
  }),
  mutations: {
    setAlert(state, alert) {
      state.active = alert.active;
      state.type = alert.type;
      state.text = alert.text;
    },
  },
  actions: {
    showAlert({ commit }, alert) {
      alert.active = true;
      commit('setAlert', alert);
    },
    hideAlert({ commit }) {
      commit('setAlert', {
        active: false,
        type: null,
        text: null,
      });
    },
  },
  getters: {},
};
