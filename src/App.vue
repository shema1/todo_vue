<template>
  <div id="app">
    <router-view>
      <TodoList />
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
body{
  margin: 0;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a{
  color: #fff;
}

.material-icons{
  cursor: pointer;
}
</style>
