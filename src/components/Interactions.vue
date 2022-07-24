<template>
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
</template>

<script>
export default {
  props: {
    comment: { type: Object, required: true },
    currentUser: { type: String, required: true },
  },
  data() {
    return { isEditing: false };
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

.reply span {
  font-weight: 700;
  color: hsl(238, 40%, 52%);
}
</style>
