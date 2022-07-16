<template>
  <div v-if="!comments.length">Loading...</div>
  <div v-else class="comments">
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
        v-if="replying && comment.id === replyingId"
        :currentUser="currentUser"
        :pic="pic"
      />

      <div v-if="comment.replies && comment.replies.length" class="replies">
        <div v-for="comment in comment.replies" :key="comment.id">
          <Comment
            @reply="handleReply"
            @delete="handleDelete"
            :comment="comment"
            :currentUser="currentUser"
            :replyingTo="replyingTo"
          />
          <NewComment
            @send="handleSend"
            v-if="replying && comment.id === replyingId"
            :currentUser="currentUser"
            :pic="pic"
          />
        </div>
      </div>
    </div>
    <NewComment v-if="!replying" @send="handleSend" :pic="pic" />
  </div>
</template>

<script>
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
      pic: "",
    };
  },
  mounted() {
    this.pic = require(`../assets/images/avatars/image-${this.currentUser}.png`);
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
    },

    handleSend: async function (content) {
      const reply = {
        id: Math.floor(Math.random() * 100000),
        content: content,
        createdAt: new Date(),
        score: 1,
        replyingTo: this.replyingTo,
        user: {
          image: {
            png: `../assets/images/avatars/image-${this.currentUser}.png`,
            webp: `../assets/images/avatars/image-${this.currentUser}.webp`,
          },
          username: this.currentUser,
        },
      };

      if (!this.replying) {
        this.comments.push(reply);
        await fetch("http://localhost:5000/comments/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reply),
        });
      }

      this.replying = false;
    },
    handleDelete: async function (id) {
      const res = await fetch("http://localhost:5000/comments/");
      const comments = await res.json();

      let comment = comments.find((com) => com.id === id);

      let isReply = false;
      let motherCom = null;
      if (!comment) {
        isReply = true;
        comments.map((el) => {
          el.replies.map((el2) => {
            if (el2.id === id) {
              comment = el2;
              motherCom = el;
            }
          });
        });
      }

      // If it's in the normal flow, just remove the comment
      if (!isReply) {
        fetch(`http://localhost:5000/comments/${comment.id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
        this.comments = this.comments.filter((el) => el.id !== id);
      } else {
        const indexMotherCom = this.comments.findIndex(
          (el) => el.id === motherCom.id
        );
        const indexEl = this.comments[indexMotherCom].replies.indexOf(comment);
        this.comments[indexMotherCom].replies.splice(indexEl, 1);
        fetch(`http://localhost:5000/comments/${motherCom.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.comments[indexMotherCom]),
        });
      }
    },
  },
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
  display: flex;
  justify-content: center;
}

.comments {
  max-width: 900px;
}

.replies {
  border-left: 0.2rem solid hsl(223, 19%, 93%);
  margin-left: 1rem;
}
</style>
