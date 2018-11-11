<template>
  <div id="listz-list" class="flex-grow-1 mt-3 row">

    <div id="listz-list-container">

      <form class="listz-item-add-container">
        <a :href="getEditUrl()" class="listz-item-add-button listz-gradient">+</a>
        <h4><a :href="getEditUrl()">Add an item.</a></h4>
      </form>

      <div :key="index" v-for="(listzItem, index) in $store.getters.resultItems" class="listz-item">

        <!-- Listz image -->
        <img :src="listzItem.image">

        <!-- Overview -->
        <div class="listz-item-overview">
          <h4><a :href="listzItem.link">{{listzItem.name}}</a></h4>
          <div class="listz-item-tags">
            <div :key="index" v-for="(itemTag, index) in listzItem.tags" @click="onTagClicked(itemTag)" class="listz-item-tag">{{itemTag}}</div>
          </div>
        </div>

        <!-- Details -->
        <div class="listz-item-detail-divider"></div>
        <div class="listz-item-detail">
          {{listzItem.description}}
        </div>
      </div>

      </div>

    <div class="fade-bottom"></div>

  </div>
</template>

<script>
import Actions from "./../store/Actions";

export default {
  name: "listz-list",
  methods: {
    onTagClicked(tag) {
      this.$store.dispatch({
        type: Actions.TAG_CLICKED,
        tag
      });
    },
    getEditUrl() {

      let editListzUrl = `https://github.com/listz/${this.$store.state.queryString}/edit/master/listz.json`;
      let addListzUrl = "https://github.com/listz/listz/issues/new?template=request-a-new-listz-repository.md";

      return this.$store.state.queryString == "listz-all" ? addListzUrl : editListzUrl;
    }
  }
};
</script>

<style>
#listz-list {
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  margin-bottom: 25px;
}

.fade-bottom {
  z-index: 2;

  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 100px;

  background-image: url("~../assets/img/fade.png");
  background-size: contain;
  background-repeat: repeat-x;
}

#listz-list-container {
  position: absolute;

  z-index: 1;

  width: calc(100% + var(--listz-scroll-overflow));
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
}

.listz-item-add-container {
  display: flex;
  align-items: center;

  width: calc(100% - var(--listz-scroll-overflow) - var(--listz-center-padding) - 5px);
  margin-left: var(--listz-center-padding);
  padding-bottom: 5px;
}

.listz-item-add-button {
  margin-right: 5px;

  padding: 5px;
  width: 50px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

  text-align: center;
  font-weight: bolder;
  text-decoration: none;
  color: white;
  font-size: 1.5em;
  padding-top: 0;

  cursor: pointer;

  transition: transform 0.2s;
}

.listz-item-add-button:hover {
  color: white;
  text-decoration: none;
  transform: scale(1.05);
}

.listz-item-add-container h4 {
  padding: 5px;
  margin: 0;
}

.listz-item-add-container h4 a { 
  text-decoration: none;
  color: black;
  font-size: 1em;
  line-height: 1em;
}

.listz-item-add-container h4 a:hover {  
  color: var(--listz-title-hover);
}

.listz-item {
  width: calc(
    100% - var(--listz-scroll-overflow) - var(--listz-center-padding) - 5px
  );
  max-height: 100px;

  margin-left: var(--listz-center-padding);
  margin-top: 25px;
  margin-bottom: 50px;

  cursor: pointer;
  transition: box-shadow 1s;

  overflow: hidden;
}

.listz-item:hover {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  transition: max-height 1s;
  max-height: 500px;
}

.listz-item:last-of-type {
  margin-bottom: 200px;
}

.listz-item > * {
  float: left;
}

.listz-item > img {
  width: 100px;
  height: 100px;
}

.listz-item .listz-item-overview {
  width: calc(100% - 100px - 2 * var(--listz-item-padding));
  margin: var(--listz-item-padding);
}

.listz-item .listz-item-overview > * {
  width: 100%;
  height: 50%;
}

.listz-item .listz-item-overview > h4 {
  line-height: 50px;
}

.listz-item .listz-item-overview > h4 > a {
  text-decoration: none;
  color: black;
}

.listz-item .listz-item-overview > h4 > a:hover {
  color: var(--listz-title-hover);
}

.listz-item-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.listz-item-tag {
  background-color: rgba(128, 128, 128, 0.5);
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 0.7em;
}

.listz-item-tag:hover {
  color: white;
  background-color: var(--listz-item-tag-hover);
}

.listz-item-detail-divider {
  width: 100%;
  height: 25px;
  background-image: url("~./../assets/img/fade-gray.png");
  background-repeat: repeat-x;
  background-size: contain;
}

.listz-item-detail {
  width: 100%;
  background-color: #eaeaea;
  padding: 25px;
}
</style>


