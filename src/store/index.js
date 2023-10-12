import { createStore } from "vuex";

const state = {
  user: null,
};

export default createStore({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
  },
  modules: {},
});
