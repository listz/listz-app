<template>
  <div id="listz-list" class="flex-grow-1 mt-4">

    <div :key="index" v-for="(item, index) in items" class="listz-item row">

      <!-- normal view -->
      <div class="listz-item-overview listz-item-row">
          <!-- image -->
          <img class="listz-item-image" :src="item.image">

          <div class="listz-item-overview-text">
            <h3>{{item.name}}</h3>
            <div class="listz-item-tags">
              <div :key="tagIndex" v-for="(tag, tagIndex) in item.tags" class="listz-item-tag">
                <div class="listz-item-tag">{{tag}}</div>
              </div>
            </div>
          </div>
      </div>

      <!-- detailed view -->
      <div class="listz-item-details listz-item-row">
          {{item.description}}
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "listz-list",
  props: {
    items: Array
  }
}
</script>

<style>
.listz-item {
  background-color: white;
  cursor: pointer;
  transition: 0.2s;

  margin-bottom: 20px;
}

.listz-item-row {
  display: flex;
}

.listz-item-overview {
  width: 100%;
  padding: 0;
}

.listz-item-overview-text {
  height: 100%;
  width: 100%;

  margin-left: 15px;
}

.listz-item-overview-text > div {
  width: 100%;
  height: 50%;
}

.listz-item-overview-text h3 {
  align-items: center;
}

.listz-item-tag {
  display: flex;
  width: auto;
  height: auto;
  float: left;

  padding: 2px !important;
  background-color: lightgray;
  margin-right: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 0.8em;

  align-items: center;
  justify-content: center;
}

.listz-item:hover {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.listz-item-image {
  width: 75px;
  height: 75px;
}

.listz-item-details {
  overflow: hidden;
  transition: 0.2s;
  padding: 25px;
}
  
</style>


