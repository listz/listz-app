<template>
  <div id="app" class="container-fluid h-100">
    <div class="row h-100">

      <!-- Left column -->
      <div class="d-none d-sm-block col-sm-2 col-lg-4 listz-aside">
        <div class="listz-brush-left"></div>
      </div>

      <!-- Center column -->
      <div class="listz-center col-xs-12 col-sm-8 col-lg-4 d-flex flex-column">
        <form-component :listz="listz" :searchInput="searchInput" :onSearchInputChange="onSearchInputChange"></form-component>
        <list-component :items="resultListz" :onTagClicked="onTagClicked"></list-component>
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
      listz: new Listz(),
      resultListz: new Array(),
      isValid: true,

      // Search
      searchInput: "",

      // Filters
      filterTagsLiterally: true
    };
  },
  mounted() {
    this.loadListzFromUrl();
  },
  methods: {
    resultItems() {
      return this.listz.items;
      //if (!this.resultListz) this.resultListz = this.listz.items;
      //return this.listz.items;
    },
    loadListzFromUrl() {
      let requestParameters = queryString.parse(location.search);
      this.loadListz(requestParameters.listz);
    },
    loadListz(listzName) {

      axios.get(this.generateListzUrl(listzName)).then(function (response) {
        let result = Listz.validate(JSON.stringify(response.data));

        this.listz = result.result;
        this.isValid = result.isValid;

        document.title = this.listz.name;
        this.searchItems();

      }.bind(this)).catch(function (error) {
        console.log("No valid Listz domain.");
      }.bind(this));
    },
    generateListzUrl(listzName) {
      if (typeof listzName == "undefined" || listzName == null)
        return "https://listz.github.io/listz-all/listz.json";
      return `https://listz.github.io/${listzName}/listz.json`;
    },
    searchItems() {

      if (this.searchInput == "") this.resultListz = Array.from(this.listz.items);
      
      let newResultList = new Set();

      for (let item of this.listz.items) {

        // if substr => 0 in name;
        if (item.name.indexOf(this.searchInput) >= 0) newResultList.add(item);
        else if (item.description.indexOf(this.searchInput) >= 0) newResultList.add(item);
        else {

          for (let tag of item.tags) {
            if (this.filterTagsLiterally) if (tag.toLowerCase() == this.searchInput.toLowerCase()) newResultList.add(item);
            else {
              if (tag.toLowerCase().indexOf(this.searchInput.toLowerCase())) newResultList.add(item);
            }
          }
        }
      }

      // Clear results
      while(this.resultListz.length > 0) this.resultListz.pop();

      // Add new results
      for (let item of newResultList) this.resultListz.push(item);
    },
    onSearchInputChange(searchValue) {
      this.searchInput = searchValue;
      this.searchItems();
    },
    onTagClicked(tag) {
      this.searchInput = tag;
      this.searchItems();
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
  --listz-title-hover: #da3e58;
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
