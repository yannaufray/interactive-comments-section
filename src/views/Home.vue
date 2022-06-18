<template></template>

<script>
export default {
  name: "Home",
  components: {},
  setup() {
    const test = fetch("../data.json").then((res) => console.log(res));
  },
};
</script>
