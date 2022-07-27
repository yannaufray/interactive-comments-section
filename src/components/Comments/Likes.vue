<template>
  <Teleport to="body">
    <Toast v-show="changingOwnLikes"
      >You can't change your own comments' likes.</Toast
    >
  </Teleport>
  <div class="likes">
    <img
      @click="changeLikes(1)"
      src="../../assets/images/icon-plus.svg"
      alt="Plus button"
      class="btn-plus"
      :class="{ active: plusIsActive }"
    />
    <span class="likes-number">{{ calcLikes }}</span>
    <img
      @click="changeLikes(-1)"
      src="../../assets/images/icon-minus.svg"
      alt="Minus button"
      class="btn-minus"
      :class="{
        active: minusIsActive,
      }"
    />
  </div>
</template>

<script>
import Toast from "../Toast.vue";

export default {
  props: {
    comment: { type: Object, required: true },
    currentUser: { type: String, required: true },
  },
  components: { Toast },
  data() {
    return {
      likes: this.comment.score,
      initialLlikes: this.comment.score,
      minusIsActive: false,
      plusIsActive: false,
      changingOwnLikes: false,
    };
  },
  computed: {
    calcLikes() {
      return this.likes;
    },
  },
  methods: {
    changeLikes(num) {
      // Likes can't go under 0
      if (this.likes + num < 0) return;

      // Can vote only once
      if (
        this.likes + num > this.initialLlikes + 1 ||
        this.likes + num < this.initialLlikes - 1
      )
        return;

      // Can't change your own likes
      if (this.comment.user.username === this.currentUser) {
        this.changingOwnLikes = true;
        setTimeout(() => {
          this.changingOwnLikes = false;
        }, 900);
        return;
      }

      this.likes += num;

      if (this.likes === this.initialLlikes + 1) this.plusIsActive = true;
      if (this.likes === this.initialLlikes - 1) this.minusIsActive = true;
      if (this.likes === this.initialLlikes) {
        this.minusIsActive = false;
        this.plusIsActive = false;
      }
    },
  },
};
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
