<template>
  <div id="app" class="container-fluid h-100">
    <div class="row h-100">

      <!-- Left column -->
      <div class="d-none d-lg-block col-lg-2 col-xl-4 listz-aside">
        <activity-component></activity-component>
        <div class="listz-brush-left"></div>
      </div>

      <!-- Center column -->
      <div class="listz-center col-md-12 col-lg-8 col-xl-4 d-flex flex-column">
        <form-component></form-component>
        <list-component></list-component>
      </div>

      <!-- Right column -->
      <div class="d-none d-lg-block col-lg-2 col-xl-4 listz-aside">
        <div class="listz-brush"></div>
        <contributors-component></contributors-component>
      </div>
      
    </div>
  </div>
</template>

<script>
import ListComponent from "./components/ListComponent.vue";
import FormComponent from "./components/FormComponent.vue";
import ActivityComponent from "./components/ActivityComponent.vue";
import ContributorsComponent from "./components/ContributorsComponent.vue";

import Listz from "listz";
import queryString from "query-string";

import Actions from './store/Actions';

export default {
  name: "app",
  components: {
    FormComponent,
    ListComponent,
    ActivityComponent,
    ContributorsComponent

  },
  data() {
    return {
      // Filters
      filterTagsLiterally: true
    };
  },
  mounted() {

    this.loadListzFromUrl();
  },
  methods: {
    loadListzFromUrl() {

      let requestParameters = queryString.parse(location.search);

      this.$store.dispatch({
        type: Actions.SET_LISTZ_URL_QUERY_STRING,
        queryString: typeof requestParameters.listz == "undefined" ? "listz-all" : requestParameters.listz
      });

      this.loadListz(requestParameters.listz);
    },
    loadListz(listzName) {

      this.$store.dispatch({
        type: Actions.LOAD_LISTZ_FROM_URL,
        listzUrl: this.generateListzUrl(listzName)
      });

    },
    generateListzUrl(listzName) {

      if (typeof listzName == "undefined" || listzName == null)
        return "https://listz.github.io/listz-all/listz.json";
      return `https://listz.github.io/${listzName}/listz.json`;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=K2D');
@import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css');

:root {
  --listz-background-color-aside: #004a7f;
  --listz-background-color-center: white;

  --listz-background-color-form: #004a7f;
  --listz-foreground-color-form: #c33149;

  --listz-background-color-form-from: #004a7f;
  --listz-background-color-form-to: #0f619b;

  --listz-gradient-color-from: #da3e58;
  --listz-gradient-color-to: #f1677e;

  --listz-brush-width: 100px;

  --listz-scroll-overflow: 40px;
  --listz-center-padding: 20px;
  --listz-border-radius: 10px;

  --listz-item-padding: 10px;
  --listz-item-tag-hover: #da3e58;
  --listz-title-hover: #da3e58;
  
  --listz-white-color: rgba(255, 255, 255, 0.8);

  --listz-top-margin: calc(3em - 25px);
}

.listz-gradient {
  background-color: var(--listz-gradient-color-from);
  background-image: linear-gradient(to bottom right, var(--listz-gradient-color-from), var(--listz-gradient-color-to));
  transition: background-color background-image 0.2s;
}

.listz-gradient:hover {
  background-image: linear-gradient(to bottom right, var(--listz-gradient-color-to), var(--listz-gradient-color-from));
  background-color: var(--listz-gradient-color-to);
}

.listz-normal-gradient {
  background-color: var(--listz-background-color-form);
  background-image: linear-gradient(to bottom right, var(--listz-background-color-form-from), var(--listz-background-color-form-to));
}

html,
body {
  height: 100%;

  background-color: gray;
}

.listz-center {
  background-color: var(--listz-background-color-center);
  z-index: 5;
  padding: 0;
}

.listz-aside {
  background-color: var(--listz-background-color-aside);

  background-image: url("~./assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.listz-brush,
.listz-brush-left {
  position: absolute;

  height: 100%;
  width: var(--listz-brush-width);

  background-image: url("~./assets/img/brushed.png");
  background-color: transparent;
  background-size: contain;
  background-repeat: repeat-y;

  z-index: 2;
}

.listz-brush {
  left: 0;
}

.listz-brush-left {
  right: 0;
  background-image: url("~./assets/img/brushed-left.png");
}

@media screen and (max-width: 1200px) {
  .listz-scroll-outer-container {
    display: none;
  }
}

.listz-scroll-outer-container {
  position: absolute;

  box-sizing: border-box;

  left: var(--listz-top-margin);
  top: var(--listz-top-margin);
  bottom: 0;
  right: var(--listz-brush-width);

  overflow: hidden;
}

.listz-scroll-inner-container {
  height: 100%;
  width: calc(100% + var(--listz-scroll-overflow));

  overflow-y: scroll;
}

.listz-scroll-inner-container h2 {
  font-size: 1.2em;
  padding: 10px;
  color: var(--listz-white-color);

  display: flex;
  flex-direction: column;
}
</style>
