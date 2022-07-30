<template>
  <Teleport to="body">
    <Modal
      @delete="handleDelete(idToBeDeleted)"
      @cancel="modalVisible = false"
      v-if="modalVisible"
    />
  </Teleport>
  <transition-group name="appears" appear>
    <div v-for="comment in commentStore.comments" :key="comment.id">
      <Comment
        @reply="handleReply"
        @delete="displayDeleteModal"
        :comment="comment"
      />
      <NewComment
        @send="handleSend"
        v-if="replying && comment.id === replyingId"
      />

      <div v-if="comment.replies && comment.replies.length" class="replies">
        <transition-group name="appears" appear>
          <div v-for="comment in comment.replies" :key="comment.id">
            <Comment
              @reply="handleReply"
              @delete="displayDeleteModal"
              :comment="comment"
              :replying="replying"
            />
            <NewComment
              @send="handleSend"
              v-if="replying && comment.id === replyingId"
            />
          </div>
        </transition-group>
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
        png: `../assets/images/avatars/image-${userStore.currentUser.username}.png`,
        webp: `../assets/images/avatars/image-${userStore.currentUser.username}.webp`,
      },
      username: userStore.currentUser.username,
    },
  };

  if (!replying.value) {
    commentStore.addNewComment(reply);
  } else {
    commentStore.addReplyToComment(reply, replyingId.value);
    // Resets
    replying.value = false;
    replyingTo.value = undefined;
  }
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
