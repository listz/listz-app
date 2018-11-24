import Vue from 'vue';
import Vuex from 'vuex';
import Listz from 'listz';
import Actions from './Actions';
import axios from "axios";

const octokit = require('@octokit/rest')();

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {

    // Initial Listz
    listz: new Listz(),
    query: "",
    queryString: "",
    commits: new Array(),
    contributors: new Object()

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
    },

    [Actions.SET_COMMITS](state, payload) {

      state.commits = payload.commits;
    },

    [Actions.SET_CONTRIBUTORS](state, payload) {

      console.log(payload.contributors);
      state.contributors = payload.contributors;
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

    [Actions.TAG_CLICKED]({ commit }, payload) {

      commit({
        type: Actions.SET_QUERY,
        query: payload.tag
      });

    },

    [Actions.SET_LISTZ_URL_QUERY_STRING]({ commit, dispatch }, payload) {

      commit({
        type: Actions.SET_LISTZ_URL_QUERY_STRING,
        queryString: payload.queryString
      });

      dispatch({
        type: Actions.LOAD_COMMITS
      });

      dispatch({
        type: Actions.LOAD_CONTRIBUTORS
      })
    },

    [Actions.LOAD_COMMITS]({ commit, dispatch }) {

      octokit.repos.listCommits({ owner: "listz", repo: this.state.queryString }).then(response => {

        commit({
          type: Actions.SET_COMMITS,
          commits: response.data
        })
      });
    },

    [Actions.LOAD_CONTRIBUTORS]({ commit }) {

      octokit.repos.listContributors({ owner: "listz", repo: this.state.queryString, per_page: 20}).then(response => {
        commit({
          type: Actions.SET_CONTRIBUTORS,
          contributors: response.data
        });
      });

      /*let page = 1;
      let hasNextPage = true;
      let data;

      do {
        octokit.repos.listCommits({ owner: "listz", repo: this.state.queryString, page: 1 }).then(response => {

          if (response.data.length == 0) hasNextPage = false;

          for (let item of response.data) data.push(item);
          
        });
      } while (hasNextPage)

      console.log(data);*/

      /*octokit.paginate('GET /repos/:owner/:repo/commits', { owner: 'listz', repo: this.state.queryString }).then(commits => {

        let contributors = new Object();

        commits.map(currentCommit => {
          if (typeof currentCommit.author != "undefined" && currentCommit.author != null) {
            let currentAuthor = currentCommit.author;
            if (typeof contributors[currentAuthor.login] != "undefined" && contributors[currentAuthor.login] != null) contributors[currentAuthor]++;
            else contributors[currentAuthor.login] = 1;
          }
        });

        commit({
          type: Actions.SET_CONTRIBUTORS,
          contributors
        });

      });*/
    }
  }
});