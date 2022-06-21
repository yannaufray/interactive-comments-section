<template>
  <Comment />
</template>

<script>
import Comment from "../components/Comment.vue";

export default {
  name: "Home",
  components: { Comment },
  setup() {
    const comments = fetch("http://localhost:5000/comments").then((res) => {
      if (res.status === 200) {
        const data = res.json();
      }
    });
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
