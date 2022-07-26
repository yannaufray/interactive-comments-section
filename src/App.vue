<template>
  <router-view />
</template>

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
}

body {
  background-color: hsl(228, 33%, 97%);
  display: flex;
  justify-content: center;
}

.fade-enter-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from {
  opacity: 0;
}
</style>
