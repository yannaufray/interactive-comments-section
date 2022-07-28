<template>
  <Teleport to="body">
    <Modal
      @delete="handleDelete(idToBeDeleted)"
      @cancel="this.modalVisible = false"
      v-if="modalVisible"
    />
  </Teleport>
  <transition-group name="appears" appear>
    <div v-for="comment in commentStore.comments" :key="comment.id">
      <Comment
        @reply="handleReply"
        @delete="displayDeleteModal"
        :comment="comment"
        :currentUser="currentUser"
        :replyingTo="replyingTo"
      />
      <NewComment
        @send="handleSend"
        v-if="replying && comment.id === replyingId"
        :currentUser="currentUser"
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
            v-if="replying && comment.id === replyingId"
            :currentUser="currentUser"
          />
        </div>
      </div>
    </div>
  </transition-group>
  <NewComment v-if="!replying" @send="handleSend" />
</template>

<script setup>
import Comment from "./Comment.vue";
import NewComment from "./NewComment.vue";
import Modal from "./Modal.vue";

import { useUserStore } from "../stores/UserStore";
import { useCommentStore } from "../stores/CommentStore";
import { ref } from "@vue/runtime-core";
const userStore = useUserStore();
const commentStore = useCommentStore();

let replying = ref(false);
let replyingId = ref(null);
let replyingTo = ref("");
let idToBeDeleted = ref(null);
let modalVisible = ref(false);

// watch: {
//   comment(oldVal, newVal) {
//     if (newVal.length) {
//       this.$emit(loaded);
//     }
//   },
// },

function handleReply(commentToBeReplied) {
  // Toggling off the bottom comment input box
  replying.value = !replying.value;
  // Setting id to display input box bellow the right comment
  replyingId.value = commentToBeReplied.id;
  // Setting replyingTo to get the @username tag
  replyingTo.value = commentToBeReplied.user.username;
}

async function handleSend(content) {
  const reply = {
    id: Math.floor(Math.random() * 100000),
    content: content,
    createdAt: new Date(),
    score: 1,
    replyingTo: replyingTo.value,
    user: {
      image: {
        png: `../assets/images/avatars/image-${this.currentUser}.png`,
        webp: `../assets/images/avatars/image-${this.currentUser}.webp`,
      },
      username: this.currentUser,
    },
  };

  !this.replying ? this.addNewComment(reply) : this.addReplyToComment(reply);
}

async function addNewComment(reply) {
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
}

async function addReplyToComment(reply) {
  // Updating the DOM
  const comIndex = this.comments.findIndex((com) => com.id === this.replyingId);
  this.comments[comIndex].replies.push(reply);

  // Updating the data with one more reply
  this.patchComment(this.comments[comIndex]);

  // Resets
  this.replying = false;
  this.replyingTo = undefined;
}

function displayDeleteModal(id) {
  this.modalVisible = true;
  this.idToBeDeleted = id;
}

async function handleDelete(id) {
  this.modalVisible = false;

  const isReply = !this.comments.some((el) => el.id === id);

  !isReply ? this.deleteComment(id) : this.deleteReplyToComment(id);
}
async function deleteComment(id) {
  const comment = this.comments.find((com) => com.id === id);

  fetch(`http://localhost:5000/comments/${comment.id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  this.comments = this.comments.filter((el) => el.id !== id);
}
async function deleteReplyToComment(id) {
  const comment = this.comments.find((com) =>
    com.replies.some((reply) => reply.id === id)
  );
  const toDeletedId = comment.replies.filter((el) => el.id === id);
  comment.replies.splice(comment.replies.indexOf(toDeletedId), 1);

  this.patchComment(comment);
}
function patchComment(comment) {
  fetch(`http://localhost:5000/comments/${comment.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(comment),
  });
}
</script>

<style scoped></style>
