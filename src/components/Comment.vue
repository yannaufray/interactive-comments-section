<template>
  <div class="full-comment">
    <div class="content">
      <div class="infos">
        <img :src="pic" alt="" class="pic" />
        <h3 class="username">{{ comment.user.username }}</h3>
        <span v-if="comment.user.username === currentUser" class="you"
          >you</span
        >
        <span class="date">{{ formattedDate }}</span>
      </div>

      <div v-if="!isEditing" class="text">
        <span v-if="comment.replyingTo" class="replying-to"
          >@{{ comment.replyingTo }}</span
        >
        {{ comment.content }}
      </div>
      <div v-else>
        <textarea class="edit-area" v-model="comment.content"></textarea>
        <button @click="sendUpdate" class="btn-update">Update</button>
      </div>
    </div>

    <div class="likes">
      <img
        @click="changeLikes(1)"
        src="../assets/images/icon-plus.svg"
        alt="Plus button"
        class="btn-plus"
        :class="{ active: plusIsActive }"
      />
      <span class="likes-number">{{ calcLikes }}</span>
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
      <div @click="handleEdit(comment)" class="edit">
        <img src="../assets/images/icon-edit.svg" alt="" />
        <span>Edit</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow } from "date-fns";

export default {
  props: {
    comment: {
      type: String,
      required: true,
      default: "Some comment.",
    },
    currentUser: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    replyingTo: {
      type: String,
      required: true,
      default: "Anonymous",
    },
  },
  data() {
    return {
      likes: this.comment.score,
      initialLlikes: this.comment.score,
      pic: require(`../assets/images/avatars/image-${this.comment.user.username}.png`),
      minusIsActive: false,
      plusIsActive: false,
      isEditing: false,
    };
  },
  computed: {
    calcLikes() {
      return this.likes;
    },
    formattedDate() {
      const date = new Date(this.comment.createdAt);
      return formatDistanceToNow(date, { addSuffix: true });
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
      if (this.comment.user.username === this.currentUser) return;

      this.likes += num;

      if (this.likes === this.initialLlikes + 1) this.plusIsActive = true;
      if (this.likes === this.initialLlikes - 1) this.minusIsActive = true;
      if (this.likes === this.initialLlikes) {
        this.minusIsActive = false;
        this.plusIsActive = false;
      }
    },
    handleEdit(com) {
      this.isEditing = !this.isEditing;
      console.log(this.comment.content, com.content);
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
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.likes {
  background-color: hsl(228, 33%, 97%);
  border-radius: 0.3rem;

  display: flex;
  align-items: center;
  align-self: flex-start; /* Prevents from stretching */
  justify-content: space-between;
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
.replying-to,
.btn-plus,
.btn-minus,
.delete,
.reply,
.edit {
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
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.edit span {
  color: hsl(238, 40%, 52%);
}

.delete span {
  color: hsl(358, 79%, 66%);
}

.edit-area {
  margin: 1rem;
  border-radius: 0.3rem;
  width: 100%;
  padding: 1rem 1rem 2.5rem;
  border: 0.1rem solid hsl(223, 19%, 93%);
  resize: none;
}

.edit-area:focus {
  outline: none;
  border: 0.1rem solid hsl(238, 40%, 52%);
}

@media screen and (min-width: 700px) {
  .full-comment {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  .likes {
    flex-direction: column;
    align-self: center;
  }

  .reply {
    top: 1rem;
    bottom: initial;
  }

  .icons-current-user {
    top: 1rem;
    bottom: initial;
  }
}
</style>
