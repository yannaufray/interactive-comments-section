<template>
  <Teleport to="body">
    <Modal
      @delete="handleDelete(idToBeDeleted)"
      @cancel="this.modalVisible = false"
      v-if="modalVisible"
    />
  </Teleport>
  <transition-group name="comments" appear>
    <div v-for="comment in comments" :key="comment.id">
      <Comment
        @reply="handleReply"
        @delete="displayDeleteModal"
        :comment="comment"
        :currentUser="currentUser"
        :replyingTo="replyingTo"
      />
      <NewComment
        @send="handleSend"
        v-show="replying && comment.id === replyingId"
        :currentUser="currentUser"
        :pic="pic"
      />

      <div v-if="comment.replies && comment.replies.length" class="replies">
        <div v-for="comment in comment.replies" :key="comment.id">
          <Comment
            @reply="handleReply"
            @delete="displayDeleteModal"
            :comment="comment"
            :currentUser="currentUser"
            :replyingTo="replyingTo"
            :replying="replying"
          />
          <NewComment
            @send="handleSend"
            v-show="replying && comment.id === replyingId"
            :currentUser="currentUser"
            :pic="pic"
          />
        </div>
      </div>
    </div>
  </transition-group>
  <NewComment v-show="!replying" @send="handleSend" :pic="pic" />
</template>

<script>
import Comment from "./Comment.vue";
import NewComment from "./NewComment.vue";
import Modal from "../Modal.vue";

export default {
  components: { Comment, NewComment, Modal },
  props: {
    currentUser: { type: String, required: true },
    pic: { type: String, required: true },
  },
  data() {
    return {
      comments: [],
      replying: false,
      replyingId: null,
      replyingTo: "",
      idToBeDeleted: null,
      modalVisible: false,
    };
  },
  watch: {
    comment(oldVal, newVal) {
      if (newVal.length) {
        this.$emit(loaded);
      }
    },
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
      this.replyingTo = commentToBeReplied.user.username;
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

      !this.replying
        ? this.addNewComment(reply)
        : this.addReplyToComment(reply);
    },
    addNewComment: async function (reply) {
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
    },
    addReplyToComment: async function (reply) {
      // Updating the DOM
      const comIndex = this.comments.findIndex(
        (com) => com.id === this.replyingId
      );
      this.comments[comIndex].replies.push(reply);

      // Updating the data with one more reply
      this.patchComment(this.comments[comIndex]);

      // Resets
      this.replying = false;
      this.replyingTo = undefined;
    },
    displayDeleteModal: function (id) {
      this.modalVisible = true;
      this.idToBeDeleted = id;
    },
    handleDelete: async function (id) {
      this.modalVisible = false;

      const isReply = !this.comments.some((el) => el.id === id);

      !isReply ? this.deleteComment(id) : this.deleteReplyToComment(id);
    },
    deleteComment: async function (id) {
      const comment = this.comments.find((com) => com.id === id);

      fetch(`http://localhost:5000/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      this.comments = this.comments.filter((el) => el.id !== id);
    },
    deleteReplyToComment: async function (id) {
      const comment = this.comments.find((com) =>
        com.replies.some((reply) => reply.id === id)
      );
      const toDeletedId = comment.replies.filter((el) => el.id === id);
      comment.replies.splice(comment.replies.indexOf(toDeletedId), 1);

      this.patchComment(comment);
    },
    patchComment: function (comment) {
      fetch(`http://localhost:5000/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(comment),
      });
    },
  },
  mounted() {
    this.fetchComments();
  },
};
</script>

<style scoped>
.comments-enter-from,
.comments-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.comments-enter-active,
.comments-leave-to {
  transition: all 0.3s ease;
}

.comments-move,
.new-comment-move {
  transition: all 0.3s ease;
}
</style>
