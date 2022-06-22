<template>
  <div class="comment">
    <div class="infos">
      <img :src="comment.user.image.png" alt="" class="pic" />
      <h3 class="username">{{ comment.user.username }}</h3>
      <span v-if="comment.user.username === currentUser" class="you">you</span>
      <span class="date">{{ comment.createdAt }}</span>
    </div>
    <div class="text">
      <span v-if="comment.replyingTo" class="replying-to"
        >@{{ comment.replyingTo }}</span
      >
      {{ comment.content }}
    </div>
    <div class="interact">
      <div class="likes">
        <img src="../assets/images/icon-plus.svg" alt="" />
        <span class="likes-number">{{ comment.score }}</span>
        <img src="../assets/images/icon-minus.svg" alt="" />
      </div>
      <div class="reply">
        <img src="../assets/images/icon-reply.svg" alt="" />
        <span>Reply</span>
      </div>
    </div>
  </div>
</template>

<script>
export default { props: ["comment", "currentUser"] };
</script>

<style scoped>
.comment {
  background-color: white;
  margin: 2rem 1rem 1rem;
  padding: 1rem;
  border-radius: 0.3rem;
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
  columns: hsl(211, 10%, 45%);
}

.text {
  color: hsl(211, 10%, 45%);
  margin-bottom: 1rem;
  font-weight: 500;
}

.interact {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.likes {
  background-color: hsl(228, 33%, 97%);
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.likes-number,
.reply span,
.replying-to {
  font-weight: 700;
  color: hsl(238, 40%, 52%);
}

.reply {
  display: flex;
  align-items: center;
}

.reply span {
  margin-left: 0.5rem;
}

.you {
  padding: 0.1rem 0.4rem;
  color: white;
  font-weight: 700;
  background-color: hsl(238, 40%, 52%);
  border-radius: 0.3rem;
}
</style>
