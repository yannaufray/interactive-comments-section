<template>
  <div v-if="comments.length">
    <div v-for="comment in comments" :key="comment.id">
      <Comment
        @reply="handleReply"
        :comment="comment"
        :currentUser="currentUser"
      />
      <NewComment v-if="replying & (comment.id === replyingId)" />

      <div v-if="comment.replies.length" class="replies">
        <div v-for="reply in comment.replies" :key="reply.id">
          <Comment
            @reply="handleReply"
            :comment="reply"
            :currentUser="currentUser"
          />
          <NewComment v-if="replying & (reply.id === replyingId)" />
        </div>
      </div>
    </div>
    <NewComment v-if="!replying" />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import Comment from "../components/Comment.vue";
import NewComment from "../components/NewComment.vue";

export default {
  name: "Home",
  components: { Comment, NewComment },
  data() {
    return {
      comments: [],
      currentUser: "juliusomo",
      replying: false,
      replyingId: null,
    };
  },
  mounted() {
    fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((data) => (this.comments = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    handleReply: function (commentToBeReplied) {
      this.replying = !this.replying;
      this.replyingId = commentToBeReplied;
    },
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
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: hsl(228, 33%, 97%);
}

.replies {
  border-left: 0.2rem solid hsl(223, 19%, 93%);
  margin-left: 1rem;
}
</style>
