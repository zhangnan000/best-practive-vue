<template>
  <div id="app">
    <Sidebar></Sidebar>
    <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="apple"></svg-icon>Home
      </router-link> |
      <router-link to="/about">
        <svg-icon icon-class="banana"></svg-icon>About
      </router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    Sidebar
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
