<template>
  <div v-if="comments.length">
    <Comment :comment="comment" />
    <div v-for="comment in comments" :key="comment.id">
      {{ comment }}
      <!-- qsf -->
      <!-- {{ comment.content }} -->
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Comment from "../components/Comment.vue";

export default {
  name: "Home",
  components: { Comment },
  setup() {
    let comments = [];

    onMounted(async () => {
      comments = await fetch("http://localhost:5000/comments")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
      console.log(comments);
    });

    return { comments };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: hsl(228, 33%, 97%);
}
</style>
