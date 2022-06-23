<template>
  <div v-if="comments.length">
    <div v-for="comment in comments" :key="comment.id">
      <Comment
        @reply="handleReply"
        @delete="handleDelete"
        :comment="comment"
        :currentUser="currentUser"
        :replyingTo="replyingTo"
      />
      <NewComment
        @send="handleSend"
        v-if="replying & (comment.id === replyingId)"
        :currentUser="currentUser"
      />

      <div v-if="comment.replies.length" class="replies">
        <div v-for="reply in comment.replies" :key="reply.id">
          <Comment
            @reply="handleReply"
            @delete="handleDelete"
            :comment="reply"
            :currentUser="currentUser"
            :replyingTo="replyingTo"
          />
          <NewComment
            @send="handleSend"
            v-if="replying & (reply.id === replyingId)"
            :currentUser="currentUser"
          />
        </div>
      </div>
    </div>
    <NewComment v-if="!replying" />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
// import { onMounted, ref } from "@vue/runtime-core";
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
      replyingTo: "",
    };
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    fetchComments: function () {
      fetch("http://localhost:5000/comments")
        .then((res) => res.json())
        .then((data) => (this.comments = data))
        .catch((err) => console.log(err.message));
    },
    handleReply: function (commentToBeReplied) {
      // Toggling off the bottom comment input box
      this.replying = !this.replying;
      // Setting id to display input box bellow the right comment
      this.replyingId = commentToBeReplied.id;
      // Setting replyingTo to get the @username tag
      this.replyingTo = commentToBeReplied.replyingTo;
      console.log(commentToBeReplied.replyingTo);
    },

    handleSend: async function (newReply) {
      const reply = {
        id: Math.floor(Math.random() * 100000),
        content: newReply.content,
        createdAt: new Date(),
        score: 0,
        replyingTo: this.replyingTo,
        user: {
          image: {
            png: "../assets/images/avatars/image-juliusomo.png",
            webp: "../assets/images/avatars/image-juliusomo.webp",
          },
          username: this.currentUser,
        },
      };

      const currentPostRes = await fetch(
        `http://localhost:5000/comments/${this.replyingId}`
      );
      const currentPost = await currentPostRes.json();

      // Marcherait ?
      // currentPost.replies = [...currentPost.replies, reply];
      if (currentPost.replies) {
        currentPost.replies.push(reply);
      } else {
        currentPost.replies = [reply];
      }

      await fetch(`http://localhost:5000/comments/${this.replyingId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(currentPost),
      });

      // Toggling off the new comment input box
      this.replying = !this.replying;
      // Fetching comments with the new one
      this.fetchComments();
    },
    handleDelete: async function (id) {
      let commentReplied = {};
      let commentRepliedId = null;
      await fetch("http://localhost:5000/comments/").then((res) =>
        res
          .json()
          .then((data) => {
            commentReplied = data.find((el) =>
              el.replies.find((el2) => el2.id === id)
            );
            commentRepliedId = commentReplied.id;
            commentReplied.replies = commentReplied.replies.filter(
              (el) => el.id !== id
            );
          })
          .then(() => {
            fetch(`http://localhost:5000/comments/${commentRepliedId}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(commentReplied),
            });
            this.fetchComments();
          })
      );
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
