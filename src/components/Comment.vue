<template>
  <div class="full-comment">
    <div class="likes">
      <img
        @click="changeLikes(1)"
        src="../assets/images/icon-plus.svg"
        alt="Plus button"
        class="btn-plus"
      />
      <span class="likes-number">{{ calcLikes }}</span>
      <img
        @click="changeLikes(-1)"
        src="../assets/images/icon-minus.svg"
        alt="Minus button"
        class="btn-minus"
      />
    </div>

    <div class="content">
      <div class="infos">
        <img :src="pic" alt="" class="pic" />
        <h3 class="username">{{ comment.user.username }}</h3>
        <span v-if="comment.user.username === currentUser" class="you"
          >you</span
        >
        <span class="date">{{ comment.createdAt }}</span>
      </div>

      <div class="text">
        <span v-if="comment.replyingTo" class="replying-to"
          >@{{ comment.replyingTo }}</span
        >
        {{ comment.content }}
      </div>
    </div>

    <div
      @click="$emit('reply', comment)"
      v-if="comment.user.username !== currentUser"
      class="reply"
    >
      <img src="../assets/images/icon-reply.svg" alt="" />
      <span>Reply</span>
    </div>
    <div v-else class="icons-current-user">
      <div @click="$emit('delete', comment.id)" class="delete">
        <img src="../assets/images/icon-delete.svg" alt="" />
        <span>Delete</span>
      </div>
      <div class="edit">
        <img src="../assets/images/icon-edit.svg" alt="" />
        <span>Edit</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment", "currentUser", "replyingTo"],
  data() {
    return {
      likes: this.comment.score,
      initialLlikes: this.comment.score,
      pic: require(`../assets/images/avatars/image-${this.comment.user.username}.png`),
    };
  },
  computed: {
    calcLikes() {
      return this.likes;
    },
  },
  methods: {
    changeLikes(num) {
      if (this.likes + num < 0) return;
      if (
        this.likes + num <= this.initialLlikes + 1 &&
        this.likes + num >= this.initialLlikes - 1
      )
        this.likes += num;
    },
  },
};
</script>

<style scoped>
.full-comment {
  background-color: white;
  margin: 2rem 1rem 1rem;
  padding: 1rem;
  border-radius: 0.3rem;
  position: relative;
  display: flex;
  gap: 1rem;
}

.likes {
  background-color: hsl(228, 33%, 97%);
  border-radius: 0.3rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: center; /* Prevents from stretching vertically */
  gap: 0.5rem;
}

.content {
  display: flex;
  flex-direction: column;
}

.infos {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.infos img,
.you {
  margin-right: 1rem;
}

.infos img {
  width: 2rem;
}

.infos .username {
  font-weight: 700;
  margin-right: 0.5rem;
}

.infos .date {
  color: hsl(211, 10%, 45%);
  font-weight: 500;
}

.text {
  color: hsl(211, 10%, 45%);
  margin-bottom: 1rem;
  font-weight: 500;
}

.likes-number,
.reply span,
.replying-to {
  font-weight: 700;
  color: hsl(238, 40%, 52%);
}

.pic,
.likes-number,
.replying-to {
  user-select: none;
}

.btn-plus,
.btn-minus {
  cursor: pointer;
  padding: 0.6rem;
}

.edit span,
.delete span {
  font-weight: 700;
}

.delete,
.reply,
.edit {
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  gap: 0.5rem;
}

.delete:hover,
.reply:hover,
.edit:hover {
  opacity: 0.7;
}

.reply {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: block;
  background-color: red;
}

.reply img {
  margin-right: 0.5rem;
}

.you {
  padding: 0.1rem 0.4rem;
  color: white;
  font-weight: 700;
  background-color: hsl(238, 40%, 52%);
  border-radius: 0.3rem;
  user-select: none;
}

.icons-current-user {
  display: flex;
  gap: 1rem;
}

.edit span {
  color: hsl(238, 40%, 52%);
}

.delete span {
  color: hsl(358, 79%, 66%);
}

@media screen and (min-width: 700px) {
  .likes {
    flex-direction: column;
  }

  .reply {
    top: 1rem;
  }

  .full-comment {
    flex-direction: row;
  }
}
</style>
