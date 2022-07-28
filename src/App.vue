<template>
  <router-view />
</template>

<script setup></script>

<style>
#app {
  font-family: "Rubik", sans-serif;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  --main-color: hsl(238, 40%, 52%);
  --main-color-pale: hsl(228, 33%, 97%);
  --accent-color: hsl(358, 79%, 66%);
}

body {
  background-color: var(--main-color-pale);
  display: flex;
  justify-content: center;
}
</style>
