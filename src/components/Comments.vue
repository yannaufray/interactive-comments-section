<template>
  <Teleport to="body">
    <Modal
      @delete="handleDelete(idToBeDeleted)"
      @cancel="appStore.modalVisible = false"
      v-if="appStore.modalVisible"
    />
  </Teleport>
  <transition-group name="appears" appear>
    <div v-for="comment in commentStore.comments" :key="comment.id">
      <Comment
        @reply="handleReply"
        @delete="appStore.displayDeleteModal(comment.id)"
        :comment="comment"
      />
      <NewComment
        @send="handleSend"
        v-if="appStore.replying && comment.id === replyingId"
      />
    </div>
  </transition-group>
  <NewComment v-if="!appStore.replying" @send="handleSend" />
</template>

<script setup>
import Comment from "./Comment.vue";
import NewComment from "./NewComment.vue";
import Modal from "./Modal.vue";

import { useUserStore } from "../stores/UserStore";
import { useCommentStore } from "../stores/CommentStore";
import { useAppStore } from "../stores/AppStore";

import { ref } from "@vue/runtime-core";
const userStore = useUserStore();
const commentStore = useCommentStore();
const appStore = useAppStore();

let replyingId = ref(null);
let replyingTo = ref("");
let idToBeDeleted = ref(null);
// let modalVisible = ref(false);

// watch: {
//   comment(oldVal, newVal) {
//     if (newVal.length) {
//       this.$emit(loaded);
//     }
//   },
// },

function handleReply(commentToBeReplied) {
  // Toggling off the bottom comment input box
  appStore.replying = !appStore.replying;
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
        png: `../assets/images/avatars/image-${userStore.currentUser.username}.png`,
        webp: `../assets/images/avatars/image-${userStore.currentUser.username}.webp`,
      },
      username: userStore.currentUser.username,
    },
  };

  if (!appStore.replying) {
    commentStore.addNewComment(reply);
  } else {
    commentStore.addReplyToComment(reply, replyingId.value);
    // Resets
    appStore.replying = false;
    replyingTo.value = undefined;
  }
}

// function displayDeleteModal(id) {
//   modalVisible.value = true;
//   idToBeDeleted.value = id;
// }

async function handleDelete(id) {
  appStore.modalVisible = false;

  const isReply = !commentStore.comments.some((el) => el.id === id);

  !isReply
    ? commentStore.deleteComment(id)
    : commentStore.deleteReplyToComment(id);
}
</script>
