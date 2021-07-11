import Vue from 'vue';
import Vuex from 'vuex';
import { getPackagesByName } from '@/plugins/algoliasearch';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hits: [],
    page: 0,
    nbPages: null,
    nbHits: -1,
    packageName: null,
    loading: false,
  },
  mutations: {
    SET_PACKAGES(state, payload) {
      let thisState = { ...state };
      thisState = { ...payload };
      Object.assign(state, thisState);
    },
    SET_LOADING(state, payload) {
      const thisState = { ...state };
      thisState.loading = payload;
      Object.assign(state, thisState);
    },
    SET_PACKAGE_NAME(state, payload) {
      let thisState = { ...state };
      thisState = { ...payload };
      Object.assign(state, thisState);
    },
    CLEAR(state) {
      const thisState = { ...state };
      thisState.hits = [];
      thisState.packageName = null;
      Object.assign(state, thisState);
    },

  },
  actions: {
    setPackages({ commit }, payload) {
      commit('SET_PACKAGES', payload);
    },
    setPackageName({ commit }, payload) {
      commit('SET_PACKAGE_NAME', payload);
    },
    search({ commit }, payload) {
      commit('SET_LOADING', true);
      const { packageName, page } = { ...payload };
      return getPackagesByName(packageName, page).then((res) => {
        commit('SET_PACKAGES', { ...res, packageName });
        commit('SET_LOADING', false);
      });
    },
    clear({ commit }) {
      commit('CLEAR');
    },
  },
  modules: {
  },
  getters: {
    hits: (state) => state.hits,
    page: (state) => state.page,
    packageName: (state) => state.packageName,
    nbPages: (state) => state.nbPages,
    nbHits: (state) => state.nbHits,
    loading: (state) => state.loading,
  },
});
