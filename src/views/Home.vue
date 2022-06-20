<template></template>

<script>
export default {
  name: "Home",
  components: {},
  setup() {
    fetch("http://localhost:5000/comments").then((res) => console.log(res));
  },
};
</script>
