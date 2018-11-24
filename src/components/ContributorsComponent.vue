<template>
  <div id="listz-contributors-container" class="listz-scroll-outer-container">
    <div class="listz-scroll-inner-container">
      <h2 v-if="$store.state.contributors && $store.state.contributors.length != 0">Top contributors</h2>

      <a :href="contributor.html_url" :key="index" v-for="(contributor, index) of $store.state.contributors" class="listz-contributors-contributor">
        <p>{{index + 1}}:</p>
        <img :src="contributor.avatar_url" alt="The avatar of a contributor of this Listz.">
        <p>{{contributor.login}}</p>
      </a>

      <a href="https://github.com/listz/listz/blob/master/CONTRIBUTING.md" class="listz-contributors-contributor">
        <p>And you! 🎉🎉🎉</p>
      </a>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#listz-contributors-container {
  left: var(--listz-brush-width);
  right: var(--listz-top-margin);
}

a.listz-contributors-contributor {
  display: flex;
  height: 45px;
  width: 80%;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: var(--listz-white-color);
  transition: transform 0.2s;
}

a.listz-contributors-contributor:hover {
  transform: scale(1.01);
}

a.listz-contributors-contributor > * {
  margin-bottom: 0;
  margin-right: 1px;
  margin-left: 5px;
}

a.listz-contributors-contributor > img {
  width: 45px;
  height: 45px;
}
</style>


