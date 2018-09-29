<template>
  <div id="app" class="container-fluid h-100">
    <div class="row h-100">

      <!-- Left column -->
      <div class="d-none d-sm-block col-sm-2 col-lg-4 listz-aside">
        <div class="listz-brush-left"></div>
      </div>

      <!-- Center column -->
      <div class="col-xs-12 col-sm-8 col-lg-4 listz-center">
        <list-component></list-component>
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

export default {
  name: "app",
  components: {
    ListComponent
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style>
:root {
  --listz-background-color-aside: #004a7f;
  --listz-background-color-center: white;

  --listz-brush-width: 100px;
}

html, body {
  height: 100%;

  background-color: gray;
}

.listz-center {
  background-color: var(--listz-background-color-center);
}

.listz-aside {
  background-color: var(--listz-background-color-aside);
}

.listz-brush, .listz-brush-left {
  position: absolute;
  
  height: 100%;
  width: var(--listz-brush-width);

  background-image: url('~./assets/img/brushed.png');
  background-color: transparent;
  background-size: contain;
  background-repeat: repeat-y;
}

.listz-brush {
  left: 0;
}

.listz-brush-left {
  right: 0;
  transform: scale(-1);
}

</style>
