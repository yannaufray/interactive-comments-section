<template>
  <div class="new-update">
    <div class="input-wrapper">
      <textarea class="update-input" v-model="comment.content"></textarea>
    </div>
    <div class="update">
      <img :src="pic" alt="Profile pic" />
      <div class="buttons">
        <span @click="$emit('cancel-edit')" class="cancel">Cancel</span>
        <button @click="sendUpdate" class="btn-update">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
  },
  methods: {
    sendUpdate: function () {
      this.$emit("edited");
    },
  },
};
</script>

<style scoped>
.new-update {
  margin: 1rem;
  background-color: white;
  border-radius: 0.3rem;
}

.update-input {
  margin: 1rem;
  border-radius: 0.3rem;
  width: 100%;
  padding: 1rem 1rem 2.5rem;
  border: 0.1rem solid hsl(223, 19%, 93%);
  resize: none;
}

.update-input:focus {
  outline: none;
  border: 0.1rem solid var(--main-color);
}

.input-wrapper {
  padding-right: 2rem;
}

.update {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.update img {
  width: 2rem;
  height: 2rem;
}

.cancel {
  border-radius: 0.5rem;
  color: var(--main-color);
  background-color: white;
  font-weight: 700;
  border: none;
  cursor: pointer;
  opacity: 1;
  align-self: center;
}

.buttons {
  display: flex;
  gap: 1rem;
}
</style>
