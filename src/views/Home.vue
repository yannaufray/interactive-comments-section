<template>
  <Teleport to="body">
    <Modal @delete="deleteComment(idToBeDeleted)" v-if="modalVisible" />
  </Teleport>
  <div v-if="!comments.length">Loading...</div>
  <div v-else class="comments">
    <Profiles @profile-changed="changeProfile" :currentUser="currentUser" />
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
import Profiles from "../components/Profiles.vue";
import NewComment from "../components/NewComment.vue";
import Modal from "../components/Modal.vue";

export default {
  name: "Home",
  components: { Comment, Profiles, NewComment, Modal },
  data() {
    return {
      comments: [],
      currentUser: "juliusomo",
      replying: false,
      replyingId: null,
      replyingTo: "",
      pic: "",
      modalVisible: false,
      idToBeDeleted: null,
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
        // Updating the DOM
        this.comments.push(reply);

        // Posting the new data
        await fetch("http://localhost:5000/comments/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reply),
        });
      } else {
        // Updating the DOM
        const comIndex = this.comments.findIndex(
          (com) => com.id === this.replyingId
        );
        this.comments[comIndex].replies.push(reply);

        // Updating the data with one more reply
        await fetch(
          `http://localhost:5000/comments/${this.comments[comIndex].id}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(this.comments[comIndex]),
          }
        );

        // Resetting the new comment box
        this.replying = false;
      }
    },
    handleDelete: function (id) {
      this.modalVisible = true;
      this.idToBeDeleted = id;
    },
    deleteComment: async function (id) {
      this.modalVisible = false;

      const isReply = !this.comments.some((el) => el.id === id);
      let comment = isReply
        ? console.log("Must find comment here")
        : this.comments.find((com) => com.id === id);

      if (!isReply) {
        fetch(`http://localhost:5000/comments/${comment.id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
        this.comments = this.comments.filter((el) => el.id !== id);
      } else {
        console.log(this.replyingId);

        fetch(`http://localhost:5000/comments/${this.replyingId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(comment),
        });
      }
    },
    changeProfile: function (profile) {
      this.currentUser = profile.name;
      this.pic = require(`../assets/images/avatars/image-${this.currentUser}.png`);
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
