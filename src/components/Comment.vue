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

    <Likes :comment="comment" :currentUser="currentUser" />

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
import Likes from "../components/Likes.vue";

export default {
  components: { Likes },
  props: {
    comment: {
      type: Object,
    },
    currentUser: {
      type: String,
      default: "Anonymous",
    },
    replyingTo: {
      type: String,
      default: "Anonymous",
    },
  },
  data() {
    return {
      pic: require(`../assets/images/avatars/image-${this.comment.user.username}.png`),
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

.reply span,
.replying-to {
  font-weight: 700;
  color: hsl(238, 40%, 52%);
}

.pic,
.replying-to,
.delete,
.reply,
.edit {
  user-select: none;
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
