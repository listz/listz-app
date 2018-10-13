<template>
  <div id="listz-form" class="listz-normal-gradient row rounded">

    <div id="listz-form-title-container" class="d-flex justify-content-between align-items-center">
      <h2 class="listz-gradient rounded">{{listz.name}}</h2>
      <h2 id="listz-form-title-arrow" class="listz-gradient rounded listz-form-arrow" 
          :class="{ 'listz-arrow-turned' : moreVisible  }" 
          v-on:click="toggleMore">
        <i class="fas fa-angle-down"></i>
      </h2>
    </div>

    <div :class="{ 'listz-form-more-hidden': !moreVisible, 'listz-form-more-visible': moreVisible }">
        {{listz.description}}
    </div>

    <input type="text" class="mt-3 form-control" placeholder="🔍">

  </div>
</template>

<script>
export default {
  name: "listz-form",
  props: {
    listz: Object
  },
  data() {
    return {
      // Class style bindings
      moreVisible: false,
    }
  },
  methods: {
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

  font-family: 'K2D', sans-serif;
  color: white;
}

#listz-form-title-container {
  position: absolute;

  width: calc(100% - 50px);
  height: 50px;

  left: 25px;
  top: -25px;
}

#listz-form-title-container h2 {
  font-size: 1.2em;
  padding: 10px;
  margin-right: 10px;
}

#listz-form-title-arrow {
  cursor: pointer;
  transition: transform 0.2s;
}

.listz-arrow-turned {
  transform: rotate(180deg);
}

.listz-form-more-hidden, .listz-form-more-visible {
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

.listz-form-search-input {
}

</style>

