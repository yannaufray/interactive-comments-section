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
        png: `../assets/images/avatars/image-${userStore.currentUser}.png`,
        webp: `../assets/images/avatars/image-${userStore.currentUser}.webp`,
      },
      username: userStore.currentUser,
    },
  };

  !replying.value
    ? commentStore.addNewComment(reply)
    : commentStore.addReplyToComment(reply);
}

function displayDeleteModal(id) {
  modalVisible.value = true;
  idToBeDeleted.value = id;
}

async function handleDelete(id) {
  modalVisible.value = false;

  const isReply = !commentStore.comments.some((el) => el.id === id);

  !isReply
    ? commentStore.deleteComment(id)
    : commentStore.deleteReplyToComment(id);
}
</script>

<style scoped></style>
