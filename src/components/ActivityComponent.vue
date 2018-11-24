<template>
  <div class="listz-scroll-outer-container">

    <div class="listz-scroll-inner-container">

      <h2 v-if="$store.state.commits.length != 0" >Latest Activity</h2>

        <a :key="index" v-for="(commit, index) of $store.state.commits" v-if="typeof commit.author != 'undefined' && commit.author != null" class="listz-activity-item" :href="commit.html_url">

          <div class="listz-activity-item-title">
            <img :src="commit.author.avatar_url" tag="Url of authors avatar.">
            <a :href="commit.author.html_url">{{commit.author.login}}</a>
          </div>

          <p>{{commit.commit.message}}</p>

        </a>

    </div>

  </div>
</template>

<script>
export default {
  methods: {
    visitCommit(commitUrl) {
      location.href = commitUrl;
    }
  }
};
</script>

<style>

.listz-activity-item {
  display: inline-block;
  text-decoration: none;

  width: calc(100% - var(--listz-scroll-overflow) + 10px);
  margin-bottom: 30px;
  margin-left: 5px;
  padding: 15px;

  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2)
  );
  color: var(--listz-white-color);

  border-radius: var(--listz-border-radius);
  overflow: hidden;
  word-wrap: break-word;
  cursor: pointer;
  z-index: 10;

  transition: transform 0.2s;
}

.listz-activity-item:hover {
  transform: scale(1.01);
  text-decoration: none;
}

.listz-activity-item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.listz-activity-item-title img {
  width: 30px;
  height: 30px;
}

.listz-activity-item-title a {
  float: left;

  margin-left: 15px;
  text-decoration: none;
  color: var(--listz-white-color);

  height: 100%;
  font-size: 17px;
  line-height: 15px;
}

.listz-activity-item-title a:hover {
  text-decoration: underline;
}

.listz-activity-item p {
  margin-top: 15px;
  margin-bottom: 0;
  padding: 0;
  text-decoration: none;
  color: var(--listz-white-color);
  font-size: 0.8em;
}
</style>


