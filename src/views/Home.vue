<template>
  <div v-if="comments.length">
    <div v-for="comment in comments" :key="comment.id">
      <Comment :comment="comment" />
      <div v-if="comment.replies.length">
        <div v-for="reply in comment.replies" :key="reply.id">
          <Comment :comment="reply" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import Comment from "../components/Comment.vue";

export default {
  name: "Home",
  components: { Comment },
  data() {
    return {
      comments: [],
    };
  },
  mounted() {
    fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((data) => (this.comments = data))
      .catch((err) => console.log(err.message));
  },
  // setup() {
  //   let comments = ref([]);

  //   onMounted(() => {
  //     fetch("http://localhost:5000/comments")
  //       .then((res) => res.json())
  //       .then((data) => (comments = data))
  //       .catch((err) => console.log(err.message));
  //   });

  //   return { comments };
  // },
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
