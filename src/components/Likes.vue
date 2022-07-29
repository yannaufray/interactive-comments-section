<template>
  <Teleport to="body">
    <Toast alert v-show="changingOwnLikes"
      >You can't change your own comments' likes.</Toast
    >
  </Teleport>
  <div class="likes">
    <img
      @click="changeLikes(1)"
      src="../assets/images/icon-plus.svg"
      alt="Plus button"
      class="btn-plus"
      :class="{ active: plusIsActive }"
    />
    <span class="likes-number">{{ likes }}</span>
    <img
      @click="changeLikes(-1)"
      src="../assets/images/icon-minus.svg"
      alt="Minus button"
      class="btn-minus"
      :class="{
        active: minusIsActive,
      }"
    />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Toast from "./Toast.vue";
import { useUserStore } from "../stores/UserStore";
const userStore = useUserStore();

const props = defineProps({
  comment: Object,
});

const likes = ref(props.comment.score);
const initialLlikes = ref(props.comment.score);
const minusIsActive = ref(false);
const plusIsActive = ref(false);
const changingOwnLikes = ref(false);

function changeLikes(num) {
  // Likes can't go under 0
  if (likes.value + num < 0) return;

  // Can vote only once
  if (
    likes.value + num > initialLlikes.value + 1 ||
    likes.value + num < initialLlikes.value - 1
  )
    return;

  // Can't change your own likes
  if (props.comment.user.username === userStore.currentUser.username) {
    changingOwnLikes.value = true;
    setTimeout(() => {
      changingOwnLikes.value = false;
    }, 900);
    return;
  }

  likes.value += num;

  if (likes.value === initialLlikes.value + 1) plusIsActive.value = true;
  if (likes.value === initialLlikes.value - 1) minusIsActive.value = true;
  if (likes.value === initialLlikes.value) {
    minusIsActive.value = false;
    plusIsActive.value = false;
  }
}
</script>

<style scoped>
.likes {
  background-color: var(--main-color-pale);
  border-radius: 0.3rem;

  display: flex;
  align-items: center;
  align-self: flex-start; /* Prevents from stretching */
  justify-content: space-between;
  gap: 0.5rem;
}

.likes-number {
  font-weight: 700;
  color: var(--main-color);
}

.likes-number,
.btn-plus,
.btn-minus {
  user-select: none;
}

.btn-plus,
.btn-minus {
  cursor: pointer;
  padding: 0.6rem;
  filter: invert(82%) sepia(9%) saturate(941%) hue-rotate(201deg)
    brightness(99%) contrast(88%);
}

.active {
  filter: invert(21%) sepia(94%) saturate(1589%) hue-rotate(226deg)
    brightness(104%) contrast(92%);
}

@media screen and (min-width: 700px) {
  .likes {
    flex-direction: column;
    align-self: center;
  }
}
</style>
