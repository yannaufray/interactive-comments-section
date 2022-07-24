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

    <Interactions
      @reply="$emit('reply', comment)"
      @delete="$emit('delete', comment.id)"
      :comment="comment"
      :currentUser="currentUser"
    />
  </div>
</template>

<script>
import { formatDistanceToNow } from "date-fns";
import Likes from "../components/Likes.vue";
import Interactions from "../components/Interactions.vue";

export default {
  components: { Likes, Interactions },
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

.replying-to {
  font-weight: 700;
  color: hsl(238, 40%, 52%);
}

.pic,
.replying-to {
  user-select: none;
}

.you {
  padding: 0.1rem 0.4rem;
  color: white;
  font-weight: 700;
  background-color: hsl(238, 40%, 52%);
  border-radius: 0.3rem;
  user-select: none;
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
