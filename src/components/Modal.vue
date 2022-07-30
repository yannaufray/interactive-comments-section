<template>
  <div class="overlay"></div>

  <div class="container">
    <div class="modal">
      <h3>Delete comment</h3>
      <p class="text">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div class="btns">
        <button @click="$emit('cancel')" class="btn cancel">No, cancel</button>
        <button
          @click="handleDelete(appStore.idToBeDeleted)"
          class="btn delete"
        >
          Yes, delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "../stores/AppStore";
import { useCommentStore } from "../stores/CommentStore";

const appStore = useAppStore();
const commentStore = useCommentStore();

async function handleDelete(id) {
  appStore.modalVisible = false;

  const isReply = !commentStore.comments.some((el) => el.id === id);

  !isReply
    ? commentStore.deleteComment(id)
    : commentStore.deleteReplyToComment(id);
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: fixed;
}

.overlay {
  background-color: black;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  animation: overlay 0.2s;
  opacity: 0.3;
}

@keyframes overlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.3;
  }
}

.modal {
  background-color: white;
  padding: 1.3rem 1rem;
  width: 25rem;
  border-radius: 0.3rem;
  font-family: "Rubik", sans-serif;
  animation: modal 0.2s;
}

@keyframes modal {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.text {
  color: hsl(211, 10%, 45%);
  margin-top: 1rem;
}

.btns {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  border-radius: 0.3rem;
  text-transform: uppercase;
  color: white;
  padding: 0.6rem 0.8rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.8;
}

.cancel {
  background-color: hsl(211, 10%, 45%);
}

.delete {
  background-color: var(--accent-color);
}
</style>
