import Vue from 'vue';
import Vuex from 'vuex';
import Listz from 'listz';
import Actions from './Actions';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {

    // Initial Listz
    listz: new Listz(),
    query: "",
    queryString: "",

  },
  getters: {
    resultItems: state => {

      let query = state.query.toLowerCase();
      let items = state.listz.items;

      if (state.query == "") {
        return items;
      }
      else {
        let itemSet = new Set();

        for (let item of items) {
          if (item.name.toLowerCase().indexOf(query) >= 0) itemSet.add(item);
          else if (item.description.toLowerCase().indexOf(query) >= 0) itemSet.add(item);
          else {
            for (let tag of item.tags) {
              if (tag.toLowerCase().indexOf(query) >= 0) itemSet.add(item);
            }
          }
        }
        return Array.from(itemSet);
      }
    },
    query: state => {
      return state.query;
    }
  },
  mutations: {

    [Actions.SET_LISTZ](state, payload) {

      state.listz = payload.listz;
      document.title = state.listz.name;
    },

    [Actions.SET_QUERY](state, payload) {

      state.query = payload.query;
    },

    [Actions.SET_LISTZ_URL_QUERY_STRING](state, payload) {

      state.queryString = payload.queryString;
    }
  },
  actions: {

    [Actions.LOAD_LISTZ]({ commit }, payload) {

      commit({
        type: Actions.SET_LISTZ,
        listz: payload.listz
      });
    },

    [Actions.LOAD_LISTZ_FROM_URL]({ dispatch }, payload) {

      axios.get(payload.listzUrl).then(function (response) {
        let result = Listz.validate(JSON.stringify(response.data));

        dispatch({
          type: Actions.LOAD_LISTZ,
          listz: result.result
        });

      }.bind(this)).catch(function (error) {
        console.log("No valid Listz domain.");
      }.bind(this));
    },

    [Actions.TAG_CLICKED]({ dispatch, commit }, payload) {

      commit({
        type: Actions.SET_QUERY,
        query: payload.tag
      });

    },
  }
});