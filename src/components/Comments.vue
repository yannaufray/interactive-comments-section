<template>
  <Teleport to="body">
    <Modal
      @delete="handleDelete(idToBeDeleted)"
      @cancel="appStore.modalVisible = false"
      v-if="appStore.modalVisible"
    />
  </Teleport>
  <div v-for="comment in commentStore.comments" :key="comment.id">
    <Comment :comment="comment" />
  </div>
  <NewComment v-if="!appStore.isReplying" />
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

let idToBeDeleted = ref(null);

// watch: {
//   comment(oldVal, newVal) {
//     if (newVal.length) {
//       this.$emit(loaded);
//     }
//   },
// },

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
