<template>
  <div class="new-comment">
    <div class="input-wrapper">
      <textarea
        placeholder="Add a comment..."
        class="comment-input"
        v-model="content"
      ></textarea>
    </div>
    <div class="send">
      <img :src="userStore.pic" alt="Profile pic" />
      <button @click="sendReply" class="btn-send">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

import { useAppStore } from "../stores/AppStore";
import { useUserStore } from "../stores/UserStore";
import { useCommentStore } from "../stores/CommentStore";

const appStore = useAppStore();
const userStore = useUserStore();
const commentStore = useCommentStore();

let content = ref("");

async function sendReply() {
  if (content.value !== "") {
    const reply = {
      id: Math.floor(Math.random() * 100000),
      content: content.value,
      createdAt: new Date(),
      score: 1,
      userAnswered: commentStore.userAnswered,
      user: {
        image: {
          png: `../assets/images/avatars/image-${userStore.currentUser.username}.png`,
          webp: `../assets/images/avatars/image-${userStore.currentUser.username}.webp`,
        },
        username: userStore.currentUser.username,
      },
    };

    if (!appStore.isReplying) {
      commentStore.addNewComment(reply);
    } else {
      commentStore.addReplyToComment(reply, answeredCommentId.value);
      // Resets
      appStore.isReplying = false;
      commentStore.userAnswered = undefined;
    }
  }
  content.value = "";
}
</script>

<style scoped>
.new-comment {
  margin: 1rem;
  background-color: white;
  border-radius: 0.3rem;
}

.comment-input {
  margin: 1rem;
  border-radius: 0.3rem;
  width: 100%;
  padding: 1rem 1rem 2.5rem;
  border: 0.1rem solid hsl(223, 19%, 93%);
  resize: none;
}

.comment-input:focus {
  outline: none;
  border: 0.1rem solid var(--main-color);
}

.input-wrapper {
  padding-right: 2rem;
}

.send {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.send img {
  width: 2rem;
  height: 2rem;
}
</style>
