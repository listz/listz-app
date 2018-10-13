<template>
  <div id="app" class="container-fluid h-100">
    <div class="row h-100">

      <!-- Left column -->
      <div class="d-none d-sm-block col-sm-2 col-lg-4 listz-aside">
        <div class="listz-brush-left"></div>
      </div>

      <!-- Center column -->
      <div class="listz-center col-xs-12 col-sm-8 col-lg-4 d-flex flex-column">
        <form-component :listz="listz"></form-component>
        <list-component :items="resultItems()"></list-component>
      </div>

      <!-- Right column -->
      <div class="d-none d-sm-block col-sm-2 col-lg-4 listz-aside">
        <div class="listz-brush"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
import ListComponent from "./components/ListComponent.vue";
import FormComponent from "./components/FormComponent.vue";

import Listz from "listz";
import axios from "axios";
import queryString from "query-string";

export default {
  name: "app",
  components: {
    FormComponent,
    ListComponent
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      listz: new Listz(),
      isValid: true,
    };
  },
  mounted() {
    this.loadListzFromUrl();
  },
  methods: {
    resultItems() {
      return this.listz.items;
    },
    loadListzFromUrl() {
      let requestParameters = queryString.parse(location.search);
      this.loadListz(requestParameters.listz);
    },
    loadListz(listzName) {

      axios.get(this.generateListzUrl(listzName)).then(function (response) {
        console.log(response);
        let result = Listz.validate(JSON.stringify(response.data));
        console.log(result);

        this.listz = result.result;
        this.isValid = result.isValid;

        document.title = this.listz.name;

      }.bind(this)).catch(function (error) {
        console.log("No valid Listz domain.");
      }.bind(this));
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

  --listz-item-padding: 10px;
  --listz-item-tag-hover: #da3e58;
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
</style>
