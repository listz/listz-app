<template>
  <div id="listz-form" class="listz-normal-gradient row rounded">

    <div id="listz-form-title-container" class="d-flex justify-content-end align-items-center">
      <h2 id="listz-form-title-container-title" class="listz-gradient rounded">{{$store.state.listz.name}}</h2>
      <h2 id="listz-form-title-arrow" class="listz-gradient rounded listz-form-arrow" 
          :class="{ 'listz-arrow-turned' : moreVisible  }" 
          @click="toggleMore">
        <i class="fas fa-angle-down"></i>
      </h2>
      <a href="https://listz.github.io/" class="">
        <h2 id="listz-form-title-home" class="listz-gradient rounded listz-form-arrow">
          <i class="fa fa-home" aria-hidden="true"></i>
        </h2>
      </a>
    </div>

    <div :class="{ 'listz-form-more-hidden': !moreVisible, 'listz-form-more-visible': moreVisible }">
        {{$store.state.listz.description}}
    </div>

    <input type="text" class="mt-3 form-control" placeholder="🔍" v-model="searchInput">

  </div>
</template>

<script>
import debounce from "lodash.debounce";
import Actions from "./../store/Actions";

export default {
  name: "listz-form",
  data() {
    return {
      // Class style bindings
      moreVisible: false,
      formSearchInput: ""
    };
  },
  computed: {

    searchInput: {
      get() {
        return this.$store.state.query;
      },
      set(value) {
        this.debounceInput(value);
      }
    }
  },
  methods: {

    debounceInput: debounce(function (query) {
      this.$store.commit({
        type: Actions.SET_QUERY,
        query
      });
    }, 500),

    toggleMore() {
      this.moreVisible = !this.moreVisible;
    }
  }
};
</script>

<style>
#listz-form {
  position: relative;
  background-color: var(--listz-background-color-form);

  padding: 25px;
  padding-top: 2em;

  margin: var(--listz-center-padding);
  margin-top: 3em;

  font-family: "K2D", sans-serif;
  color: white;
}

#listz-form-title-container {
  position: absolute;

  width: calc(100% - 50px);
  height: 50px;

  left: 25px;
  top: -25px;
}

#listz-form-title-container a {
  text-decoration: none;
  color: white;
}

#listz-form-title-container h2 {
  font-size: 1.2em;
  padding: 10px;
  margin-right: 10px;
}

#listz-form-title-container-title {
  left: 0;
  margin-left: 0;
  margin-right: auto !important;
}

#listz-form-title-arrow {
  cursor: pointer;
  transition: transform 0.2s;
}

.listz-arrow-turned {
  transform: rotate(180deg);
}

.listz-form-more-hidden,
.listz-form-more-visible {
  overflow: hidden;
  transition: max-height 0.5s;
  transition-timing-function: linear;
}

.listz-form-more-hidden {
  max-height: 0;
}

.listz-form-more-visible {
  max-height: 500px;
}
</style>

